"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = __importDefault(require("../Abushakir/datetime"));
var constants_1 = require("../utils/constants");
/**
 * Ethiopian Calendar implementation.
 */
var ETC = /** @class */ (function () {
    /**
     * Creates an instance of the Ethiopian Calendar.
     * @param args - Year, month, and day values (up to 3 arguments).
     * @throws {Error} - If the number of arguments is not between 1 and 3.
     */
    function ETC() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 3) {
            this._date = new datetime_1.default(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
        }
        else if (args.length === 2) {
            this._date = new datetime_1.default(this.toNumber(args[0]), this.toNumber(args[1]), 1);
        }
        else if (args.length === 1) {
            this._date = new datetime_1.default(this.toNumber(args[0]), 1, 1);
        }
        else {
            throw new Error("ARGUMENT ERROR: Expected up to 3 arguments, " + args.length + " given.");
        }
    }
    Object.defineProperty(ETC.prototype, "year", {
        /**
         * Gets the year of the Ethiopian Calendar.
         */
        get: function () {
            return this._date.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "month", {
        /**
         * Gets the month of the Ethiopian Calendar.
         */
        get: function () {
            return this._date.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "day", {
        /**
         * Gets the day of the Ethiopian Calendar.
         */
        get: function () {
            return this._date.day;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "monthName", {
        /**
         * Gets the month name in the Ethiopian Calendar.
         */
        get: function () {
            return this._date.monthGeez;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "allMonths", {
        /**
         * Gets an array of all months in the Ethiopian Calendar.
         */
        get: function () {
            return constants_1.constants._months;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "dayNumbers", {
        /**
         * Gets an array of day numbers in the Ethiopian Calendar.
         */
        get: function () {
            return constants_1.constants._dayNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "weekdays", {
        /**
         * Gets an array of weekday names in the Ethiopian Calendar.
         */
        get: function () {
            return constants_1.constants._weekdays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "nextMonth", {
        /**
         * Gets the next month in the Ethiopian Calendar.
         */
        get: function () {
            return new ETC(this._date.year, this._date.month + 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "prevMonth", {
        /**
         * Gets the previous month in the Ethiopian Calendar.
         */
        get: function () {
            var newYear = this._date.month === 1 ? this._date.year - 1 : this._date.year;
            var newMonth = this._date.month - 1 === 0 ? 13 : this._date.month - 1;
            return new ETC(newYear, newMonth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "nextYear", {
        /**
         * Gets the next year in the Ethiopian Calendar.
         */
        get: function () {
            return new ETC(this._date.year + 1, this._date.month);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "prevYear", {
        /**
         * Gets the previous year in the Ethiopian Calendar.
         */
        get: function () {
            return new ETC(this._date.year - 1, this._date.month);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets an array of days in the current month.
     * @param geezDay - If true, includes the Geez day numbers.
     * @param weekDayName - If true, includes the weekday names.
     * @returns An array of days in the current month.
     */
    ETC.prototype.monthDays = function (geezDay, weekDayName) {
        if (geezDay === void 0) { geezDay = false; }
        if (weekDayName === void 0) { weekDayName = false; }
        var monthBeginning = this._monthRange()[0];
        var daysInMonth = this._monthRange()[1];
        var result = [];
        for (var i = 0; i < daysInMonth; i++) {
            var day = geezDay ? constants_1.constants._dayNumbers[i] : i + 1;
            var entry = [
                this._date.year,
                this._date.month,
                day,
                weekDayName ? constants_1.constants._weekdays[monthBeginning] : monthBeginning,
            ];
            result.push(entry);
            monthBeginning = (monthBeginning + 1) % 7;
        }
        return result;
    };
    /**
     * Gets an array of days in the entire year.
     * @param geezDay - If true, includes the Geez day numbers.
     * @param weekDayName - If true, includes the weekday names.
     * @returns An array of days in the entire year.
     */
    ETC.prototype.yearDays = function (geezDay, weekDayName) {
        if (geezDay === void 0) { geezDay = false; }
        if (weekDayName === void 0) { weekDayName = false; }
        var result = [];
        for (var i = 0; i < constants_1.constants._months.length; i++) {
            result.push(this._monthDays(this._date.year, i + 1, geezDay, weekDayName));
        }
        return result;
    };
    /**
     * Sets the date to the current system date.
     */
    ETC.prototype.today = function () {
        this._date = new datetime_1.default(Date.now());
    };
    ETC.prototype._monthRange = function () {
        if (this._date.month < 1 || this._date.month > 13) {
            throw new Error('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
        }
        return [this._date.weekday, this._date.month === 13 ? (this._date.isLeap ? 6 : 5) : 30];
    };
    ETC.prototype._monthDays = function (year, month, geezDay, weekDayName) {
        var yr = new datetime_1.default(year, month);
        var monthBeginning = yr.weekday;
        var daysInMonth = yr.month === 13 ? (yr.isLeap ? 6 : 5) : 30;
        var result = [];
        for (var i = 0; i < daysInMonth; i++) {
            var day = geezDay ? constants_1.constants._dayNumbers[i] : i + 1;
            var entry = [year, month, day, weekDayName ? constants_1.constants._weekdays[monthBeginning] : monthBeginning];
            result.push(entry);
            monthBeginning = (monthBeginning + 1) % 7;
        }
        return result;
    };
    ETC.prototype.toNumber = function (value) {
        if (value === undefined)
            return NaN;
        if (value === null)
            return 0;
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        if (typeof value === 'string') {
            return parseInt(value, 10);
        }
        if (typeof value === 'symbol') {
            throw new Error('TYPE ERROR: Unexpected operand type.');
        }
        if (typeof value === 'object') {
            throw new Error('TYPE ERROR: Unexpected operand type.');
        }
        return value;
    };
    return ETC;
}());
exports.default = ETC;
