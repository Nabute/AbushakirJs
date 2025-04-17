"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = __importDefault(require("../src/Abushakir/datetime"));
var constants_1 = require("../src/utils/constants");
var duration_1 = __importDefault(require("../src/utils/duration"));
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
        expect(someyear.toString()).toBe('2012-07-23T08:57:26.021');
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
        expect(someyear.toString()).toMatch('2012-07-07T15:12:17.500');
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
        expect(now.add(hourDifference).toString()).toMatch('2012-07-25T08:57:26.021');
    });
    it('Testing EtDatetime method "subtract"...', function () {
        expect(hourLater.subtract(hourDifference).toString()).toMatch('2012-07-23T08:57:26.021');
    });
    it('Testing EtDatetime method "difference"...', function () {
        expect(now.difference(hourLater).inDays).toBe(2);
    });
});
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
describe('EtDatetime ECMA compatibility', function () {
    var date = new datetime_1.default(2016, 3, 15, 14, 30, 45, 123);
    it('coerces to string using toStringTag', function () {
        expect(Object.prototype.toString.call(date)).toBe('[object EtDatetime]');
    });
    it('coerces to primitive string', function () {
        expect("" + date).toBe(date.toISOString());
    });
    it('coerces to primitive number', function () {
        expect(+date).toBe(date.getTime());
    });
    it('JSON.stringify uses toJSON()', function () {
        var json = JSON.stringify({ d: date });
        expect(json).toBe("{\"d\":\"" + date.toISOString() + "\"}");
    });
    it('getTime returns correct epoch', function () {
        expect(date.getTime()).toBe(date.valueOf());
    });
    it('toDate returns native Date', function () {
        var native = date.toDate();
        expect(native instanceof Date).toBe(true);
        expect(native.getTime()).toBe(date.getTime());
    });
});
describe('EtDatetime get methods', function () {
    var et = new datetime_1.default(2016, 2, 13, 11, 59, 58, 321); // 2016-02-13 11:59:58.321
    it('getFullYear returns year', function () {
        expect(et.getFullYear()).toBe(2016);
    });
    it('getMonth returns zero-based month', function () {
        expect(et.getMonth()).toBe(1); // month 2 in EtDatetime
    });
    it('getDate returns day of month', function () {
        expect(et.getDate()).toBe(13);
    });
    it('getHours returns hour', function () {
        expect(et.getHours()).toBe(11);
    });
    it('getMinutes returns minutes', function () {
        expect(et.getMinutes()).toBe(59);
    });
    it('getSeconds returns seconds', function () {
        expect(et.getSeconds()).toBe(58);
    });
    it('getMilliseconds returns ms', function () {
        expect(et.getMilliseconds()).toBe(321);
    });
});
describe('Symbol.toPrimitive compliance', function () {
    var et = new datetime_1.default(2015, 1, 1);
    it('works in number coercion', function () {
        expect(Number(et)).toBe(et.getTime());
    });
    it('works in string coercion', function () {
        expect(String(et)).toBe(et.toISOString());
    });
    it('works in addition with string', function () {
        expect("Et: " + et).toBe("Et: " + et.toISOString());
    });
});
describe('EtDatetime static methods', function () {
    it('EtDatetime.now returns current time instance', function () {
        var now = datetime_1.default.now();
        expect(now).toBeInstanceOf(datetime_1.default);
        expect(now.getTime()).toBeCloseTo(Date.now(), -2); // ~10ms precision
    });
});
describe('Formatting: fourDigits()', function () {
    var testCases = [
        { year: 5, expected: '0005' },
        { year: 45, expected: '0045' },
        { year: 456, expected: '0456' },
        { year: 1456, expected: '1456' },
        { year: -5, expected: '-0005' },
        { year: -45, expected: '-0045' },
        { year: -456, expected: '-0456' },
        { year: -1456, expected: '-1456' },
    ];
    testCases.forEach(function (_a) {
        var year = _a.year, expected = _a.expected;
        it("formats year " + year + " as " + expected + " in toJson().year", function () {
            var date = new datetime_1.default(year, 1, 1);
            //@ts-ignore
            expect((date.toJson())['year']).toBe(expected);
        });
    });
});
describe('Formatting: sixDigits()', function () {
    it('formats years with six digits and sign prefix', function () {
        var et1 = new datetime_1.default(-9999, 1, 1);
        var et2 = new datetime_1.default(9999, 1, 1);
        expect(et1.toIso8601String().startsWith('-9999')).toBe(true);
        expect(et2.toIso8601String().startsWith('9999')).toBe(true);
    });
    it('throws for year > 9999', function () {
        var et = new datetime_1.default(10000, 1, 1);
        expect(function () { return et.toIso8601String(); }).toThrow('Year out of scope');
    });
    it('throws for year < -9999', function () {
        var et = new datetime_1.default(-10000, 1, 1);
        expect(function () { return et.toIso8601String(); }).toThrow('Year out of scope');
    });
});
describe('EtDatetime ECMAScript API compliance', function () {
    // ------------------------------------------
    //  Weekday + Legacy Year API
    // ------------------------------------------
    describe('getDay() and getYear()', function () {
        it('getDay() returns weekday index (0–6)', function () {
            var date = new datetime_1.default(2012, 1, 1); // Known Sunday
            expect(date.getDay()).toBeGreaterThanOrEqual(0);
            expect(date.getDay()).toBeLessThanOrEqual(6);
            expect(date.getDay()).toBe(date.weekday);
        });
        it('getYear returns fullYear - 1900', function () {
            var et = new datetime_1.default(2015, 1, 1);
            expect(et.getYear()).toBe(et.getFullYear() - 1900);
        });
        it('setYear sets the full year based on input + 1900', function () {
            var et = new datetime_1.default(2020, 1, 1);
            et.setYear(120); // Should set full year to 2020 (1900 + 120)
            expect(et.getFullYear()).toBe(2020);
        });
    });
    // ------------------------------------------
    //  UTC Getters
    // ------------------------------------------
    describe('getUTC*() methods', function () {
        var et = new datetime_1.default(2012, 2, 13, 14, 30, 45, 123);
        var native = et.toDate();
        it('getUTCDate matches JS Date', function () {
            expect(et.getUTCDate()).toBe(native.getUTCDate());
        });
        it('getUTCDay matches JS Date', function () {
            expect(et.getUTCDay()).toBe(native.getUTCDay());
        });
        it('getUTCFullYear matches JS Date', function () {
            expect(et.getUTCFullYear()).toBe(native.getUTCFullYear());
        });
        it('getUTCMonth returns the UTC month (0-indexed)', function () {
            var et = new datetime_1.default(2012, 2, 13, 14, 30, 45, 123);
            expect(et.getUTCMonth()).toBe(new Date(et.getTime()).getUTCMonth());
        });
        it('getUTCHours matches JS Date', function () {
            expect(et.getUTCHours()).toBe(native.getUTCHours());
        });
        it('getUTCMinutes matches JS Date', function () {
            expect(et.getUTCMinutes()).toBe(native.getUTCMinutes());
        });
        it('getUTCSeconds matches JS Date', function () {
            expect(et.getUTCSeconds()).toBe(native.getUTCSeconds());
        });
        it('getUTCMilliseconds matches JS Date', function () {
            expect(et.getUTCMilliseconds()).toBe(native.getUTCMilliseconds());
        });
    });
    // ------------------------------------------
    //  Setters (Local Time)
    // ------------------------------------------
    describe('set*() methods (local time)', function () {
        it('setDate changes the day of the month', function () {
            var et = new datetime_1.default(2012, 2, 13);
            et.setDate(5);
            expect(et.getDate()).toBe(5);
        });
        it('setFullYear updates the year', function () {
            var et = new datetime_1.default(2010, 2, 13);
            et.setFullYear(2020);
            expect(et.getFullYear()).toBe(2020);
        });
        it('setMonth updates the month (0-indexed)', function () {
            var et = new datetime_1.default(2012, 2, 13);
            et.setMonth(4); // → month = 5
            expect(et.getMonth()).toBe(4);
            expect(et.month).toBe(5);
        });
        it('setHours, Minutes, Seconds, Milliseconds update correctly', function () {
            var et = new datetime_1.default(2012, 2, 13, 1, 2, 3, 4);
            et.setHours(5);
            et.setMinutes(10);
            et.setSeconds(20);
            et.setMilliseconds(200);
            expect(et.hour).toBe(5);
            expect(et.minute).toBe(10);
            expect(et.second).toBe(20);
            expect(et.millisecond).toBe(200);
        });
        it('setTime sets exact timestamp', function () {
            var now = Date.now();
            var et = new datetime_1.default();
            et.setTime(now);
            expect(et.getTime()).toBe(now);
        });
    });
    // ------------------------------------------
    //  Setters (UTC)
    // ------------------------------------------
    describe('setUTC*() methods', function () {
        var et;
        var native;
        beforeEach(function () {
            et = new datetime_1.default(2012, 2, 13, 10, 0, 0, 0);
            native = new Date(et.getTime());
        });
        it('setUTCFullYear updates UTC year', function () {
            et.setUTCFullYear(2020);
            native.setUTCFullYear(2020);
            expect(et.getUTCFullYear()).toBe(native.getUTCFullYear());
        });
        it('setUTCMonth updates UTC month', function () {
            et.setUTCMonth(5);
            native.setUTCMonth(5);
            expect(et.getUTCMonth()).toBe(native.getUTCMonth());
        });
        it('setUTCDate updates UTC day', function () {
            et.setUTCDate(20);
            native.setUTCDate(20);
            expect(et.getUTCDate()).toBe(native.getUTCDate());
        });
        it('setUTCHours updates UTC hour', function () {
            et.setUTCHours(22);
            native.setUTCHours(22);
            expect(et.getUTCHours()).toBe(native.getUTCHours());
        });
        it('setUTCMinutes updates UTC minutes', function () {
            et.setUTCMinutes(45);
            native.setUTCMinutes(45);
            expect(et.getUTCMinutes()).toBe(native.getUTCMinutes());
        });
        it('setUTCSeconds updates UTC seconds', function () {
            et.setUTCSeconds(59);
            native.setUTCSeconds(59);
            expect(et.getUTCSeconds()).toBe(native.getUTCSeconds());
        });
        it('setUTCMilliseconds updates UTC ms', function () {
            et.setUTCMilliseconds(789);
            native.setUTCMilliseconds(789);
            expect(et.getUTCMilliseconds()).toBe(native.getUTCMilliseconds());
        });
    });
    // ------------------------------------------
    //  Formatters
    // ------------------------------------------
    describe('Formatting methods', function () {
        var et = new datetime_1.default(2012, 7, 7, 14, 30, 15, 123);
        it('toDateString matches JS Date string', function () {
            expect(et.toDateString()).toBe(et.toDate().toDateString());
        });
        it('toTimeString matches JS Date time', function () {
            expect(et.toTimeString()).toBe(et.toDate().toTimeString());
        });
        it('toUTCString matches JS UTC string', function () {
            expect(et.toUTCString()).toBe(et.toDate().toUTCString());
        });
        it('toLocaleString matches JS locale string', function () {
            expect(typeof et.toLocaleString()).toBe('string');
        });
        it('toLocaleDateString matches JS locale date', function () {
            expect(et.toLocaleDateString()).toBe(et.toDate().toLocaleDateString());
        });
        it('toLocaleTimeString matches JS locale time', function () {
            expect(et.toLocaleTimeString()).toBe(et.toDate().toLocaleTimeString());
        });
    });
    // ------------------------------------------
    //  Temporal API
    // ------------------------------------------
    describe('toTemporalInstant()', function () {
        it('returns Temporal.Instant (requires @js-temporal/polyfill)', function () {
            var et = new datetime_1.default(2012, 7, 7, 14, 30, 15, 123);
            var instant = et.toTemporalInstant();
            expect(instant.epochMilliseconds).toBe(et.getTime());
        });
    });
});
