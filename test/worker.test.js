import test from 'ava';
import { Worker } from 'webworker-threads';

import promisifyWorker from '../dist';

test.beforeEach((t) => {
  const command = {
    command: 'do something',
  };
  const messageFromWorker = {
    test: true,
  };
  const worker = promisifyWorker(new Worker(function webWorker() {
    this.onmessage = ({ data: { messageId } }) => {
      this.postMessage({ test: true, messageId });
    };
  }));

  t.context = { // eslint-disable-line no-param-reassign
    command,
    messageFromWorker,
    worker,
  };
});

test.afterEach.always((t) => {
  // Destroy the thread if it exists, otherwise ignore the error
  try {
    t.context.worker.thread.destroy();
  } catch (e) {
    return null;
  }
  return null;
});

test('can be terminated', (t) => {
  const { worker, command } = t.context;
  worker.terminate();
  t.throws(() => worker.postMessage(command));
});

test('returns a promise when postMessage is called', (t) => {
  const { worker, command } = t.context;
  const promise = worker.postMessage(command);
  t.true(typeof promise.then === 'function');
});

test('resolves a promise when the worker calls postMessage', async (t) => {
  const { worker, command, messageFromWorker } = t.context;
  const answer = await worker.postMessage(command);
  t.deepEqual(answer, messageFromWorker);
});
