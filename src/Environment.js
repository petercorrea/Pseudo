export class Environment {
  constructor(env = { null: null, true: true, false: false }, parent = null) {
    this.env = env;
    this.parent = parent;
  }

  resolve = (identifier) => {
    if (this.env.hasOwnProperty(identifier)) {
      return this;
    }

    if (this.parent === null) {
      throw new ReferenceError(`variable ${identifier} is not declared`);
    }

    return this.parent.resolve(identifier);
  };

  defineVariable = (identifier, value) => {
    this.env[identifier] = value;
    return value;
  };

  lookupVariable = (identifier) => {
    return this.resolve(identifier).env[identifier];
  };

  reassignVariable = (identifier, value) => {
    this.resolve(identifier).env[identifier] = value;
    return value;
  };
}
