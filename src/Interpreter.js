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
        // this.skip_whitespace();
        // if (this.pos > this.text.length - 1)
        //     return new Token(TokenType.EOF, null);

        // let current_char = this.text[this.pos];

        // if (this.isdigital(current_char)) {
        //     let next = current_char;
        //     let temp = '';
        //     while (this.isdigital(next)) {
        //         temp += next;
        //         this.pos++;
        //         next = this.text[this.pos];
        //     }

        //     return new Token(TokenType.INTEGER, temp);
        // }

        // if (current_char === '+') {
        //     this.pos++;
        //     return new Token(TokenType.PLUS, current_char);
        // }

        // if (current_char === '-') {
        //     this.pos++;
        //     return new Token(TokenType.MINUS, current_char);
        // }

        // this.error();

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

    //check the expression current only avaiable expr -> INTEGER PLUS INTERGET;
    expr() {
        this.current_token = this.get_next_token();
        let left = this.current_token;
        this.eat(TokenType.INTEGER); //match the first Integer,and get the next token;

        let op = this.current_token;
        if (op.type == TokenType.PLUS) {
            this.eat(TokenType.PLUS);
        }
        if (op.type == TokenType.MINUS) {
            this.eat(TokenType.MINUS);
        }

        if (op.type == TokenType.MUL) {
            this.eat(TokenType.MUL);
        }

        if (op.type == TokenType.DIVISION) {
            this.eat(TokenType.DIVISION);
        }

        let right = this.current_token;

        this.eat(TokenType.INTEGER);

        if (op.type == TokenType.PLUS) {
            return parseInt(left.value) + parseInt(right.value);
        }

        if (op.type == TokenType.MINUS) {
            return parseInt(left.value) - parseInt(right.value);
        }

        if (op.type == TokenType.MUL) {
            return parseInt(left.value) * parseInt(right.value);
        }

        if (op.type == TokenType.DIVISION) {
            return parseInt(left.value) / parseInt(right.value);
        }
    }
}

export default Interpreter;
