import Interpreter from './Interpreter';

function run() {
    debugger;
    let interp = new Interpreter('9 / 3');
    let re = interp.expr();
    console.log(re);
}

run();
