import TokenType from './TokenType';
import { NumOp, BinOp } from './astnode.js';

export default class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();
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
    factor() {
        if (this.current_token.type == TokenType.INTEGER) {
            let current = this.current_token;
            this.eat(TokenType.INTEGER);
            return new NumOp(current);
        }

        if (this.current_token.type == TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            let re = this.expr();
            this.eat(TokenType.RPAREN);
            return re;
        }
    }
    term() {
        let left = this.factor();

        while (
            this.current_token.type == TokenType.MUL ||
            this.current_token.type == TokenType.DIVISION
        ) {
            let temp = this.current_token;
            if (this.current_token.type == TokenType.MUL) {
                this.eat(TokenType.MUL);
            }

            if (this.current_token.type == TokenType.DIVISION) {
                this.eat(TokenType.DIVISION);
            }
            return new BinOp(left, temp, this.factor());
        }

        return left;
    }

    expr() {
        let left = this.term();

        while (
            this.current_token.type == TokenType.PLUS ||
            this.current_token.type == TokenType.MINUS
        ) {
            let temp = this.current_token;
            if (this.current_token.type == TokenType.PLUS) {
                this.eat(TokenType.PLUS);
            }

            if (this.current_token.type == TokenType.MINUS) {
                this.eat(TokenType.MINUS);
            }

            return new BinOp(left, temp, this.term());
        }
    }

    parse() {
        return this.expr();
    }
}
