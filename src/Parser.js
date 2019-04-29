import Lexer from './Lexer';
import { TokenType, Token } from './Token';
import {
    NumAST,
    BinaryAST,
    VarAST,
    AssignAST,
    CompoundAST,
    NoAST,
    ProgramAST,
    BlockAST,
    VarDeclAST,
    UnaryOpAST,
} from './astnode';

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
        if (current.type == TokenType.PLUS) {
            this.eat(TokenType.PLUS);
            return new UnaryOpAST(current, this.factor());
        }

        if (current.type == TokenType.MINUS) {
            this.eat(TokenType.MINUS);
            return new UnaryOpAST(current, this.factor());
        }
        if (
            current.type == TokenType.REAL_CONST ||
            current.type == TokenType.INTEGER_CONST
        ) {
            if (current.type == TokenType.REAL_CONST)
                this.eat(TokenType.REAL_CONST);

            if (current.type == TokenType.INTEGER_CONST)
                this.eat(TokenType.INTEGER_CONST);
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
            this.current_token.type == TokenType.INTEGER_DIV ||
            this.current_token.type == TokenType.FLOAT_DIV
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

    declarations() {
        this.eat(TokenType.VAR);
        let nodes = [];

        while (this.current_token.type == TokenType.ID) {
            nodes.push(this.variable_declaration());
            this.eat(TokenType.SEMI);
        }

        return nodes;
    }

    variable_declaration() {
        if (this.current_token.type == TokenType.ID) {
            let current = this.current_token;
            this.eat(TokenType.ID);
            let nodes = [current];
            while (this.current_token.type == TokenType.COMMA) {
                this.eat(TokenType.COMMA);
                let left = this.current_token;
                nodes.push(left);
                this.eat(TokenType.ID);
            }

            this.eat(TokenType.COLON);

            let type_spec = this.type_spec();

            return new VarDeclAST(nodes, type_spec);
        }
    }

    type_spec() {
        let current = this.current_token;
        if (current.type == TokenType.INTEGER) this.eat(TokenType.INTEGER);
        else if (current.type == TokenType.REAL) this.eat(TokenType.REAL);
        return current;
    }

    block() {
        let declarations = this.declarations();
        let compound_statement = this.compound_statement();
        return new BlockAST(declarations, compound_statement);
    }

    program() {
        this.eat(TokenType.PROGRAM);
        let v = this.variable();
        this.eat(TokenType.SEMI);
        let block = this.block();

        let node = new ProgramAST(v, block);
        // let node = this.compound_statement();
        this.eat(TokenType.DOT);
        if (this.current_token.type != TokenType.EOF) {
            throw 'Houston, we got a problem';
        }
        return node;
    }

    parse() {
        return this.program();
    }
}

export default Parser;
