import TokenType from './TokenType';
import Token from './Token';
import { BinOp, NumOp } from './astnode';

class Interpreter {
    constructor(ast) {
        this.ast = ast;
    }

    visit_BinOp(node) {
        if (node.type == TokenType.PLUS) {
            return this.visit(node.left) + this.visit(node.right);
        }

        if (node.type == TokenType.MINUS) {
            return this.visit(node.left) - this.visit(node.right);
        }

        if (node.type == TokenType.MUL) {
            return this.visit(node.left) * this.visit(node.right);
        }

        if (node.type == TokenType.DIVISION) {
            return this.visit(node.left) / this.visit(node.right);
        }
    }

    visit_num(node) {
        return node.value;
    }

    visit(node) {
        if (node instanceof BinOp) {
            this.visit_BinOp(node);
        }

        if (node instanceof NumOp) {
            this.visit_num(node);
        }
    }
}

export default Interpreter;
