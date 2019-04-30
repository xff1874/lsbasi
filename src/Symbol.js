
class Sym {
    constructor(name,type){
        this.name = name;
        this.type = type;
    }
}

class BuildInSymbol extends Sym{
    constructor(name){
        super(name,name)
    }
}

class VarSymbol extends Sym{}

export {BuildInSymbol,VarSymbol}