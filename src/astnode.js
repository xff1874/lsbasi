class AST {}

class NumAST extends AST {
    constructor(token) {
        super(token);
        this.token = token;
    }
}

class BinaryAST extends AST {
    constructor(left, token, right) {
        super(left, token, right);
        this.left = left;
        this.token = token;
        this.right = right;
    }
}

export { AST, NumAST, BinaryAST };
