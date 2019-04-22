import Lexer from './Lexer';
import { TokenType, Token } from './Token';
import { NumAST, BinaryAST } from './astnode';

/**
 * expr -> term ((PLUS|MINUS)term)*
 * term -> factor ((MUL|DIVISION)factor)*;
 * factor -> NUMBER | LPAREN EXPR RPAREN;
 */
class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.current_token = this.lexer.get_next_token();
    }

    //验证当前的token type，获取下一个token;
    eat(tokenType) {
        if (this.current_token.type == tokenType) {
            this.current_token = this.lexer.get_next_token();
        } else {
            throw new Error(
                `${this.current_token} is not match tokenType ${tokenType}`
            );
        }
    }

    factor() {
        if (this.current_token.type == TokenType.NUM) {
            let current_token = this.current_token;
            this.eat(TokenType.NUM);
            return new NumAST(current_token);
        }
        if (this.current_token.type == TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            let re = this.exp();
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
            let currentToken = this.current_token;

            if (currentToken.type == TokenType.MUL) {
                this.eat(TokenType.MUL);
                return new BinaryAST(left, currentToken, this.factor());
            }

            if (currentToken.type == TokenType.DIVISION) {
                this.eat(TokenType.DIVISION);
                return new BinaryAST(left, currentToken, this.factor());
            }
        }

        return left;
    }

    exp() {
        let left = this.term();

        while (
            this.current_token.type === TokenType.PLUS ||
            this.current_token.type === TokenType.MINUS
        ) {
            let current_token = this.current_token;
            if (current_token.type == TokenType.PLUS) {
                this.eat(TokenType.PLUS);
                return new BinaryAST(left, current_token, this.term());
            }

            if (current_token.type == TokenType.MINUS) {
                this.eat(TokenType.MINUS);
                return new BinaryAST(left, current_token, this.term());
            }
        }
        return left;
    }

    parse() {
        return this.exp();
    }
}

export default Parser;
