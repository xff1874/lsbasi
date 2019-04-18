import TokenType from './TokenType';
import Token from './Token';

class Interpreter {
    constructor(lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();
    }

    factor() {
        let current_token = this.current_token;
        this.eat(TokenType.INTEGER);
        return parseInt(current_token.value);
    }

    /*compare current token type with passed token type
     * if matched then return the next_token
     * else throw error;
     */

    eat(token_type) {
        if (this.current_token.type === token_type) {
            this.current_token = this.lexer.get_next_token();
        } else throw new Error(`${token_type} is not matched`);
    }

    expr() {
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
