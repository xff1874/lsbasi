import TokenType from './TokenType';
import Token from './Token';

class Interpreter {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.current_token = null;
    }

    error() {
        throw new Error('Error parsing input');
    }
    isdigital(c) {
        let re = /\d/g;
        return re.test(c);
    }

    //get next token;
    get_next_token() {
        if (this.pos > this.text.length - 1)
            return new Token(TokenType.EOF, null);

        let current_char = this.text[this.pos];

        if (this.isdigital(current_char)) {
            let next = current_char;
            let temp = '';
            while (this.isdigital(next)) {
                temp += next;
                this.pos++;
                next = this.text[this.pos];
            }

            return new Token(TokenType.INTEGER, temp);
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
        } else throw new Error(`${token_type} is not matched`);
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

        return parseInt(left.value) + parseInt(right.value);
    }
}

export default Interpreter;
