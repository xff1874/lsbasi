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
    let lex = new Lexer(`BEGIN
    BEGIN
        number := 2;
        a := number;
        b := 10 * a + 10 * number / 4;
    END;
    x := 11;
END.`);
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
