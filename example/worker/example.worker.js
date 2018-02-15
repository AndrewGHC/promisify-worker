/* eslint-disable */
self.addEventListener('message', ({ data: { command, counter, messageId } }) => {
  switch (command) {
    case 'Increment':
      const incrementedCounter = counter + 1;
      self.postMessage({ message: 'Incremented', incrementedCounter, messageId });
      break;
    default:
      self.postMessage({ message: `Unknown command: ${command}`, messageId });
  }
});
