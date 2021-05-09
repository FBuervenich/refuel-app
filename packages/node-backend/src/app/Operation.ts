import EventEmitter from 'events';
const define = Object.defineProperty;

class Operation extends EventEmitter {
  outputs: string[];

  static setOutputs(outputs: string[]) {
    define(this.prototype, 'outputs', {
      value: createOutputs(outputs),
    });
  }

  on(output, handler) {
    if (this.outputs[output]) {
      return this.addListener(output, handler);
    }

    throw new Error(
      `Invalid output "${output}" to operation ${this.constructor.name}.`
    );
  }
}

const createOutputs = (outputsArray: string[]) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};

module.exports = Operation;
