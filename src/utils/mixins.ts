//
class Convertor {
    toNumber(value: any): number {
        if (value === undefined) return NaN;
        if (value === null) return 0;
        if (typeof value === "boolean") {
            if (value) return 1;
            else return 0;
        }
        if (typeof value === "string") return parseInt(value)
        if (typeof value === "symbol") throw new Error('TYPE ERROR: Unexpected operand type.')
        if (typeof value === "object") throw new Error('TYPE ERROR: Unexpected operand type.')
        return value;
    }
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}

export { Convertor, applyMixins }