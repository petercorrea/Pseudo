import { Environment } from "../src/Environment.js";

export class Pseudo {
  constructor() {
    this.env = new Environment();
  }

  eval(exp) {
    // self evaluating number exp
    if (typeof exp === "number" && arguments.length === 1) {
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
        exp[1] = this.eval(exp[1]);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2]);
      }

      if (typeof exp[1] === "number" && typeof exp[2] === "number") {
        return exp[1] + exp[2];
      }
    }

    // subtraction
    if (exp[0] === "-") {
      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        exp[1] = this.eval(exp[1]);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2]);
      }

      if (typeof exp[1] === "number" && typeof exp[2] === "number") {
        return exp[1] - exp[2];
      }
    }

    // multiplication
    if (exp[0] === "*") {
      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        exp[1] = this.eval(exp[1]);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2]);
      }

      if (typeof exp[1] === "number" && typeof exp[2] === "number") {
        return exp[1] * exp[2];
      }
    }

    // Division
    if (exp[0] === "/") {
      if (exp[2] === 0) {
        throw "cannot divide by zero";
      }

      // check recursively for sub-expressions
      if (Array.isArray(exp[1])) {
        exp[1] = this.eval(exp[1]);
      }

      if (Array.isArray(exp[2])) {
        exp[2] = this.eval(exp[2]);
      }

      if (typeof exp[1] === "number" && typeof exp[2] === "number") {
        return exp[1] / exp[2];
      }
    }

    // variable declaration
    if (exp[0] === "var" && exp[2] === "=") {
      if (this._isValidIdentifierName(exp[1])) {
        // recursive eval
        return this.env.defineVariable(exp[1], this.eval(exp[3]));
      }
    }

    // variable lookup
    if (_isValidIdentifierName(exp)) {
      return this.env.lookupVariable(exp);
    }

    throw "could not evaluate expression";
  }

  _isValidIdentifierName = (id) => {
    return typeof id === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(id);
  };
}
