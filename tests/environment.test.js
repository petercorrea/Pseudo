import assert from "assert";
import { Environment } from "../src/Environment.js";
let E = new Environment();

describe("Testing Environment class", () => {
  it("Environment Class correctly defines variable", () => {
    E.defineVariable("age", 3);
    let expected = 3;
    assert.equal(E.env.age, expected);
  });

  it("Environment Class can correctly lookup variable", () => {
    E.defineVariable("age", 3);
    let actual = E.lookupVariable("age");
    let expected = 3;
    assert.equal(actual, expected);
  });

  it("Environment Class can correctly reassign a variable", () => {
    E.defineVariable("age", 3);
    E.reassignedVariable("age", 5);
    let actual = E.lookupVariable("age");
    let expected = 5;
    assert.equal(actual, expected);
  });

  it("Environment Class fails when looking up invalid variable", () => {
    assert.throws(() => E.lookupVariable("dog"));
  });

  it("Environment Class fails when reassigning invalid variable", () => {
    assert.throws(() => E.reassignedVariable("dog", 5));
  });

  it("Environment Class has globals", () => {
    assert.equal(E.env.true, true);
    assert.equal(E.env.false, false);
    assert.equal(E.env.null, null);
  });
});
