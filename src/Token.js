export default class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    toString() {
        console.log(`Token(${this.thype},${this.value})`);
    }
}
