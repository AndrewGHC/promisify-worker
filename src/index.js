import uuidv4 from 'uuid/v4';

const messageIdNamespace = 'messageId';
const POST_MESSAGE = 'postMessage';

const assignNewPromise = (obj, namespace, id, workerMethod) => {
  const mappedObj = {
    ...obj,
    [id]: {},
  };

  const method = (message) => {
    const messageWithId = { ...message, [namespace]: id };
    workerMethod(messageWithId);
    return new Promise((resolve, reject) => {
      mappedObj[id].resolve = res => resolve(res);
      mappedObj[id].reject = res => reject(res);
    });
  };
  mappedObj[id].method = method;

  return mappedObj;
};

const withoutProperty = (obj, prop) => Object.keys(obj).reduce((acc, cur) => {
  if (prop === cur) return acc;
  return { ...acc, [cur]: obj[cur] };
}, {});

const promisifyWorker = (worker, namespace = messageIdNamespace) => {
  let knownPromises = {};

  const promisifiedWorker = new Proxy(worker, {
    get(target, name) {
      if (name === POST_MESSAGE) {
        const id = uuidv4();
        knownPromises = assignNewPromise(knownPromises, namespace, id, target[name].bind(target));
        return knownPromises[id].method;
      }

      if (typeof target[name] === 'function') {
        return target[name].bind(target);
      }
      return target[name];
    },
  });

  worker.addEventListener('message', ({ data }) => {
    const messageId = data[namespace];
    const messageWithoutId = withoutProperty(data, namespace);
    knownPromises[messageId].resolve(messageWithoutId);
    knownPromises = withoutProperty(knownPromises, messageId);
  });

  return promisifiedWorker;
};

export default promisifyWorker;
