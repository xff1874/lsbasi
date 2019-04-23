const TokenType = {
    NUM: 'NUM',
    PLUS: '+',
    MINUS: '-',
    MUL: '*',
    DIVISION: '/',
    LPAREN: '(',
    RPAREN: ')',
    EOF: 'EOF',
    BEGIN: 'BEGIN',
    END: 'END',
    ID: 'ID',
    SEMI: 'SEMI',
    DOT: 'DOT',
    ASSIGN: 'ASSIGN',
};

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    toString() {
        return `Token type is ${this.type} and value is ${this.value}`;
    }
}

const reservedwords = {
    BEGIN: new Token(TokenType.BEGIN, TokenType.BEGIN),
    END: new Token(TokenType.END, TokenType.END),
};

export { TokenType, Token, reservedwords };
