"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var duration_1 = __importDefault(require("../src/utils/duration"));
describe('Duration', function () {
    describe('Constructor', function () {
        it('constructs from named parameters', function () {
            var d = new duration_1.default({ hours: 1, minutes: 30 });
            expect(d.inMinutes).toBe(90);
        });
        it('constructs from positional parameters', function () {
            var d = new duration_1.default(1, 2, 30); // 1d 2h 30m
            expect(d.inMinutes).toBeCloseTo((1 * 24 * 60) + (2 * 60) + 30);
        });
        it('constructs from raw microseconds', function () {
            var d = new duration_1.default(1000000);
            expect(d.inMicroseconds).toBe(1000000);
        });
        it('throws on invalid constructor input', function () {
            // @ts-ignore
            expect(function () { return new duration_1.default('bad'); }).toThrow();
            // @ts-ignore
            expect(function () { return new duration_1.default({ foo: 1 }); }).not.toThrow(); // unknown field ignored
        });
    });
    describe('Getters', function () {
        var d = new duration_1.default({ days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1, microseconds: 1 });
        it('computes inDays', function () {
            expect(d.inDays).toBeCloseTo(1 + 1 / 24 + 1 / 1440 + 1 / 86400 + 1 / 86400000 + 1 / 86400000000);
        });
        it('computes inHours', function () {
            expect(d.inHours).toBeCloseTo(25.0169, 3);
        });
        it('computes inMinutes', function () {
            expect(d.inMinutes).toBeCloseTo(1501.014, 2);
        });
        it('computes inSeconds', function () {
            expect(d.inSeconds).toBeGreaterThan(90000);
        });
        it('computes inMilliseconds', function () {
            expect(d.inMilliseconds).toBeGreaterThan(90000000);
        });
        it('computes inMicroseconds', function () {
            expect(d.inMicroseconds).toBeGreaterThan(90000000000);
        });
        it('detects negative durations', function () {
            var negative = new duration_1.default(-1000);
            expect(negative.isNegative).toBe(true);
        });
    });
    describe('Math operations', function () {
        var d1 = new duration_1.default(1000000); // 1 sec
        var d2 = new duration_1.default(500000); // 0.5 sec
        it('adds durations', function () {
            expect(d1.add(d2).inMicroseconds).toBe(1500000);
        });
        it('subtracts durations', function () {
            expect(d1.subtract(d2).inMicroseconds).toBe(500000);
        });
        it('multiplies durations', function () {
            expect(d1.multiply(2).inMicroseconds).toBe(2000000);
        });
        it('divides durations', function () {
            expect(d1.divide(2).inMicroseconds).toBe(500000);
        });
        it('throws on division by zero', function () {
            expect(function () { return d1.divide(0); }).toThrow();
        });
        it('returns absolute duration', function () {
            var neg = new duration_1.default(-1000000);
            expect(neg.abs().inMicroseconds).toBe(1000000);
        });
    });
    describe('Comparisons', function () {
        var d1 = new duration_1.default(1000000);
        var d2 = new duration_1.default(2000000);
        it('gt / gte', function () {
            expect(d2.gt(d1)).toBe(true);
            expect(d2.gte(d1)).toBe(true);
            expect(d2.gte(d2)).toBe(true);
        });
        it('lt / lte', function () {
            expect(d1.lt(d2)).toBe(true);
            expect(d1.lte(d2)).toBe(true);
            expect(d1.lte(d1)).toBe(true);
        });
        it('equal', function () {
            expect(d1.equal(new duration_1.default(1000000))).toBe(true);
            expect(d1.equal(d2)).toBe(false);
        });
        it('compareTo', function () {
            expect(d1.compareTo(d2)).toBe(-1);
            expect(d2.compareTo(d1)).toBe(1);
            expect(d1.compareTo(new duration_1.default(1000000))).toBe(0);
        });
    });
    describe('Serialization', function () {
        var d = new duration_1.default({ hours: 1, minutes: 1, seconds: 1, microseconds: 123456 });
        it('toString returns formatted string', function () {
            expect(new duration_1.default({ hours: 1, minutes: 3, seconds: 4, microseconds: 456 }).toString()).toBe('01:03:04.000456');
        });
        it('toJSON returns same as toString', function () {
            expect(d.toJSON()).toBe(d.toString());
        });
        it('valueOf returns raw microseconds', function () {
            expect(d.valueOf()).toBe(d.inMicroseconds);
        });
        it('Symbol.toStringTag returns "Duration"', function () {
            expect(Object.prototype.toString.call(d)).toBe('[object Duration]');
        });
    });
    // describe('Input coercion', () => {
    // it('coerces numeric strings to numbers', () => {
    //   const d = new Duration('123');
    //   expect(d.inMicroseconds).toBe(123);
    // });
    // it('returns 0 for non-numeric strings', () => {
    //   const d = new Duration('abc');
    //   expect(d.inMicroseconds).toBe(0);
    // });
    // it('throws on symbol input', () => {
    //   expect(() => new Duration(Symbol('x') as any)).toThrow('ARGUMENT ERROR: Invalid constructor usage.');
    // });
    // it('throws on object input', () => {
    //   expect(() => new Duration({} as any)).toThrow('ARGUMENT ERROR: Invalid constructor usage.');
    // });
    // it('throws on array input', () => {
    //   expect(() => new Duration([1, 2] as any)).toThrow('ARGUMENT ERROR: Invalid constructor usage.');
    // });
    // });  
});
