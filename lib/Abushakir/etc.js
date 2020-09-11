"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
const datetime_1 = require("../Abushakir/datetime");
const constants_1 = require("../utils/constants");
class ETC {
    constructor(...args) {
        if (args.length === 3) {
            this._date = new datetime_1.default(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
        }
        else if (args.length === 2) {
            this._date = new datetime_1.default(this.toNumber(args[0]), this.toNumber(args[1]), 1);
        }
        else if (args.length === 1) {
            this._date = new datetime_1.default(this.toNumber(args[0]), 1, 1);
        }
        else
            throw new Error(`ARGUMENT ERROR: Expected upto 3 arguments, ${args.length} given.`);
    }
    get year() {
        return this._date.year;
    }
    get month() {
        return this._date.month;
    }
    get day() {
        return this._date.day;
    }
    get monthName() {
        return this._date.monthGeez;
    }
    get allMonths() {
        return constants_1.constants._months;
    }
    get dayNumbers() {
        return constants_1.constants._dayNumbers;
    }
    get weekdays() {
        return constants_1.constants._weekdays;
    }
    get nextMonth() {
        return new ETC(this._date.year, this._date.month + 1);
    }
    get prevMonth() {
        return new ETC(this._date.month === 1 ? this._date.year - 1 : this._date.year, this._date.month - 1 === 0 ? 13 : this._date.month - 1);
    }
    get nextYear() {
        return new ETC(this._date.year + 1, this._date.month);
    }
    get prevYear() {
        return new ETC(this._date.year - 1, this._date.month);
    }
    monthDays(geezDay = false, weekDayName = false) {
        let monthBeginning = this._monthRange()[0];
        const daysInMonth = this._monthRange()[1];
        const result = [];
        for (let i = 0; i < daysInMonth; i++) {
            if (geezDay) {
                result.push([
                    this._date.year,
                    this._date.month,
                    constants_1.constants._dayNumbers[i],
                    weekDayName ? constants_1.constants._weekdays[monthBeginning] : monthBeginning,
                ]);
            }
            else
                result.push([
                    this._date.year,
                    this._date.month,
                    i + 1,
                    weekDayName ? constants_1.constants._weekdays[monthBeginning] : monthBeginning,
                ]);
            monthBeginning = (monthBeginning + 1) % 7;
        }
        return result;
    }
    yearDays(geezDay = false, weekDayName = false) {
        const result = [];
        for (let i = 0; i < constants_1.constants._months.length; i++) {
            result.push(this._monthDays(this._date.year, i + 1, geezDay, weekDayName));
        }
        return result;
    }
    today() {
        this._date = new datetime_1.default(Date.now());
    }
    _monthRange() {
        if (this._date.month <= 1 && this._date.month >= 13)
            throw new Error('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
        return [this._date.weekday, this._date.month === 13 ? (this._date.isLeap ? 6 : 5) : 30];
    }
    _monthDays(year, month, geezDay, weekDayName) {
        const yr = new datetime_1.default(year, month);
        let monthBeginning = yr.weekday;
        const daysInMonth = yr.month === 13 ? (yr.isLeap ? 6 : 5) : 30;
        const result = [];
        for (let i = 0; i < daysInMonth; i++) {
            if (geezDay) {
                result.push([
                    year,
                    month,
                    constants_1.constants._dayNumbers[i],
                    weekDayName ? constants_1.constants._weekdays[monthBeginning] : monthBeginning,
                ]);
            }
            else
                result.push([year, month, i + 1, weekDayName ? constants_1.constants._weekdays[monthBeginning] : monthBeginning]);
            monthBeginning = (monthBeginning + 1) % 7;
        }
        return result;
    }
    toNumber(value) {
        if (value === undefined)
            return NaN;
        if (value === null)
            return 0;
        if (typeof value === 'boolean') {
            if (value)
                return 1;
            else
                return 0;
        }
        if (typeof value === 'string')
            return parseInt(value, 10);
        if (typeof value === 'symbol')
            throw new Error('TYPE ERROR: Unexpected operand type.');
        if (typeof value === 'object')
            throw new Error('TYPE ERROR: Unexpected operand type.');
        return value;
    }
}
exports.default = ETC;
