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

class UnaryOpAST extends AST {
    constructor(token, expr) {
        super(token, expr);
        this.token = token;
        this.expr = expr;
    }
}

class CompoundAST extends AST {
    constructor() {
        super();
        this.children = [];
    }
}

class NoAST extends AST {}

class ProgramAST extends AST {
    constructor(variable, block) {
        super(variable, block);
        this.variable = variable;
        this.block = block;
    }
}
class BlockAST extends AST {
    constructor(declarations, compound_statement) {
        super(declarations, compound_statement);
        this.declarations = declarations;
        this.compound_statement = compound_statement;
    }
}

class VarDeclAST extends AST {
    constructor(ids, type_spec) {
        super(ids, type_spec);
        this.ids = ids;
        this.type_spec = type_spec;
    }
}

export {
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
};
