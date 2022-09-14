import { Token_Bool, Token_Number } from "../types/types.js";

// To Do:
// - does not recognize "$"
// - turn tokenizer into an iterator
// -
// -
// -

// The Machine
function tokenizer(string) {
  console.log("creating tokens...");

  // generate valid tokens
  let _tokens = [
    "size",
    "length",
    "name",
    "parent",
    "children",
    "init",
    "super",
    "equal",
    "not",
    "is",
    "some",
    "all",
    "exist",
    "forall",
    "true",
    "false",
    "null",
    "memo",
    "get",
    "set",
    "number",
    "string",
    "bool",
    "date",
    "regex",
    "array",
    "map",
    "function",
    "object",
    "effect",
    "future",
    "error",
    "predicate",
    "clause",
    "set",
    "union",
    "subset",
    "intersection",
    "if",
    "then",
    "when",
    "unless",
    "and",
    "or",
    "else",
    "if else",
    "while",
    "do",
    "break",
    "switch",
    "pub",
    "sta",
    "pri",
    "pro",
    "type",
    "async",
    "await",
    "export",
    "default",
    "def",
    "var",
    "lambda",
    "unsafe",
    "children",
    "to",
    "serialize",
    "props",
    ":",
    "{",
    "}",
    "[",
    "]",
    "(",
    ")",
    "=",
    "==",
    "${",
    ":",
    "&",
    "|",
    "<->",
    "->",
    "<-",
    ">=",
    "<=",
    "=>",
    "<=>",
    ";",
    "+",
    "-",
    "*",
    "/",
    "^",
    "**",
    "!",
    "!!",
    "--",
    "++",
    " ",
    "	",
    `
`,
  ];
  let _set = new Set();
  _tokens.forEach((e) => _set.add(e));

  // turn string into array
  let chars = string.split("");

  // append whitespace for termination
  if (chars[chars.length - 1] !== " ") {
    chars.push(" ");
  }

  let tokens = [];
  let token = [];

  // iterate string
  for (let char of chars) {
    // ignore whitespace, use whitespace as token terminator
    if (char.charCodeAt(0) < 41) {
      let tokenString = token.join("");

      // if a valid token
      if (_set.has(tokenString)) {
        switch (tokenString) {
          case "number":
            console.log(`found number`);
            break;

          case "bool":
            console.log(`found bool`);
            break;

          default:
            break;
        }

        tokens.push(token.join(""));
      }

      // reset for next token
      token = [];
    } else {
      token.push(char);
    }
  }

  return tokens;
}
function ast(tokens) {
  console.log("creating abstract syntax tree...");
  console.log(tokens);

  // nodes represent our tokens
  let nodes = {
    number: Token_Number,
    bool: Token_Bool,
  };

  for (let token of tokens) {
    let node = nodes[token];
    node?.whoami();
  }
}

// Testing
let input = "myvar = 12";
ast(tokenizer(input));
