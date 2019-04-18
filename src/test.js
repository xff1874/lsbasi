import Interpreter from './Interpreter';
import Lexer from './Lexer';

function run() {
    debugger;
    let lexer = new Lexer('7 * 4 / 2');
    let inp = new Interpreter(lexer);
    let re = inp.expr();
    console.log(re);
}

run();
