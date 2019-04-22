import Lexer from './Lexer';

function run() {
    debugger;
    let lex = new Lexer(
        '7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8)'
    );
    while (!lex.isEnd()) {
        console.log(lex.get_next_token());
    }
}

run();
