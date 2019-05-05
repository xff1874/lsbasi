import Lexer from './Lexer';
import Parser from './Parser';
import Interpter from './Interpter';
import { interpreterDirective } from '@babel/types';

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
    let lex = new Lexer(`PROGRAM Part12;
VAR
   a : INTEGER;

PROCEDURE P1;
VAR
   a : REAL;
   k : INTEGER;

   PROCEDURE P2;
   VAR
      a, z : INTEGER;
   BEGIN {P2}
      z := 777;
   END;  {P2}

BEGIN {P1}

END;  {P1}

BEGIN {Part12}
   a := 10;
END.  {Part12}`);

    // while (!lex.isEnd()) {
    //     console.log(lex.get_next_token());
    // }

    let parser = new Parser(lex);
    let p = parser.parse();
    // // astPrint(p);
    let interpter = new Interpter();
    interpter.visit(p);
    console.log(interpter.ENV);
    interpter.printSmt();
}

run();
