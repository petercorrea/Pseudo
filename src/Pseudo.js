import { Environment } from "../src/Environment.js";

export class Pseudo {
  constructor() {
    this.env = new Environment();
  }

  eval(exp, env) {
    // self evaluating number exp
    if (typeof exp === "number") {
      return exp;
    }

    // self evaluating string exp
    if (typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"') {
      return exp.slice(1, -1);
    }

    // addition
    if (exp[0] === "+") {
      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        // recursive eval
        exp[1] = this.eval(exp[1], env);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2], env);
      }

      return this.eval(exp[1], env) + this.eval(exp[2], env);
    }

    // subtraction
    if (exp[0] === "-") {
      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        exp[1] = this.eval(exp[1], env);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2], env);
      }

      if (typeof exp[1] === "number" && typeof exp[2] === "number") {
        return this.eval(exp[1], env) - this.eval(exp[2], env);
      }
    }

    // multiplication
    if (exp[0] === "*") {
      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        exp[1] = this.eval(exp[1], env);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2], env);
      }

      return this.eval(exp[1], env) * this.eval(exp[2], env);
    }

    // Division
    if (exp[0] === "/") {
      if (exp[2] === 0) {
        throw "cannot divide by zero";
      }

      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        exp[1] = this.eval(exp[1], env);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2], env);
      }

      if (typeof exp[1] === "number" && typeof exp[2] === "number") {
        return this.eval(exp[1]) / this.eval(exp[2]);
      }
    }

    // block evaluation
    if (exp[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    // variable declaration
    if (exp[0] === "var" && exp[2] === "=") {
      if (this._isValidIdentifierName(exp[1])) {
        // recursive eval
        return this.env.defineVariable(exp[1], this.eval(exp[3], env));
      }
    }

    // variable reassign
    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return this.env.reassignVariable(name, this.eval(value, env));
    }

    // variable lookup
    if (this._isValidIdentifierName(exp)) {
      return this.env.lookupVariable(exp);
    }

    throw `could not evaluate expression ${exp}`;
  }

  // helpers
  _isValidIdentifierName = (id) => {
    return typeof id === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(id);
  };

  _evalBlock = (block, env) => {
    let result;

    const [_tag, ...expressions] = block;

    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });

    return result;
  };
}
