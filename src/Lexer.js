import { Token, TokenType, reservedwords } from './Token';

/**lex 7 + 3 * (10 / (12 / (3 + 1) - 1)) / (2 + 3) - 5 - 3 + (8) */

class Lexer {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.current_char = this.text[this.pos];
    }

    isEnd() {
        if (this.pos > this.text.length - 1) return true;
    }
    //ll1 peek
    peek() {
        let pos = this.pos + 1;
        if (pos > this.text.length - 1) return null;
        else return this.text[pos];
    }
    //move pos forward and set char to current_char
    advance() {
        this.pos++;
        if (this.pos > this.text.length - 1) {
            this.current_char = null; //end of file signial;
        } else {
            this.current_char = this.text[this.pos];
        }
    }

    error() {
        throw new Error(`${this.current_char} is not valid`);
    }

    is_space_char(c) {
        return /\s/g.test(c);
    }

    is_digital(c) {
        return /\d/g.test(c);
    }

    skip_white_space() {
        if (this.is_space_char(this.current_char))
            while (!this.isEnd() && this.is_space_char(this.current_char))
                this.advance();
    }

    create_digital_token() {
        let re = '';
        while (!this.isEnd() && this.is_digital(this.current_char)) {
            re += this.current_char;
            this.advance();
        }

        return new Token(TokenType.NUM, re);
    }

    is_id(c) {
        return /[a-zA-Z]/.test(c);
    }

    create_id() {
        let re = '';
        while (!this.isEnd() && this.is_id(this.current_char)) {
            re += this.current_char;
            this.advance();
        }
        return reservedwords[re]
            ? reservedwords[re]
            : new Token(TokenType.ID, re);

        // return ;
    }

    get_next_token() {
        while (!this.isEnd()) {
            this.skip_white_space();

            if (this.is_id(this.current_char)) {
                return this.create_id();
            }

            if (this.is_digital(this.current_char)) {
                return this.create_digital_token();
            }

            if (this.current_char == '+') {
                this.advance();
                return new Token(TokenType.PLUS, '+');
            }

            if (this.current_char == '-') {
                this.advance();
                return new Token(TokenType.MINUS, '-');
            }

            if (this.current_char == '*') {
                this.advance();
                return new Token(TokenType.MUL, '*');
            }

            if (this.current_char == '/') {
                this.advance();
                return new Token(TokenType.DIVISION, '/');
            }

            if (this.current_char == '(') {
                this.advance();
                return new Token(TokenType.LPAREN, '(');
            }

            if (this.current_char == ')') {
                this.advance();
                return new Token(TokenType.RPAREN, ')');
            }

            if (this.current_char == ';') {
                this.advance();
                return new Token(TokenType.SEMI, ';');
            }

            if (this.current_char == '.') {
                this.advance();
                return new Token(TokenType.DOT, '.');
            }

            if (this.current_char == ':' && this.peek() === '=') {
                this.advance();
                this.advance();
                return new Token(TokenType.ASSIGN, ':=');
            }

            this.error();
        }

        return new Token(TokenType.EOF, null);
    }
}

export default Lexer;
