# promisify-worker


[![npm version](https://badge.fury.io/js/promisify-worker.svg)](https://badge.fury.io/js/promisify-worker)

A lightweight simple promisification interface for web workers. Allows you to dispatch messages with `worker.postMessage` and receive the answer as a promise.

Install with `npm i -S promisify-worker`.

Demo: [https://andrewghc.github.io/promisify-worker/](https://andrewghc.github.io/promisify-worker/)

### Example

This example uses Webpack's [worker-loader](https://github.com/webpack-contrib/worker-loader).

Main thread
```
import promisifyWorker from 'promisify-worker';
import Worker from './your-web-worker-path';

async function doSomething(worker) {
  const answer = await worker.postMessage({ command: 'hello' });
  console.log(answer);
}

const worker = promisifyWorker(new Worker());
doSomething(worker);
```

Worker thread
```
self.addEventListener('message', ({ data: { command, messageId } }) => {
  switch (command) {
    case 'hello':
      self.postMessage({ message: 'hi there', messageId });
      break;
    default:
      self.postMessage({ message: 'this shouldn\'t happen!', messageId });
  }
});
```

### Use

The exported function `promisifyWorker` accepts two arguments:

`promifyWorker(worker[, namespace = 'messageId'])`.

**worker**: A web worker.

**namespace**: A namespace used to identify events. Defaults to `messageId`.

For this library to work, the worker thread **must** include the namespace when calling `postMessage`. This also means that worker threads must respond with an object. Please see the example for this in practice.

### Important notes

This library uses and does not transpile [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), these are available in all [modern browsers](https://caniuse.com/#feat=proxy).
