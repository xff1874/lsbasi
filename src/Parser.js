import Lexer from './Lexer';
import { TokenType, Token } from './Token';
import {
    NumAST,
    BinaryAST,
    CompoundAST,
    AssignAST,
    VarAST,
    NoOpAST,
} from './astnode';
import { statements } from '@babel/template';

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
        let current = this.current_token;
        if (current.type == TokenType.NUM) {
            this.eat(TokenType.NUM);
            return new NumAST(current);
        }
        if (current.type == TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            let re = this.exp();
            this.eat(TokenType.RPAREN);
            return re;
        }
        return this.variable();
    }

    term() {
        let node = this.factor();

        while (
            this.current_token.type == TokenType.MUL ||
            this.current_token.type == TokenType.DIVISION
        ) {
            let current_token = this.current_token;
            if (this.current_token.type == TokenType.MUL) {
                this.eat(TokenType.MUL);
            }

            if (this.current_token.type == TokenType.DIVISION) {
                this.eat(TokenType.DIVISION);
            }
            //save previous node as left tree branch.
            node = new BinaryAST(node, current_token, this.factor());
        }

        return node;
    }

    exp() {
        let node = this.term();

        while (
            this.current_token.type === TokenType.PLUS ||
            this.current_token.type === TokenType.MINUS
        ) {
            let current_token = this.current_token;
            if (current_token.type == TokenType.PLUS) {
                this.eat(TokenType.PLUS);
                node = new BinaryAST(node, current_token, this.term());
            } else if (current_token.type == TokenType.MINUS) {
                this.eat(TokenType.MINUS);
                node = new BinaryAST(node, current_token, this.term());
            }
        }
        return node;
    }

    variable() {
        let node = new VarAST(this.current_token, this.current_token.value);
        this.eat(TokenType.ID);
        return node;
    }

    empty() {
        return new NoOpAST();
    }
    /**    assignment_statement : variable ASSIGN expr */
    assignment_statement() {
        let left = this.variable();
        let currentToken = this.current_token;
        this.eat(TokenType.ASSIGN);
        let exp = this.exp();
        let node = new AssignAST(left, currentToken, exp);
        return node;
    }

    /**
     *    statement : compound_statement| assignment_statement| empty
     */
    statement() {
        let node;
        if (this.current_token.type == TokenType.BEGIN) {
            node = this.compound_statement();
        } else if (this.current_token.type == TokenType.ID) {
            node = this.assignment_statement();
        } else node = this.empty();

        return node;
    }

    /**
     * statement_list : statement
                   | statement SEMI statement_list
     */
    statement_list() {
        let node = [this.statement()];

        if (this.current_token.type == TokenType.SEMI) {
            this.eat(TokenType.SEMI);
            let other = this.statement_list();
            if (other) node = node.concat(other);
        }

        //don't know why
        if (this.current_token.type == TokenType.ID) {
            this.error();
        }

        return node;
    }
    /**
     *  compound_statement: BEGIN statement_list END
     */

    compound_statement() {
        this.eat(TokenType.BEGIN);
        let nodes = this.statement_list();
        this.eat(TokenType.END);
        let compound = new CompoundAST();
        compound.children = nodes;
        return compound;
    }

    program() {
        // """program : compound_statement DOT"""
        let astnode = this.compound_statement();
        this.eat(TokenType.DOT);
        return astnode;
    }

    parse() {
        let node = this.program();
        if (this.current_token.type != TokenType.EOF) this.error();
        return node;
    }
}

export default Parser;
