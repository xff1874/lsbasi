import Interpreter from './Interpreter';
import Lexer from './Lexer';

function run() {
    debugger;
    let lexer = new Lexer(' 2*1-1');
    let inp = new Interpreter(lexer);
    let re = inp.expr();
    console.log(re);
}

run();
