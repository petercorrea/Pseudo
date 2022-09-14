export class Environment {
  env = {
    null: null,
    true: true,
    false: false,
  };

  defineVariable = (identifier, value) => {
    this.env[identifier] = value;
    return value;
  };

  lookupVariable = (identifier) => {
    if (this.env.hasOwnProperty(identifier)) {
      return this.env[identifier];
    }

    throw new ReferenceError(`variable ${identifier} is not declared`);
  };

  reassignedVariable = (identifier, value) => {
    if (this.env.hasOwnProperty(identifier)) {
      this.env[identifier] = value;
      return this.env[identifier];
    }

    throw new ReferenceError(`variable ${identifier} is not declared`);
  };
}
