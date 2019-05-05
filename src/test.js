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
    let lex = new Lexer(`PROGRAM Main;
   VAR x : INTEGER;

BEGIN
    x := y;
END.`);

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
