import TokenType from './TokenType';
import Token from './Token';

class Interpreter {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.current_token = null;
        //add current_char field;
        this.current_char = this.text[this.pos];
    }

    error() {
        throw new Error('Error parsing input');
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

            this.error();
        }

        return new Token(TokenType.EOF, null);
    }
    /*compare current token type with passed token type
     * if matched then return the next_token
     * else throw error;
     */

    eat(token_type) {
        if (this.current_token.type === token_type) {
            this.current_token = this.get_next_token();
        } else throw new Error(`${token_type} is not matched`);
    }

    //move the pos pointer and set the current_char
    advance() {
        this.pos++;
        if (this.pos > this.text.length - 1) {
            this.current_char = null; // represent the end character;
        } else this.current_char = this.text[this.pos];
    }

    term(type) {
        let ct = this.current_token;
        this.eat(type);
        return parseInt(ct.value);
    }

    factor() {
        let current_token = this.current_token;
        this.eat(TokenType.INTEGER);
        return parseInt(current_token.value);
    }

    expr() {
        this.current_token = this.get_next_token();
        let re = this.factor();

        while (
            this.current_token.type == TokenType.MUL ||
            this.current_token.type == TokenType.DIVISION
        ) {
            if (this.current_token.type == TokenType.MUL) {
                this.eat(TokenType.MUL);
                re = re * this.factor();
            }

            if (this.current_token.type == TokenType.DIVISION) {
                this.eat(TokenType.DIVISION);
                re = re / this.factor();
            }
        }

        return re;
    }
}

export default Interpreter;
