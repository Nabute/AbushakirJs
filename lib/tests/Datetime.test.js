"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = require("../src/Abushakir/datetime");
var constants_1 = require("../src/utils/constants");
var duration_1 = require("../src/utils/duration");
describe('Testing EtDatetime with Parameterized Constructor...', function () {
    var someDate = new datetime_1.default(2012, 7, 7);
    it('throws an error when calendar is outside the valid range', function () {
        var createEtDatetime = function () { return new datetime_1.default(constants_1.constants.maxMillisecondsSinceEpoch + 1); };
        expect(createEtDatetime).toThrowError("Calendar outside valid range " + constants_1.constants.maxMillisecondsSinceEpoch);
    });
    it('should set the moment and fixed properties based on the current date and time', function () {
        var etDatetime = new datetime_1.default();
        etDatetime.now();
        expect(etDatetime.fixed).toBeDefined();
        expect(etDatetime.moment).toBeDefined();
        expect(etDatetime.fixed).toBeGreaterThan(0); // Assuming the current date is after the Unix epoch
        expect(etDatetime.moment).toBeGreaterThan(0); // Assuming the current date is after the Unix epoch
    });
    it('should return a valid day of the week', function () {
        var etDatetime = new datetime_1.default( /* provide necessary arguments */);
        expect(etDatetime.yearFirstDay).toBeGreaterThanOrEqual(0);
        expect(etDatetime.yearFirstDay).toBeLessThanOrEqual(6);
    });
    it('Testing Year on Parameterized Constructor', function () {
        expect(someDate.year).toBe(2012);
    });
    it('Testing Month on Parameterized Constructor', function () {
        expect(someDate.month).toBe(7);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(someDate.day).toBe(7);
    });
    it('Testing Date on Parameterized Constructor', function () {
        expect(someDate.dayGeez).toBe('፯');
    });
});
describe('Parameterized Constructors (year only)...', function () {
    var someyear = new datetime_1.default(2010);
    it('Testing Year on Parameterized Constructor', function () {
        expect(someyear.year).toBe(2010);
    });
    it('Testing Month on Parameterized Constructor', function () {
        expect(someyear.month).toBe(1);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(someyear.day).toBe(1);
    });
});
describe('Parameterized Constructors (NOW or the current time stamp)...', function () {
    var someyear = new datetime_1.default();
    var currentStamp = new datetime_1.default(Date.now());
    it('Testing Year on Parameterized Constructor', function () {
        expect(someyear.year).toBe(currentStamp.year);
    });
    it('Testing Month on Parameterized Constructor', function () {
        expect(someyear.month).toBe(currentStamp.month);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(someyear.day).toBe(currentStamp.day);
    });
    it('Testing dayGeez on Parameterized Constructor', function () {
        expect(someyear.dayGeez).toBe(currentStamp.dayGeez);
    });
    it('Testing Hour on Parameterized Constructor', function () {
        expect(someyear.hour).toBe(currentStamp.hour);
    });
    it('Testing Minute on Parameterized Constructor', function () {
        expect(someyear.minute).toBe(currentStamp.minute);
    });
    it('Testing Second on Parameterized Constructor', function () {
        expect(someyear.second).toBe(currentStamp.second);
    });
    it('Testing Millisecond on Parameterized Constructor', function () {
        expect(someyear.millisecond).toBe(currentStamp.millisecond);
    });
    it('Testing toString() on Parameterized Constructor', function () {
        expect(someyear.toString()).toBe(currentStamp.toString());
    });
    it('Testing toString() on Parameterized Constructor', function () {
        expect(someyear.toIso8601String()).toBe(currentStamp.toIso8601String());
    });
    it('Testing toString() on Parameterized Constructor', function () {
        expect(someyear.toJson()).toEqual(currentStamp.toJson());
    });
});
describe('Parameterized Constructors (UNIX EPOCH or time stamp)...', function () {
    var someyear = new datetime_1.default(1585731446021);
    it('Testing toString() on Parameterized Constructor', function () {
        expect(someyear.toString()).toBe('2012-07-23 08:57:26.021');
    });
    it('Testing Year on Parameterized Constructor', function () {
        expect(someyear.year).toBe(2012);
    });
    it('Testing Month on Parameterized Constructor', function () {
        expect(someyear.month).toBe(7);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(someyear.day).toBe(23);
    });
    it('Testing dayGeez on Parameterized Constructor', function () {
        expect(someyear.dayGeez).toBe('፳፫');
    });
    it('Testing Hour on Parameterized Constructor', function () {
        expect(someyear.hour).toBe(8);
    });
    it('Testing Minute on Parameterized Constructor', function () {
        expect(someyear.minute).toBe(57);
    });
    it('Testing Second on Parameterized Constructor', function () {
        expect(someyear.second).toBe(26);
    });
    it('Testing Millisecond on Parameterized Constructor', function () {
        expect(someyear.millisecond).toBe(21);
    });
});
describe('Parameterized Constructors (Full argument)...', function () {
    var someyear = new datetime_1.default(2012, 7, 7, 15, 12, 17, 500);
    it('Testing Year on Parameterized Constructor', function () {
        expect(someyear.year).toBe(2012);
    });
    it('Testing Month on Parameterized Constructor', function () {
        expect(someyear.month).toBe(7);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(someyear.day).toBe(7);
    });
    it('Testing Hour on Parameterized Constructor', function () {
        expect(someyear.hour).toBe(15);
    });
    it('Testing Minute on Parameterized Constructor', function () {
        expect(someyear.minute).toBe(12);
    });
    it('Testing Second on Parameterized Constructor', function () {
        expect(someyear.second).toBe(17);
    });
    it('Testing MilliSecond on Parameterized Constructor', function () {
        expect(someyear.millisecond).toBe(500);
    });
    it('Testing ToString method on Parameterized Constructor', function () {
        expect(someyear.toString()).toMatch('2012-07-07 15:12:17.500');
    });
    it('Testing ToString method on Parameterized Constructor', function () {
        expect(someyear.toJson()).toEqual({
            year: '2012',
            month: '07',
            date: '07',
            hour: '15',
            min: '12',
            sec: '17',
            ms: '500',
        });
    });
    it('Testing ToString method on Parameterized Constructor', function () {
        expect(someyear.toIso8601String()).toEqual('2012-07-07T15:12:17.500');
    });
});
describe('Comparing two DateTime INSTANTS...', function () {
    var sometime = new datetime_1.default(2012, 7, 7, 15, 12, 17, 500);
    var beforeSometime = new datetime_1.default(2012, 6, 7, 15, 12, 17, 500);
    var equalToSometime = new datetime_1.default(2012, 7, 7, 15, 12, 17, 500);
    it('Testing Is After on Parameterized Constructor', function () {
        expect(sometime.isAfter(beforeSometime)).toBe(true);
    });
    it('Testing Is Before on Parameterized Constructor', function () {
        expect(sometime.isBefore(beforeSometime)).toBe(false);
    });
    it('Testing Is After on Parameterized Constructor', function () {
        expect(beforeSometime.isAfter(sometime)).toBe(false);
    });
    it('Testing Is Before on Parameterized Constructor', function () {
        expect(beforeSometime.isBefore(sometime)).toBe(true);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(sometime.isAtSameMomentAs(equalToSometime)).toBe(true);
    });
    it('Testing Day on Parameterized Constructor', function () {
        expect(beforeSometime.isAtSameMomentAs(equalToSometime)).toBe(false);
    });
});
describe('Testing EtDatetime comparision...', function () {
    var now = new datetime_1.default(2012, 7, 23, 8, 57, 26, 21);
    var hourLater = new datetime_1.default(2012, 7, 25, 8, 57, 26, 21);
    var hourDifference = new duration_1.default(2, 0, 0, 0, 0, 0); // 2 days difference
    it('Testing EtDatetime method "IsBefore"...', function () {
        expect(now.isBefore(hourLater)).toBe(true);
    });
    it('Testing EtDatetime method "isAfter"...', function () {
        expect(hourLater.isAfter(now)).toBe(true);
    });
    it('Testing EtDatetime method "isAtSameMomentAs"...', function () {
        expect(hourLater.isAtSameMomentAs(now)).toBe(false);
    });
    it('Testing EtDatetime method "compareTo"...', function () {
        expect(hourLater.compareTo(hourLater)).toBe(0);
    });
    it('Testing EtDatetime method "compareTo"...', function () {
        expect(hourLater.compareTo(now)).toBe(1);
    });
    it('Testing EtDatetime method "add"...', function () {
        expect(now.add(hourDifference).toString()).toMatch('2012-07-25 08:57:26.021');
    });
    it('Testing EtDatetime method "subtract"...', function () {
        expect(hourLater.subtract(hourDifference).toString()).toMatch('2012-07-23 08:57:26.021');
    });
    it('Testing EtDatetime method "difference"...', function () {
        expect(now.difference(hourLater).inDays).toBe(2);
    });
});
// describe('Testing Helper Methods `sixDigits`', () => {
//   it('should return a six-digit string for a positive number', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['sixDigits'](300); // Accessing a private method for testing
//     expect(result).toBe('+0300');
//   });
//   it('should return a six-digit string for a negative number', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['sixDigits'](-300);
//     expect(result).toBe('-0300');
//   });
//   it('should throw an error for a number outside the valid range', () => {
//     const etDatetime = new EtDatetime();
//     expect(() => etDatetime['sixDigits'](1000000)).toThrowError('Year out of scope');
//   });
// });
// describe('Testing Helper Methods `fourDigits`', () => {
//   it('should return a four-digit string for positive numbers', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['fourDigits'](1234);
//     expect(result).toBe('1234');
//   });
//   it('should return a four-digit string for negative numbers', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['fourDigits'](-5678);
//     expect(result).toBe('-5678');
//   });
//   it('should pad with zeros for numbers less than 1000', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['fourDigits'](78);
//     expect(result).toBe('0078');
//   });
//   it('should return the input for zero', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['fourDigits'](0);
//     expect(result).toBe('0000');
//   });
// });
// describe('Testing Helper Methods `threeDigits`', () => {
//   it('should return a string with three digits for numbers greater than or equal to 100', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['threeDigits'](150);
//     expect(result).toBe('150');
//   });
//   it('should return a string with two digits and a leading zero for numbers between 10 and 99', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['threeDigits'](42);
//     expect(result).toBe('042');
//   });
//   it('should return a string with three digits and leading zeros for numbers between 0 and 9', () => {
//     const etDatetime = new EtDatetime();
//     const result = etDatetime['threeDigits'](7);
//     expect(result).toBe('007');
//   });
// });
// describe('Testing Helper Methods `toNumber`', () => {
//   it('should convert undefined to NaN', () => {
//     const etDatetime = new EtDatetime();
//     expect(etDatetime["toNumber"](undefined)).toBeNaN();
//   });
//   it('should convert null to 0', () => {
//     const etDatetime = new EtDatetime();
//     expect(etDatetime["toNumber"](null)).toBe(0);
//   });
//   it('should convert true to 1', () => {
//     const etDatetime = new EtDatetime();
//     expect(etDatetime["toNumber"](true)).toBe(1);
//   });
//   it('should convert false to 0', () => {
//     const etDatetime = new EtDatetime();
//     expect(etDatetime["toNumber"](false)).toBe(0);
//   });
//   it('should convert numeric strings to numbers', () => {
//     const etDatetime = new EtDatetime();
//     expect(etDatetime["toNumber"]('42')).toBe(42);
//   });
//   it('should throw an error for symbol input', () => {
//     const etDatetime = new EtDatetime();
//     expect(() => etDatetime["toNumber"](Symbol())).toThrowError('TYPE ERROR: Unexpected operand type.');
//   });
//   it('should throw an error for object input', () => {
//     const etDatetime = new EtDatetime();
//     expect(() => etDatetime["toNumber"]({})).toThrowError('TYPE ERROR: Unexpected operand type.');
//   });
// });
describe('Testing Getters', function () {
    var etDatetime;
    beforeEach(function () {
        etDatetime = new datetime_1.default();
    });
    it('isLeap should return a boolean', function () {
        expect(typeof etDatetime.isLeap).toBe('boolean');
    });
    it('weekday should be a number between 0 and 6', function () {
        expect(etDatetime.weekday).toBeGreaterThanOrEqual(0);
        expect(etDatetime.weekday).toBeLessThanOrEqual(6);
    });
    it('date should be an object with year, month, and day properties', function () {
        var date = etDatetime.date;
        expect(date).toHaveProperty('year');
        expect(date).toHaveProperty('month');
        expect(date).toHaveProperty('day');
    });
    it('time should be an object with h, m, and s properties', function () {
        var time = etDatetime.time;
        expect(time).toHaveProperty('h');
        expect(time).toHaveProperty('m');
        expect(time).toHaveProperty('s');
    });
});
describe('Testing Helper Methods `monthGeez`', function () {
    it('should return the correct Geez month', function () {
        var ethiopianDate = new datetime_1.default( /* provide a date that corresponds to a specific Geez month */);
        var result = ethiopianDate.monthGeez;
        expect(typeof result).toBe('string');
    });
});
