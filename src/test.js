import Interpreter from './Interpreter';

function run() {
    debugger;
    let interp = new Interpreter('7 * 4 / 2');
    let re = interp.expr();
    console.log(re);
}

run();
