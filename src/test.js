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
    let lex = new Lexer(
        '7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8)'
    );
    // while (!lex.isEnd()) {
    //     console.log(lex.get_next_token());
    // }

    let parser = new Parser(lex);
    let p = parser.parse();
    astPrint(p);
    let interpter = new Interpter();
    let re = interpter.visit(p);
    console.log(re);
}

run();
