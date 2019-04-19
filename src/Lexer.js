import TokenType from './TokenType';
import Token from './Token';

class Lexer {
    constructor(text) {
        this.text = text;
        this.pos = 0;

        //add current_char field;
        this.current_char = this.text[this.pos];
    }

    isdigital(c) {
        let re = /\d/g;
        return re.test(c);
    }

    isspace(c) {
        return /\s/g.test(c);
    }

    skip_whitespace() {
        while (this.current_char != null && this.isspace(this.current_char)) {
            this.advance();
        }
    }

    //Return a (multidigit) integer consumed from the input.
    integer() {
        //not end and is digital loop
        let re = '';
        while (this.current_char != null && this.isdigital(this.current_char)) {
            re += this.current_char;
            this.advance();
        }
        return re;
    }

    error() {
        throw new Error('Error parsing input');
    }

    //move the pos pointer and set the current_char
    advance() {
        this.pos++;
        if (this.pos > this.text.length - 1) {
            this.current_char = null; // represent the end character;
        } else this.current_char = this.text[this.pos];
    }

    //get next token;
    get_next_token() {
        while (this.current_char) {
            if (this.isspace(this.current_char)) {
                this.skip_whitespace();
                continue;
            }

            if (this.isdigital(this.current_char)) {
                return new Token(TokenType.INTEGER, this.integer());
            }

            if (this.current_char === '+') {
                this.advance();
                return new Token(TokenType.PLUS, '+');
            }

            if (this.current_char === '-') {
                this.advance();
                return new Token(TokenType.MINUS, '-');
            }

            if (this.current_char === '*') {
                this.advance();
                return new Token(TokenType.MUL, '*');
            }

            if (this.current_char === '/') {
                this.advance();
                return new Token(TokenType.DIVISION, '/');
            }

            if (this.current_char === '(') {
                this.advance();
                return new Token(TokenType.LPAREN, '(');
            }

            if (this.current_char === ')') {
                this.advance();
                return new Token(TokenType.RPAREN, ')');
            }

            this.error();
        }

        return new Token(TokenType.EOF, null);
    }
}

export default Lexer;
