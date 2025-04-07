"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bh_1 = __importDefault(require("../src/Abushakir/bh"));
describe('Bahire Hasab Tests', function () {
    var year = 2011;
    var bahireHasab = new bh_1.default(year);
    describe('Abekte', function () {
        it('should return correct Abekte value', function () {
            expect(bahireHasab.abekte).toBe(25);
        });
    });
    describe('Metkih', function () {
        it('should return correct Metkih value', function () {
            expect(bahireHasab.metkih).toBe(5);
        });
    });
    describe('Nenewe', function () {
        it('should return correct Nenewe value', function () {
            expect(bahireHasab.nenewe).toEqual({ month: 'የካቲት', date: 11 });
        });
    });
    describe('getSingleBealOrTsom', function () {
        var testCases = [
            { name: 'ነነዌ', expected: { month: 'የካቲት', date: 11 } },
            { name: 'ዓቢይ ጾም', expected: { month: 'የካቲት', date: 25 } },
            { name: 'ደብረ ዘይት', expected: { month: 'መጋቢት', date: 22 } },
            { name: 'ሆሣዕና', expected: { month: 'ሚያዝያ', date: 13 } },
            { name: 'ስቅለት', expected: { month: 'ሚያዝያ', date: 18 } },
            { name: 'ትንሳኤ', expected: { month: 'ሚያዝያ', date: 20 } },
            { name: 'ርክበ ካህናት', expected: { month: 'ግንቦት', date: 14 } },
            { name: 'ዕርገት', expected: { month: 'ግንቦት', date: 29 } },
            { name: 'ጰራቅሊጦስ', expected: { month: 'ሰኔ', date: 9 } },
            { name: 'ጾመ ሐዋርያት', expected: { month: 'ሰኔ', date: 10 } },
            { name: 'ጾመ ድህነት', expected: { month: 'ሰኔ', date: 12 } },
        ];
        testCases.forEach(function (testCase) {
            it("should return correct value for \"" + testCase.name + "\"", function () {
                expect(bahireHasab.getSingleBealOrTsom(testCase.name)).toEqual(testCase.expected);
            });
        });
    });
    describe('getEvangelist', function () {
        it('should return the correct evangelist name when returnName is true', function () {
            expect(bahireHasab.getEvangelist(true)).toBe('ሉቃስ');
        });
        it('should return the correct evangelist number when returnName is false', function () {
            expect(bahireHasab.getEvangelist(false)).toBe(3);
        });
    });
    describe('allAtswamat', function () {
        it('should return the correct array of Atswamat information', function () {
            var expectedAtswamatInfo = [
                { beal: 'ነነዌ', day: { month: 'የካቲት', date: 11 } },
                { beal: 'ዓቢይ ጾም', day: { month: 'የካቲት', date: 25 } },
                { beal: 'ደብረ ዘይት', day: { month: 'መጋቢት', date: 22 } },
                { beal: 'ሆሣዕና', day: { month: 'ሚያዝያ', date: 13 } },
                { beal: 'ስቅለት', day: { month: 'ሚያዝያ', date: 18 } },
                { beal: 'ትንሳኤ', day: { month: 'ሚያዝያ', date: 20 } },
                { beal: 'ርክበ ካህናት', day: { month: 'ግንቦት', date: 14 } },
                { beal: 'ዕርገት', day: { month: 'ግንቦት', date: 29 } },
                { beal: 'ጰራቅሊጦስ', day: { month: 'ሰኔ', date: 9 } },
                { beal: 'ጾመ ሐዋርያት', day: { month: 'ሰኔ', date: 10 } },
                { beal: 'ጾመ ድህነት', day: { month: 'ሰኔ', date: 12 } },
            ];
            expect(bahireHasab.allAtswamat).toEqual(expectedAtswamatInfo);
        });
    });
    describe('isMovableHoliday', function () {
        it('should throw an error for an invalid holiday', function () {
            expect(function () { return bahireHasab.isMovableHoliday('InvalidHoliday'); }).toThrowError("FEASTNAME ERROR: Holiday or Feast is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'");
        });
    });
});
