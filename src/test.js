import Interpreter from './Interpreter';

function run() {
    debugger;
    let interp = new Interpreter('3+4');
    let re = interp.expr();
    console.log(re);
}

run();
