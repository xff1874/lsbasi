import TokenType from './TokenType';

class Interpreter {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.current_token = null;
    }

    error() {
        throw new Error('Error parsing input');
    }

    //get next token;
    get_next_token() {
        if (this.pos > this.text.length - 1)
            return new Token(TokenType.EOF, null);

        let current_char = this.text[this.pos];

        if (isdigital(current_char)) {
            this.pos++;
            return new Token(TokenType.INTEGER, current_char);
        }

        if (current_char === '+') {
            this.pos++;
            return new Token(TokenType.PLUS, current_char);
        }

        this.error();
    }
    /*compare current token type with passed token type
     * if matched then return the next_token
     * else throw error;
     */

    eat(token_type) {
        if (this.current_token.type === token_type) {
            this.current_token = this.get_next_token();
        }
        throw new Error(`${token_type} is not matched`);
    }

    //check the expression current only avaiable expr -> INTEGER PLUS INTERGET;
    expr() {
        this.current_token = this.get_next_token();
        let left = this.current_token;
        this.eat(TokenType.INTEGER); //match the first Integer,and get the next token;

        let op = this.current_token;
        this.eat(TokenType.PLUS);

        let right = this.current_token;

        this.eat(TokenType.INTEGER);

        return left.value + right.value;
    }
}

export default Interpreter;
