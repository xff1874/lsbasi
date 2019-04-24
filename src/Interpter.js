import {
    AST,
    NumAST,
    BinaryAST,
    CompoundAST,
    AssignAST,
    VarAST,
    NoOpAST,
} from './astnode';
import { TokenType } from './Token';

export default class Interpter {
    constructor() {
        this.ENV = {};
    }
    visit_binary_ast(astnode) {
        if (astnode.token.type == TokenType.PLUS) {
            return this.visit(astnode.left) + this.visit(astnode.right);
        }

        if (astnode.token.type == TokenType.MINUS) {
            return this.visit(astnode.left) - this.visit(astnode.right);
        }

        if (astnode.token.type == TokenType.MUL) {
            return this.visit(astnode.left) * this.visit(astnode.right);
        }

        if (astnode.token.type == TokenType.DIVISION) {
            return this.visit(astnode.left) / this.visit(astnode.right);
        }
    }

    visit_num(astnode) {
        return parseInt(astnode.token.value);
    }

    visit_compound(astnode) {
        for (let i = 0; i < astnode.children.length; i++) {
            let child = astnode.children[i];
            this.visit(child);
        }
    }

    visit_assign(astnode) {
        this.ENV[astnode.left.value] = this.visit(astnode.right);
    }

    visit_var(astnode) {
        let name = astnode.token.value;
        return this.ENV[name];
    }

    visit(astNode) {
        if (astNode instanceof BinaryAST) {
            return this.visit_binary_ast(astNode);
        }
        if (astNode instanceof NumAST) {
            return this.visit_num(astNode);
        }

        if (astNode instanceof CompoundAST) {
            return this.visit_compound(astNode);
        }

        if (astNode instanceof AssignAST) {
            return this.visit_assign(astNode);
        }

        if (astNode instanceof VarAST) {
            return this.visit_var(astNode);
        }
    }
}
