class Ast {}
class BinOp extends Ast {
    constructor(left, token, right) {
        super(left, token, right);
        this.left = left;
        this.token = token;
        this.right = right;
    }
}
class NumOp extends Ast {
    constructor(token) {
        super(token);
        this.token = token;
    }
}

class UnaryOp extends Ast {
    constructor(token, expr) {
        super(token, expr);
        this.token = token;
        this.expr = expr;
    }
}

export { BinOp, NumOp, UnaryOp };
