"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../utils/constants");
var duration_1 = require("../utils/duration");
var EtDatetime = /** @class */ (function () {
    function EtDatetime() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= 2) {
            this.fixed = this.fixedFromEthiopic(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
            this.moment = this.dateToEpoch(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]), this.toNumber(args[3]), this.toNumber(args[4]), this.toNumber(args[5]), this.toNumber(args[6]));
            if (this.fixed === null)
                throw new Error('ARGUMENT ERROR: Unacceptable argument.');
        }
        if (args.length === 1) {
            var value = this.toNumber(args[0]);
            if (Math.abs(value) > 9999) {
                this.fromMillisecondsSinceEpoch(value);
            }
            else {
                this.fixed = this.fixedFromEthiopic(value, 1, 1);
                this.moment = this.dateToEpoch(value, 1, 1, 0, 0, 0, 0);
                if (this.fixed === null)
                    throw new Error('ARGUMENT ERROR: Unacceptable argument.');
            }
        }
        if (args.length === 0) {
            this.fixed = this.fixedFromUnix(Date.now());
            this.moment = Date.now();
        }
        if (!this.fixed) {
            this.fixed = 0;
        }
    }
    EtDatetime.prototype.fromMillisecondsSinceEpoch = function (millisecondsSinceEpoch) {
        this.moment = millisecondsSinceEpoch;
        this.fixed = this.fixedFromUnix(millisecondsSinceEpoch);
        if (this.fixed === null)
            throw new Error('ARGUMENT ERROR: Unacceptable argument.');
        if (Math.abs(millisecondsSinceEpoch) > constants_1.constants.maxMillisecondsSinceEpoch ||
            Math.abs(millisecondsSinceEpoch) === constants_1.constants.maxMillisecondsSinceEpoch)
            throw new Error("Calendar outside valid range " + constants_1.constants.maxMillisecondsSinceEpoch);
    };
    EtDatetime.prototype.now = function () {
        this.fixed = this.fixedFromUnix(Date.now());
        this.moment = Date.now();
    };
    Object.defineProperty(EtDatetime.prototype, "year", {
        get: function () {
            return Math.floor((4 * (this.fixed - constants_1.constants._ethiopicEpoch) + 1463) / 1461);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "month", {
        get: function () {
            return Math.floor((this.fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "monthGeez", {
        get: function () {
            return constants_1.constants._months[(this.month - 1) % 13];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "day", {
        get: function () {
            return this.fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "dayGeez", {
        get: function () {
            return constants_1.constants._dayNumbers[(this.day - 1) % 30];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "hour", {
        get: function () {
            return Math.floor(this.moment / constants_1.constants.hourMilliSec) % 24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "minute", {
        get: function () {
            return Math.floor(this.moment / constants_1.constants.minMilliSec) % 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "second", {
        get: function () {
            return Math.floor((this.moment / constants_1.constants.secMilliSec) % 60);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "millisecond", {
        get: function () {
            return this.moment % 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "isLeap", {
        get: function () {
            return this.year % 4 === 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "yearFirstDay", {
        get: function () {
            return this._yearFirstDay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "weekday", {
        get: function () {
            return (this.yearFirstDay + (this.month - 1) * 2) % 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "date", {
        get: function () {
            return { year: this.year, month: this.month, day: this.day };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "time", {
        get: function () {
            return { h: this.hour, m: this.minute, s: this.second };
        },
        enumerable: true,
        configurable: true
    });
    EtDatetime.prototype.toString = function () {
        var y = this.fourDigits(this.year);
        var m = this.twoDigits(this.month);
        var d = this.twoDigits(this.day);
        var h = this.twoDigits(this.hour);
        var min = this.twoDigits(this.minute);
        var sec = this.twoDigits(this.second);
        var ms = this.threeDigits(this.millisecond);
        return y + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms;
    };
    EtDatetime.prototype.toJson = function () {
        return {
            year: this.fourDigits(this.year),
            month: this.twoDigits(this.month),
            date: this.twoDigits(this.day),
            hour: this.twoDigits(this.hour),
            min: this.twoDigits(this.minute),
            sec: this.twoDigits(this.second),
            ms: this.threeDigits(this.millisecond),
        };
    };
    EtDatetime.prototype.toIso8601String = function () {
        var y = this.year >= -9999 && this.year <= 9999 ? this.fourDigits(this.year) : this.sixDigits(this.year);
        var m = this.twoDigits(this.month);
        var d = this.twoDigits(this.day);
        var h = this.twoDigits(this.hour);
        var min = this.twoDigits(this.minute);
        var sec = this.twoDigits(this.second);
        var ms = this.threeDigits(this.millisecond);
        return y + "-" + m + "-" + d + "T" + h + ":" + min + ":" + sec + "." + ms;
    };
    EtDatetime.prototype.isBefore = function (other) {
        return this.fixed < other.fixed || this.moment < other.moment;
    };
    EtDatetime.prototype.isAfter = function (other) {
        return this.fixed > other.fixed || this.moment > other.moment;
    };
    EtDatetime.prototype.isAtSameMomentAs = function (other) {
        return this.fixed === other.fixed && this.moment === other.moment;
    };
    EtDatetime.prototype.compareTo = function (other) {
        if (this.isBefore(other))
            return -1;
        else if (this.isAtSameMomentAs(other))
            return 0;
        else
            return 1;
    };
    EtDatetime.prototype.add = function (duration) {
        return new EtDatetime(this.moment + duration.inMilliseconds);
    };
    EtDatetime.prototype.subtract = function (duration) {
        return new EtDatetime(this.moment - duration.inMilliseconds);
    };
    EtDatetime.prototype.difference = function (other) {
        return new duration_1.default(Math.abs(this.fixed - other.fixed), 0, 0, 0, 0, 0);
    };
    EtDatetime.prototype.fixedFromEthiopic = function (year, month, day) {
        return Math.floor(constants_1.constants._ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
    };
    EtDatetime.prototype.fixedFromUnix = function (ms) {
        return constants_1.constants._unixEpoch + Math.floor(ms / 86400000);
    };
    EtDatetime.prototype.dateToEpoch = function (year, month, date, hour, minute, second, millisecond) {
        return ((this.fixedFromEthiopic(year, month, date) - constants_1.constants._unixEpoch) * constants_1.constants.dayMilliSec +
            (hour ? hour * constants_1.constants.hourMilliSec : 0) +
            (minute ? minute * constants_1.constants.minMilliSec : 0) +
            (second ? second * constants_1.constants.secMilliSec : 0) +
            (millisecond ? millisecond : 0));
    };
    EtDatetime.prototype._yearFirstDay = function () {
        var ameteAlem = constants_1.constants.ameteFida + this.year;
        var rabeet = Math.floor(ameteAlem / 4);
        return (ameteAlem + rabeet) % 7;
    };
    EtDatetime.prototype.fourDigits = function (n) {
        var absN = Math.abs(n);
        var sign = n < 0 ? '-' : '';
        if (absN >= 1000)
            return "" + n;
        if (absN >= 100)
            return sign + "0" + absN;
        if (absN >= 10)
            return sign + "00" + absN;
        return sign + "000" + absN;
    };
    EtDatetime.prototype.sixDigits = function (n) {
        if (n < -9999 || n > 9999)
            throw new Error('Year out of scope');
        var absN = Math.abs(n);
        var sign = n < 0 ? '-' : '+';
        if (absN >= 100000)
            return "" + sign + absN;
        return sign + "0" + absN;
    };
    EtDatetime.prototype.threeDigits = function (n) {
        if (n >= 100)
            return "" + n;
        if (n >= 10)
            return "0" + n;
        return "00" + n;
    };
    EtDatetime.prototype.twoDigits = function (n) {
        return n >= 10 ? "" + n : "0" + n;
    };
    EtDatetime.prototype.toNumber = function (value) {
        if (value === undefined)
            return NaN;
        if (value === null)
            return 0;
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        if (typeof value === 'string')
            return parseInt(value, 10);
        if (typeof value === 'symbol')
            throw new Error('TYPE ERROR: Unexpected operand type.');
        if (typeof value === 'object')
            throw new Error('TYPE ERROR: Unexpected operand type.');
        return value;
    };
    return EtDatetime;
}());
exports.default = EtDatetime;
