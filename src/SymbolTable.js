import { BuildInSymbol } from "./Symbol"

export class SymTable{
    constructor(){
        this.symbols = {};
        this.initBuildInSymbols();
    }

    initBuildInSymbols(){
        let integer = new BuildInSymbol("INTEGER");
        let real = new BuildInSymbol("REAL");
        this.define(integer);
        this.define(real);
    }

    //store
    define(symbol){
        this.symbols[symbol.name] = symbol;
        console.log(`define:${JSON.stringify(symbol)}`)
    }

    //lookup
    lookup(name){
        console.log(`lookup:${JSON.stringify(name)}`)
        return  this.symbols[name];
    }


}

