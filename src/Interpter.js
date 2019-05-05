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
    ProcedureDeclAST,
} from './astnode';
import { TokenType } from './Token';
import { SymTable } from './SymbolTable';
import { VarSymbol } from './Symbol';

export default class Interpter {
    constructor(props) {
        this.smt = new SymTable();
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

        if (
            astnode.token.type == TokenType.INTEGER_DIV ||
            astnode.token.type == TokenType.FLOAT_DIV
        ) {
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
        // this.
        let name = astnode.left.value;
        let symbol = this.smt.lookup(name);
        if (!symbol) throw `${name} symbol not found`;
        this.ENV[astnode.left.value] = this.visit(astnode.right);
    }

    visit_var(astnode) {
        return this.ENV[astnode.value];
    }

    visit_program(astnode) {
        return this.visit(astnode.block);
    }

    visit_block(astnode) {
        for (let i = 0; i < astnode.declarations.length; i++) {
            this.visit(astnode.declarations[i]);
        }
        this.visit(astnode.compound_statement);
    }

    visit_program_ast(astNode) {
        this.visit(astNode.block);
    }

    visit_vardecl_ast(astNode) {
        for (let i = 0; i < astNode.ids.length; i++) {
            let type_name = astNode.type_spec.value;
            let typesymbol = this.smt.lookup(type_name);
            let symbol_name = astNode.ids[i].value;
            let varsymbol = new VarSymbol(symbol_name, typesymbol);
            this.smt.define(varsymbol);

            this.visit(astNode.ids[i]);
        }
    }

    visit_unaryop(astNode) {
        if (astNode.token.type == TokenType.PLUS) {
            return +parseInt(this.visit(astNode.expr));
        }

        if (astNode.token.type == TokenType.MINUS) {
            return -parseInt(this.visit(astNode.expr));
        }
    }

    visit_procedure(astNode) {
        //do nothing now;
    }

    visit(astNode) {
        if (astNode instanceof ProgramAST) {
            return this.visit_program_ast(astNode);
        }

        if (astNode instanceof BlockAST) {
            return this.visit_block(astNode);
        }

        if (astNode instanceof VarDeclAST) {
            return this.visit_vardecl_ast(astNode);
        }
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

        if (astNode instanceof ProgramAST) {
            return this.visit_program(astNode);
        }

        if (astNode instanceof BlockAST) {
            return this.visit_block(astNode);
        }

        if (astNode instanceof UnaryOpAST) {
            return this.visit_unaryop(astNode);
        }

        if (astNode instanceof ProcedureDeclAST) {
            return this.visit_procedure(astNode);
        }
    }

    printSmt() {
        this.smt.printAllSymbols();
    }
}
