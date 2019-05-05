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
    COMMA: ',',
    COLON: ':',
    INTEGER: 'INTEGER',
    REAL: 'REAL',
    REAL_CONST: 'REAL_CONST',
    INTEGER_CONST: 'INTEGER_CONST',
    DIV: 'DIV',
    INTEGER_DIV: 'INTEGER_DIV',
    FLOAT_DIV: 'FLOAT_DIV',
    PROCEDURE: 'PROCEDURE',
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
    INTEGER: new Token(TokenType.INTEGER, TokenType.INTEGER),
    REAL: new Token(TokenType.REAL, TokenType.REAL),
    DIV: new Token(TokenType.INTEGER_DIV, TokenType.INTEGER_DIV),
    VAR: new Token(TokenType.VAR, TokenType.VAR),
    PROCEDURE: new Token(TokenType.PROCEDURE, TokenType.PROCEDURE),
};

export { TokenType, Token, reservedwords };
