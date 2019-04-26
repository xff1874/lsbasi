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
    SEMI: ';',
    DOT: '.',
    ASSIGN: 'ASSIGN',
    PROGRAM: 'PROGRAM',
    VAR: 'VAR',
    DIV: 'DIV',
    INTEGER: 'INTEGER',
    REAL: 'REAL',
    INTEGER_DIV: 'INTEGER_DIV',
    COLON: ':',
    COMMA: ',',
    INTEGER_CONST: 'INTEGER_CONST',
    REAL_CONST: 'REAL_CONST',
    FLOAT_DIV: 'FLOAT_DIV',
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
    PROGRAM: new Token(TokenType.PROGRAM, TokenType.PROGRAM),
    VAR: new Token(TokenType.VAR, TokenType.VAR),
    DIV: new Token(TokenType.INTEGER_DIV, TokenType.DIV),
    REAL: new Token(TokenType.REAL, TokenType.REAL),
    INTEGER: new Token(TokenType.INTEGER, TokenType.INTEGER),
};

export { TokenType, Token, reservedwords };
