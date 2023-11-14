"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const duration_1 = require("../utils/duration");
class EtDatetime {
    constructor(...args) {
        if (args.length >= 2) {
            this.fixed = this.fixedFromEthiopic(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
            this.moment = this.dateToEpoch(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]), this.toNumber(args[3]), this.toNumber(args[4]), this.toNumber(args[5]), this.toNumber(args[6]));
            if (this.fixed === null)
                throw new Error('ARGUMENT ERROR:unacceptable argument.');
        }
        if (args.length === 1) {
            const value = this.toNumber(args[0]);
            if (Math.abs(value) > 9999) {
                this.fromMillisecondsSinceEpoch(value);
            }
            else {
                this.fixed = this.fixedFromEthiopic(value, 1, 1);
                this.moment = this.dateToEpoch(value, 1, 1, 0, 0, 0, 0);
                if (this.fixed === null)
                    throw new Error('ARGUMENT ERROR:unacceptable argument.');
            }
        }
        if (args.length === 0) {
            this.fixed = this.fixedFromUnix(Date.now());
            this.moment = Date.now();
        }
    }
    fromMillisecondsSinceEpoch(millisecondsSinceEpoch) {
        this.moment = millisecondsSinceEpoch;
        this.fixed = this.fixedFromUnix(millisecondsSinceEpoch);
        if (this.fixed === null)
            throw new Error('ARGUMENT ERROR:unacceptable argument.');
        if (Math.abs(millisecondsSinceEpoch) > constants_1.constants.maxMillisecondsSinceEpoch ||
            Math.abs(millisecondsSinceEpoch) === constants_1.constants.maxMillisecondsSinceEpoch)
            throw new Error(`Calendar out side valid range ${constants_1.constants.maxMillisecondsSinceEpoch}`);
    }
    now() {
        this.fixed = this.fixedFromUnix(Date.now());
        this.moment = Date.now();
    }
    // parse(formattedString: string): EtDatetime{
    // }
    // Getters
    get year() {
        return Math.floor((4 * (this.fixed - constants_1.constants._ethiopicEpoch) + 1463) / 1461);
    }
    get month() {
        return Math.floor((this.fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1;
    }
    get monthGeez() {
        return constants_1.constants._months[(this.month - 1) % 13];
    }
    get day() {
        return this.fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
    }
    get dayGeez() {
        return constants_1.constants._dayNumbers[(this.day - 1) % 30];
    }
    get hour() {
        return Math.floor(this.moment / constants_1.constants.hourMilliSec) % 24;
    }
    get minute() {
        return Math.floor(this.moment / constants_1.constants.minMilliSec) % 60;
    }
    get second() {
        return Math.floor((this.moment / constants_1.constants.secMilliSec) % 60);
    }
    get millisecond() {
        return this.moment % 1000;
    }
    get isLeap() {
        return this.year % 4 === 3;
    }
    get yearFirstDay() {
        return this._yearFirstDay();
    }
    get weekday() {
        return (this.yearFirstDay + (this.month - 1) * 2) % 7;
    }
    get date() {
        return { year: this.year, month: this.month, day: this.day };
    }
    get time() {
        return { h: this.hour, m: this.minute, s: this.second };
    }
    // Methods
    toString() {
        const y = this.fourDigits(this.year);
        const m = this.twoDigits(this.month);
        const d = this.twoDigits(this.day);
        const h = this.twoDigits(this.hour);
        const min = this.twoDigits(this.minute);
        const sec = this.twoDigits(this.second);
        const ms = this.threeDigits(this.millisecond);
        return `${y}-${m}-${d} ${h}:${min}:${sec}.${ms}`;
    }
    toJson() {
        return {
            year: this.fourDigits(this.year),
            month: this.twoDigits(this.month),
            date: this.twoDigits(this.day),
            hour: this.twoDigits(this.hour),
            min: this.twoDigits(this.minute),
            sec: this.twoDigits(this.second),
            ms: this.threeDigits(this.millisecond),
        };
    }
    toIso8601String() {
        const y = this.year >= -9999 && this.year <= 9999 ? this.fourDigits(this.year) : this.sixDigits(this.year);
        const m = this.twoDigits(this.month);
        const d = this.twoDigits(this.day);
        const h = this.twoDigits(this.hour);
        const min = this.twoDigits(this.minute);
        const sec = this.twoDigits(this.second);
        const ms = this.threeDigits(this.millisecond);
        return `${y}-${m}-${d}T${h}:${min}:${sec}.${ms}`;
    }
    isBefore(other) {
        return this.fixed < other.fixed || this.moment < other.moment;
    }
    isAfter(other) {
        return this.fixed > other.fixed || this.moment > other.moment;
    }
    isAtSameMomentAs(other) {
        return this.fixed === other.fixed && this.moment === other.moment;
    }
    compareTo(other) {
        if (this.isBefore(other))
            return -1;
        else if (this.isAtSameMomentAs(other))
            return 0;
        else
            return 1;
    }
    add(duration) {
        return new EtDatetime(this.moment + duration.inMilliseconds);
    }
    subtract(duration) {
        return new EtDatetime(this.moment - duration.inMilliseconds);
    }
    difference(other) {
        return new duration_1.default(Math.abs(this.fixed - other.fixed), 0, 0, 0, 0, 0);
    }
    // Private methods
    fixedFromEthiopic(year, month, day) {
        return Math.floor(constants_1.constants._ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
    }
    fixedFromUnix(ms) {
        return constants_1.constants._unixEpoch + Math.floor(ms / 86400000);
    }
    dateToEpoch(year, month, date, hour, minute, second, millisecond) {
        console.log((this.fixedFromEthiopic(year, month, date) - constants_1.constants._unixEpoch) * constants_1.constants.dayMilliSec);
        console.log(hour * constants_1.constants.hourMilliSec);
        console.log(minute * constants_1.constants.minMilliSec);
        console.log(second * constants_1.constants.secMilliSec);
        console.log(millisecond);
        return ((this.fixedFromEthiopic(year, month, date) - constants_1.constants._unixEpoch) * constants_1.constants.dayMilliSec +
            hour ? hour * constants_1.constants.hourMilliSec : 0 +
            minute ? minute * constants_1.constants.minMilliSec : 0 +
            second ? second * constants_1.constants.secMilliSec : 0 +
            millisecond ? millisecond : 0);
    }
    _yearFirstDay() {
        const ameteAlem = constants_1.constants.ameteFida + this.year;
        const rabeet = Math.floor(ameteAlem / 4);
        return (ameteAlem + rabeet) % 7;
    }
    fourDigits(n) {
        const absN = Math.abs(n);
        const sign = n < 0 ? '-' : '';
        if (absN >= 1000)
            return `${n}`;
        if (absN >= 100)
            return `${sign}0${absN}`;
        if (absN >= 10)
            return `${sign}00${absN}`;
        return `${sign}000${absN}`;
    }
    sixDigits(n) {
        if (n < -9999 || n > 9999)
            throw new Error('Year out of scope');
        const absN = Math.abs(n);
        const sign = n < 0 ? '-' : '+';
        if (absN >= 100000)
            return `${sign}${absN}`;
        return `${sign}0${absN}`;
    }
    threeDigits(n) {
        if (n >= 100)
            return `${n}`;
        if (n >= 10)
            return `0${n}`;
        return `00${n}`;
    }
    twoDigits(n) {
        if (n >= 10)
            return `${n}`;
        return `0${n}`;
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
exports.default = EtDatetime;
