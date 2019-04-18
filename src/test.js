import Interpreter from './Interpreter';

function run() {
    debugger;
    let interp = new Interpreter(' 12 - 33');
    let re = interp.expr();
    console.log(re);
}

run();
