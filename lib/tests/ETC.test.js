"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = require("../src/Abushakir/datetime");
var etc_1 = require("../src/Abushakir/etc");
var constants_1 = require("../src/utils/constants");
describe('Testing Ethiopian Calendar for "ጷጉሜን" month...', function () {
    var someYear = new etc_1.default(2011, 13, 6);
    it('Testing Year', function () {
        expect(someYear.year).toBe(2011);
    });
    it('Testing Month...', function () {
        expect(someYear.month).toBe(13);
    });
    it('Testing Day...', function () {
        expect(someYear.day).toBe(6);
    });
    it('Testing Month Name...', function () {
        expect(someYear.monthName).toBe('ጷጉሜን');
    });
    it('Testing All Months...', function () {
        expect(someYear.allMonths).toEqual(constants_1.constants._months);
    });
    it('Testing Day Numbers...', function () {
        expect(someYear.dayNumbers).toEqual(constants_1.constants._dayNumbers);
    });
    it('Testing Weekdays...', function () {
        expect(someYear.weekdays).toEqual(constants_1.constants._weekdays);
    });
});
describe('ETC class', function () {
    var etc;
    beforeEach(function () {
        // Initialize a new instance of ETC before each test
        etc = new etc_1.default(2023, 11, 14);
    });
    it('Constructor with 3 arguments', function () {
        expect(etc.year).toBe(2023);
        expect(etc.month).toBe(11);
        expect(etc.day).toBe(14);
    });
    it('Constructor with 2 arguments', function () {
        etc = new etc_1.default(2023, 11);
        expect(etc.year).toBe(2023);
        expect(etc.month).toBe(11);
        expect(etc.day).toBe(1); // Defaults to the first day of the month
    });
    it('Constructor with 1 argument', function () {
        etc = new etc_1.default(2023);
        expect(etc.year).toBe(2023);
        expect(etc.month).toBe(1); // Defaults to January
        expect(etc.day).toBe(1); // Defaults to the first day of the month
    });
    it('Constructor with invalid number of arguments', function () {
        expect(function () { return new etc_1.default(); }).toThrowError('ARGUMENT ERROR: Expected up to 3 arguments, 0 given.');
        expect(function () { return new etc_1.default(2023, 11, 14, 5); }).toThrowError('ARGUMENT ERROR: Expected up to 3 arguments, 4 given.');
    });
    it('Getters', function () {
        expect(etc.year).toBe(2023);
        expect(etc.month).toBe(11);
        expect(etc.day).toBe(14);
        expect(etc.monthName).toBe('ኃምሌ');
        expect(etc.allMonths).toEqual(['መስከረም',
            'ጥቅምት',
            'ኅዳር',
            'ታኅሳስ',
            'ጥር',
            'የካቲት',
            'መጋቢት',
            'ሚያዝያ',
            'ግንቦት',
            'ሰኔ',
            'ኃምሌ',
            'ነሐሴ',
            'ጷጉሜን',]);
        expect(etc.dayNumbers).toEqual(['፩',
            '፪',
            '፫',
            '፬',
            '፭',
            '፮',
            '፯',
            '፰',
            '፱',
            '፲',
            '፲፩',
            '፲፪',
            '፲፫',
            '፲፬',
            '፲፭',
            '፲፮',
            '፲፯',
            '፲፰',
            '፲፱',
            '፳',
            '፳፩',
            '፳፪',
            '፳፫',
            '፳፬',
            '፳፭',
            '፳፮',
            '፳፯',
            '፳፰',
            '፳፱',
            '፴',]);
        expect(etc.weekdays).toEqual(['ሰኞ', 'ማግሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ']);
    });
    it('Next and Previous methods', function () {
        var nextMonth = etc.nextMonth;
        expect(nextMonth.year).toBe(2023);
        expect(nextMonth.month).toBe(12);
        var prevMonth = etc.prevMonth;
        expect(prevMonth.year).toBe(2023);
        expect(prevMonth.month).toBe(10);
        var nextYear = etc.nextYear;
        expect(nextYear.year).toBe(2024);
        expect(nextYear.month).toBe(11);
        var prevYear = etc.prevYear;
        expect(prevYear.year).toBe(2022);
        expect(prevYear.month).toBe(11);
    });
    // Add more test cases for other methods and edge cases
    it('Today method', function () {
        var originalDate = etc;
        etc.today();
        var currentDate = new datetime_1.default(Date.now());
        // Since we can't predict the exact current date, we'll check if the year, month, and day have changed
        expect(etc.year).toBe(currentDate.year);
        expect(etc.month).toBe(currentDate.month);
        expect(etc.day).toBe(currentDate.day);
    });
});
describe('Testing the `monthDays` method', function () {
    var etc;
    beforeEach(function () {
        // Initialize a new instance of ETC before each test
        etc = new etc_1.default(2023, 11, 14);
    });
    it('monthDays method without optional parameters', function () {
        var days = etc.monthDays();
        // Check if the number of days is correct for the given month
        expect(days.length).toBe(30); // Adjust based on your specific month length
        // Check the structure of the result array for the first day
        var firstDay = days[0];
        expect(firstDay).toEqual([2023, 11, 1, 1]); // Adjust based on your specific month and weekday names
    });
    it('monthDays method with geezDay=true and weekDayName=true', function () {
        var days = etc.monthDays(true, true);
        // Check if the number of days is correct for the given month
        expect(days.length).toBe(30); // Adjust based on your specific month length
        // Check the structure of the result array for the first day
        var firstDay = days[0];
        expect(firstDay).toEqual([2023, 11, "፩", 'ማግሰኞ']); // Adjust based on your specific month and weekday names
    });
    // Add more test cases as needed, covering different combinations of optional parameters
    // Test with a different month to ensure monthBeginning is correctly calculated
    it('monthDays method for a different month', function () {
        etc = new etc_1.default(2023, 5, 14); // May, for example
        var days = etc.monthDays();
        // Check if the number of days is correct for the given month
        expect(days.length).toBe(30); // Adjust based on your specific month length
        // Check the structure of the result array for the first day
        var firstDay = days[0];
        expect(firstDay).toEqual([2023, 5, 1, 3]); // Adjust based on your specific month and weekday names
    });
    // Add more test cases as needed
});
describe('Testing the `yearDays` method', function () {
    var etc;
    beforeEach(function () {
        // Initialize a new instance of ETC before each test
        etc = new etc_1.default(2011, 11, 14);
    });
    it('yearDays method returns an array of days for the entire year', function () {
        var yearDays = etc.yearDays();
        // Check that the result is an array with 13 months
        expect(yearDays).toHaveLength(13);
        // Check the structure of the result for each month
        yearDays.forEach(function (monthDays, index) {
            var expectedMonth = index + 1;
            // const expectedDaysInMonth = etc["_monthRange"]()[1];
            // const expectedFirstDayOfWeek = etc["_monthRange"]()[0];
            // Check the structure of each day in the month
            monthDays.forEach(function (day) {
                var year = day[0], month = day[1], dayOfMonth = day[2], dayOfWeek = day[3];
                // Check the year and month are correct
                expect(year).toBe(2011);
                expect(month).toBe(expectedMonth);
                // Check the day of the month is within the valid range
                expect(dayOfMonth).toBeGreaterThanOrEqual(1);
                // expect(dayOfMonth).toBeLessThanOrEqual(expectedDaysInMonth);
                // Check the day of the week is within the valid range
                expect(dayOfWeek).toBeGreaterThanOrEqual(0);
                expect(dayOfWeek).toBeLessThan(7);
                // expect(dayOfWeek).toBe(((expectedFirstDayOfWeek + dayOfMonth) - 1) % 7);
            });
        });
    });
});
// describe('Testing the `toNumber` method', () => {
//   it('Converts various input types to numbers', () => {
//     const etc = new ETC(2011, 11, 14);
//     // Undefined should return NaN
//     expect(etc['toNumber'](undefined)).toBeNaN();
//     // Null should return 0
//     expect(etc['toNumber'](null)).toBe(0);
//     // Boolean true should return 1
//     expect(etc['toNumber'](true)).toBe(1);
//     // Boolean false should return 0
//     expect(etc['toNumber'](false)).toBe(0);
//     // String '123' should return 123
//     expect(etc['toNumber']('123')).toBe(123);
//     // String 'abc' should return NaN
//     expect(etc['toNumber']('abc')).toBeNaN();
//     // Symbol should throw an error
//     expect(() => etc['toNumber'](Symbol('test'))).toThrowError('TYPE ERROR: Unexpected operand type.');
//     // Object should throw an error
//     expect(() => etc['toNumber']({})).toThrowError('TYPE ERROR: Unexpected operand type.');
//     // Other number types should be returned as is
//     expect(etc['toNumber'](42)).toBe(42);
//     expect(etc['toNumber'](3.14)).toBe(3.14);
//   });
// });
// describe('Testing the `_monthRange` method', () => {
//   let etc: ETC;
//   beforeEach(() => {
//     etc = new ETC(2023, 11, 14); 
//   });
//   it('Valid month range', () => {
//     const monthRange = etc['_monthRange']();
//     expect(monthRange).toEqual([1, 30]);
//   });
//   it.skip('Invalid month number', () => {
//     etc = new ETC(2011, 15, 14);
//     expect(() => etc['_monthRange']()).toThrowError('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
//   });
// });
