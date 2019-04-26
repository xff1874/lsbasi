import Lexer from './Lexer';
import { TokenType, Token } from './Token';
import {
    NumAST,
    VarDeclAST,
    BinaryAST,
    TypeAST,
    VarAST,
    AssignAST,
    CompoundAST,
    NoAST,
    ProgramAST,
    BlockAST,
} from './astnode';
import { blockStatement } from '@babel/types';
import { shouldInstrument } from 'jest-runtime';

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

    empty() {
        return new NoAST();
    }

    factor() {
        let current = this.current_token;
        if (current.type == TokenType.INTEGER_CONST) {
            this.eat(TokenType.INTEGER_CONST);
            return new NumAST(current);
        } else if (current.type == TokenType.REAL_CONST) {
            this.eat(TokenType.REAL_CONST);
            return new NumAST(current);
        } else if (current.type == TokenType.LPAREN) {
            this.eat(TokenType.LPAREN);
            let re = this.exp();
            this.eat(TokenType.RPAREN);
            return re;
        } else return this.variable();
    }

    term() {
        let node = this.factor();

        while (
            [TokenType.MUL, TokenType.INTEGER_DIV, TokenType.FLOAT_DIV].indexOf(
                this.current_token.type
            ) != -1
        ) {
            let current_token = this.current_token;
            if (this.current_token.type == TokenType.MUL) {
                this.eat(TokenType.MUL);
            }

            if (this.current_token.type == TokenType.INTEGER_DIV) {
                this.eat(TokenType.INTEGER_DIV);
            }

            if (this.current_token.type == TokenType.FLOAT_DIV) {
                this.eat(TokenType.FLOAT_DIV);
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
        let current = this.current_token;
        this.eat(TokenType.ID);
        return new VarAST(current, current.value);
    }

    assignment_statement() {
        let current = this.current_token;
        let left = this.variable();
        this.eat(TokenType.ASSIGN);
        let right = this.exp();

        return new AssignAST(
            left,
            new Token(TokenType.ASSIGN, TokenType.ASSIGN),
            right
        );
    }
    statement_list() {
        let node = this.statement();

        if (this.current_token.type == TokenType.SEMI) {
            this.eat(TokenType.SEMI);
            let nodelist = this.statement_list();
            if (nodelist) node = [node].concat(nodelist);
        }

        return node;
    }

    statement() {
        let current = this.current_token;
        let node;

        if (current.type == TokenType.BEGIN) {
            node = this.compound_statement();
        } else if (current.type == TokenType.ID) {
            node = this.assignment_statement();
        }
        return node;
    }

    compound_statement() {
        this.eat(TokenType.BEGIN);
        let node = this.statement_list();
        this.eat(TokenType.END);

        let compound_ast = new CompoundAST();
        compound_ast.children = node;
        return compound_ast;
    }

    type_spec() {
        if (this.current_token.type == TokenType.INTEGER) {
            let current = this.current_token;
            this.eat(TokenType.INTEGER);
            return new TypeAST(current, current.value);
        } else if (this.current_token.type == TokenType.REAL) {
            let current = this.current_token;
            this.eat(TokenType.REAL);
            return new TypeAST(current, current.value);
        }

        throw `${this.current_token} is not INTEGER or REAL`;
    }
    //"""variable_declaration : ID (COMMA ID)* COLON type_spec"""
    variable_declaration() {
        let varsList = [];
        if (this.current_token.type == TokenType.ID) {
            let current = this.current_token;
            this.eat(TokenType.ID);
            varsList.push(new VarAST(current, current.value));
        }

        while (this.current_token.type == TokenType.COMMA) {
            this.eat(TokenType.COMMA);
            let current = this.current_token;
            varsList.push(new VarAST(current, current.value));
            this.eat(TokenType.ID);
        }
        this.eat(TokenType.COLON);

        let type_node = this.type_spec();

        let vardecl = new VarDeclAST(varsList, type_node);

        return vardecl;
    }

    //declarations : VAR (variable_declaration SEMI)+| empty
    declarations() {
        let declarations = [];
        if (this.current_token.type == TokenType.VAR) {
            this.eat(TokenType.VAR);
            while (this.current_token.type == TokenType.ID) {
                let node = this.variable_declaration();
                declarations.push(node);
                this.eat(TokenType.SEMI);
            }
        } else {
            this.empty();
        }
        return declarations;
    }

    /**
     * block : declarations compound_statement
     */

    block() {
        let declarations = this.declarations();
        let compound_statement = this.compound_statement();

        return new BlockAST(declarations, compound_statement);
    }

    //    """program : PROGRAM variable SEMI block DOT"""

    program() {
        this.eat(TokenType.PROGRAM);
        let var_node = this.variable();
        this.eat(TokenType.SEMI);
        let block = this.block();
        this.eat(TokenType.DOT);

        let program = new ProgramAST(var_node, block);
        if (this.current_token.type != TokenType.EOF) {
            throw 'Houston, we got a problem';
        }
        return program;
    }

    parse() {
        return this.program();
    }
}

export default Parser;
