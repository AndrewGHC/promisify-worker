import React, { Fragment } from 'react';

const Description = () => (
  <Fragment>
    <h2>
      Send messages as promises to web workers.
    </h2>
    <hr />
    <p>
      A small library that allows you to send messages as promises.
      Under the hood, it assigns a unique
      id to each message that must be returned by your web worker when it calls self.postMessage.
      <br /><br />
      All other properties and methods remain accessible on the promisified worker,
      meaning that you can still call worker.terminate() to close the worker instance.
    </p>
  </Fragment>
);

export default Description;
