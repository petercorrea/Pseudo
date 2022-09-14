import assert from "assert";
import { Pseudo } from "../src/Pseudo.js";
let P = new Pseudo();

describe("Testing Pseudo class", () => {
  it("Pseudo Class returns selfs evaluating number expressions correctly", () => {
    let expected = 42;
    let actual = P.eval(42);
    assert.equal(actual, expected);
  });

  it("Pseudo Class returns selfs evaluating string expressions correctly", () => {
    let expected = "peter";
    let actual = P.eval('"peter"');
    assert.equal(actual, expected);
  });

  it("Pseudo Class correctly evaluates addition of two numbers", () => {
    let expected = 6;
    let actual = P.eval(["+", 5, 1]);
    assert.equal(actual, expected);
  });

  it("Pseudo Class correctly evaluates addition of complex expressions", () => {
    let expected = 6;
    let actual = P.eval(["+", ["+", 2, 3], 1]);
    assert.equal(actual, expected);
  });

  it("Pseudo Class correctly evaluates division by zero", () => {
    assert.throws(() => P.eval(["+", ["/", 6, 0], 2]));
  });

  it("Pseudo Class correctly evaluates division", () => {
    let expected = 2;
    let actual = P.eval(["/", ["/", 100, 10], 5]);
    assert.equal(actual, expected);
  });

  // variables
  it("Pseudo Class correctly returns a variable", () => {
    let actual = P.eval(["var", "count", "=", 3]);
    assert.equal(actual, 3);
  });

  it("Pseudo Class correctly returns a complex variable expression", () => {
    let actual = P.eval(["var", "count", "=", ["var", "innerCount", "=", 3]]);
    assert.equal(P.env.env.innerCount, 3);
    assert.equal(P.env.env.count, 3);
    assert.equal(actual, 3);
  });

  it("Pseudo Class correctly defines a variable", () => {
    let actual = P.eval(["var", "count", "=", 3]);
    assert.equal(actual, 3);
  });

  it("Pseudo Class detects undeclared variable", () => {
    assert.throws(() => P.eval("peter"));
  });

  it("Pseudo Class detects invalid identifiers", () => {
    assert.throws(() => P.eval(["var", "1count", "=", 3]));
    assert.throws(() => P.eval(["var", "!count", "=", 3]));
    assert.throws(() => P.eval(["var", "c!ount", "=", 3]));
    assert.throws(() => P.eval(["var", "c-ount", "=", 3]));
  });

  it("Pseudo Class evaluates block expressions correctly", () => {
    assert.equal(
      P.eval([
        "begin",
        ["var", "x", "=", 10],
        ["var", "y", "=", 20],
        ["+", ["*", "x", "y"], 30],
      ]),
      230
    );
  });

  it("Pseudo Class evaluates nested block expressions and access env correctly", () => {
    assert.equal(
      P.eval([
        "begin",
        ["var", "value", "=", 10],
        [
          "var",
          "result",
          "=",
          ["begin", ["var", "x", "=", ["+", "value", 10]]],
        ],
        "result",
      ]),
      20
    );
  });

  it("Pseudo Class evaluates assignment correctly", () => {
    assert.equal(
      P.eval([
        "begin",
        ["var", "data", "=", 10],
        ["begin", ["set", "data", 100]],
        "data",
      ]),
      100
    );
  });
});
