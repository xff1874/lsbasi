import Lexer from './Lexer';
import Parser from './Parser';
import Interpter from './Interpter';

function astPrint(node) {
    if (!node) return;
    console.log(
        `node type is ${node.token.type} and node value is ${node.token.value}`
    );
    astPrint(node.left);
    astPrint(node.right);
}

function run() {
    debugger;
    let lex = new Lexer(`PROGRAM Part10AST;
VAR
   a, b : INTEGER;
   y    : REAL;

BEGIN {Part10AST}
   a := 2;
   b := 10 * a + 10 * a DIV 4;
   y := 20 / 7 + 3.14;
END.  {Part10AST}`);
    // while (!lex.isEnd()) {
    //     console.log(lex.get_next_token());
    // }

    let parser = new Parser(lex);
    let p = parser.parse();
    // astPrint(p);
    let interpter = new Interpter();
    interpter.visit(p);
    console.log(interpter.ENV);
}

run();
