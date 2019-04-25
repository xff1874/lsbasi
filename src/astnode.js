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

class AssignAST extends AST {
    constructor(left, token, right) {
        super(left, token, right);
        this.left = left;
        this.token = token;
        this.right = right;
    }
}

class VarAST extends AST {
    constructor(token, value) {
        super(token, value);
        this.token = token;
        this.value = value;
    }
}

class CompoundAST extends AST {
    constructor() {
        super();
        this.children = [];
    }
}

class NoAST extends AST {}

export { NumAST, BinaryAST, VarAST, AssignAST, CompoundAST, NoAST };
