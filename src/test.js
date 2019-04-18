import Interpreter from './Interpreter';

function run() {
    debugger;
    let interp = new Interpreter('7+4-3');
    let re = interp.expr();
    console.log(re);
}

run();
