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

class ProgramAST extends AST {
    constructor(name, block) {
        super(name, block);
        this.name = name;
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
    constructor(var_node, type_node) {
        super(var_node, type_node);
        this.var_node = var_node;
        this.type_node = type_node;
    }
}

class TypeAST extends AST {
    constructor(token) {
        super(token);
        this.token = token;
        this.value = token.value;
    }
}

export {
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
};
