class Sym {
    constructor(name, type, category) {
        this.name = name;
        this.type = type;
        this.category = category;
    }
}

class BuildInSymbol extends Sym {
    constructor(name) {
        super(name, name, 'BuildInSymbol');
    }
}

class VarSymbol extends Sym {
    constructor(name, type) {
        super(name, type, 'VarSymbol');
    }
}

export { BuildInSymbol, VarSymbol };
