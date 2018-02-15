import React, { Component, Fragment } from 'react';
import Worker from '../../worker/example.worker';
import promisifyWorker from '../../../src';

export default class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.worker = promisifyWorker(new Worker());
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  async incrementCounter() {
    const { counter } = this.state;
    const { incrementedCounter } = await this.worker.postMessage({ command: 'Increment', counter });
    this.setState(() => ({ counter: incrementedCounter }));
  }

  render() {
    const { counter } = this.state;
    return (
      <Fragment>
        <p>
          Click the button below to tell the worker to increment a counter.
        </p>
        <button onClick={this.incrementCounter}>
          Counter: {counter}
        </button>
      </Fragment>
    );
  }
}
