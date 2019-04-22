import Interpreter from './Interpreter';
import Lexer from './Lexer';
import Parser from './parser';

const astPrint = function(ast) {
    if (ast == null) return;
    console.log(`Token is ${ast.token.type} and value is ${ast.token.value}`);
    astPrint(ast.left);
    astPrint(ast.right);
};

function run() {
    debugger;
    let lexer = new Lexer('5 +(3 + 4)- +2');
    let parser = new Parser(lexer);
    let ast = parser.parse();

    astPrint(ast);

    let inp = new Interpreter();
    let re = inp.visit(ast);
    console.log(re);
}

run();
