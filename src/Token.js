const TokenType = {
    NUM: 'NUM',
    PLUS: '+',
    MINUS: '-',
    MUL: '*',
    DIVISION: '/',
    LPAREN: '(',
    RPAREN: ')',
    EOF: 'EOF',
};

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

export { TokenType, Token };
