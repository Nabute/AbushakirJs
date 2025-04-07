"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../utils/constants");
var duration_1 = __importDefault(require("../utils/duration"));
var EtDatetime = /** @class */ (function () {
    /**
     * Constructs an EtDatetime instance.
     *
     * @param args Either:
     *  - No arguments → initializes to current time
     *  - One number → milliseconds since Unix epoch OR Ethiopic year
     *  - Multiple positional Ethiopic components: (year, month, day, hour?, minute?, second?, millisecond?)
     */
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
    /**
     * Sets the current datetime using a Unix timestamp in milliseconds.
     *
     * @param millisecondsSinceEpoch Timestamp in milliseconds since the Unix epoch
     */
    EtDatetime.prototype.fromMillisecondsSinceEpoch = function (millisecondsSinceEpoch) {
        this.moment = millisecondsSinceEpoch;
        this.fixed = this.fixedFromUnix(millisecondsSinceEpoch);
        if (this.fixed === null)
            throw new Error('ARGUMENT ERROR: Unacceptable argument.');
        if (Math.abs(millisecondsSinceEpoch) >= constants_1.constants.maxMillisecondsSinceEpoch)
            throw new Error("Calendar outside valid range " + constants_1.constants.maxMillisecondsSinceEpoch);
    };
    /**
     * Updates the EtDatetime to the current system time.
     */
    EtDatetime.prototype.now = function () {
        this.fixed = this.fixedFromUnix(Date.now());
        this.moment = Date.now();
    };
    Object.defineProperty(EtDatetime.prototype, "year", {
        /** Ethiopic year */
        get: function () {
            return Math.floor((4 * (this.fixed - constants_1.constants._ethiopicEpoch) + 1463) / 1461);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "month", {
        /** Ethiopic month (1-13) */
        get: function () {
            return Math.floor((this.fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "monthGeez", {
        /** Ethiopic month name in Geez */
        get: function () {
            return constants_1.constants._months[(this.month - 1) % 13];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "day", {
        /** Ethiopic day of the month (1-30) */
        get: function () {
            return this.fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "dayGeez", {
        /** Day of the month in Geez numeral format */
        get: function () {
            return constants_1.constants._dayNumbers[(this.day - 1) % 30];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "hour", {
        /** Hour of the day (0-23) */
        get: function () {
            return Math.floor(this.moment / constants_1.constants.hourMilliSec) % 24;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "minute", {
        /** Minute of the hour (0-59) */
        get: function () {
            return Math.floor(this.moment / constants_1.constants.minMilliSec) % 60;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "second", {
        /** Second of the minute (0-59) */
        get: function () {
            return Math.floor((this.moment / constants_1.constants.secMilliSec) % 60);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "millisecond", {
        /** Millisecond of the second (0-999) */
        get: function () {
            return this.moment % 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "isLeap", {
        /** Whether this year is a leap year in the Ethiopian calendar */
        get: function () {
            return this.year % 4 === 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "yearFirstDay", {
        /** The weekday index of the first day of the year (0-6, Sunday–Saturday) */
        get: function () {
            return this._yearFirstDay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "weekday", {
        /** Weekday index of the current date */
        get: function () {
            return (this.yearFirstDay + (this.month - 1) * 2) % 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "date", {
        /** Date object: { year, month, day } */
        get: function () {
            return { year: this.year, month: this.month, day: this.day };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EtDatetime.prototype, "time", {
        /** Time object: { h, m, s } */
        get: function () {
            return { h: this.hour, m: this.minute, s: this.second };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a formatted string representation: `yyyy-MM-ddTHH:mm:ss.sss`
     */
    EtDatetime.prototype.toString = function () {
        return this.toIso8601String();
    };
    /**
     * Returns a formatted JSON-friendly object representation
     */
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
    /**
     * Returns ISO-8601 formatted string.
     */
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
    /**
     * Returns true if this date is before the other.
     */
    EtDatetime.prototype.isBefore = function (other) {
        return this.fixed < other.fixed || this.moment < other.moment;
    };
    /**
     * Returns true if this date is after the other.
     */
    EtDatetime.prototype.isAfter = function (other) {
        return this.fixed > other.fixed || this.moment > other.moment;
    };
    /**
     * Returns true if this date is at the same moment as the other.
     */
    EtDatetime.prototype.isAtSameMomentAs = function (other) {
        return this.fixed === other.fixed && this.moment === other.moment;
    };
    /**
     * Compares this instance with another EtDatetime.
     * Returns -1 if earlier, 1 if later, or 0 if equal.
     */
    EtDatetime.prototype.compareTo = function (other) {
        if (this.isBefore(other))
            return -1;
        else if (this.isAtSameMomentAs(other))
            return 0;
        else
            return 1;
    };
    /**
     * Adds a Duration to this date.
     */
    EtDatetime.prototype.add = function (duration) {
        return new EtDatetime(this.moment + duration.inMilliseconds);
    };
    /**
     * Subtracts a Duration from this date.
     */
    EtDatetime.prototype.subtract = function (duration) {
        return new EtDatetime(this.moment - duration.inMilliseconds);
    };
    /**
     * Returns the Duration between this and another EtDatetime.
     */
    EtDatetime.prototype.difference = function (other) {
        return new duration_1.default(Math.abs(this.fixed - other.fixed), 0, 0, 0, 0, 0);
    };
    /**
     * Gets the fixed date from Ethiopic calendar date.
     */
    EtDatetime.prototype.fixedFromEthiopic = function (year, month, day) {
        return Math.floor(constants_1.constants._ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
    };
    /**
     * Gets the fixed date from Unix timestamp (in ms).
     */
    EtDatetime.prototype.fixedFromUnix = function (ms) {
        return constants_1.constants._unixEpoch + Math.floor(ms / 86400000);
    };
    /**
     * Converts Ethiopic date-time to Unix epoch milliseconds.
     */
    EtDatetime.prototype.dateToEpoch = function (year, month, date, hour, minute, second, millisecond) {
        return ((this.fixedFromEthiopic(year, month, date) - constants_1.constants._unixEpoch) * constants_1.constants.dayMilliSec +
            (hour ? hour * constants_1.constants.hourMilliSec : 0) +
            (minute ? minute * constants_1.constants.minMilliSec : 0) +
            (second ? second * constants_1.constants.secMilliSec : 0) +
            (millisecond !== null && millisecond !== void 0 ? millisecond : 0));
    };
    /**
     * Returns the weekday of the first day of the year.
     */
    EtDatetime.prototype._yearFirstDay = function () {
        var ameteAlem = constants_1.constants.ameteFida + this.year;
        var rabeet = Math.floor(ameteAlem / 4);
        return (ameteAlem + rabeet) % 7;
    };
    /** Formats a year as 4-digit string (e.g., 2012) */
    EtDatetime.prototype.fourDigits = function (n) {
        var abs = Math.abs(n);
        var sign = n < 0 ? '-' : '';
        if (abs >= 1000)
            return "" + n;
        if (abs >= 100)
            return sign + "0" + abs;
        if (abs >= 10)
            return sign + "00" + abs;
        return sign + "000" + abs;
    };
    /** Formats a year as 6-digit string (for extreme years) */
    EtDatetime.prototype.sixDigits = function (n) {
        if (n < -9999 || n > 9999)
            throw new Error('Year out of scope');
        var abs = Math.abs(n);
        var sign = n < 0 ? '-' : '+';
        if (abs >= 100000)
            return "" + sign + abs;
        return sign + "0" + abs;
    };
    /** Pads a number to 3 digits */
    EtDatetime.prototype.threeDigits = function (n) {
        if (n >= 100)
            return "" + n;
        if (n >= 10)
            return "0" + n;
        return "00" + n;
    };
    /** Pads a number to 2 digits */
    EtDatetime.prototype.twoDigits = function (n) {
        return n >= 10 ? "" + n : "0" + n;
    };
    /**
     * Converts various types to a number.
     * Throws if the type is invalid (symbol, object).
     */
    EtDatetime.prototype.toNumber = function (value) {
        if (value === undefined)
            return NaN;
        if (value === null)
            return 0;
        if (typeof value === 'boolean')
            return value ? 1 : 0;
        if (typeof value === 'string')
            return parseInt(value, 10);
        if (typeof value === 'symbol' || typeof value === 'object')
            throw new Error('TYPE ERROR: Unexpected operand type.');
        return value;
    };
    /** Returns the timestamp in milliseconds */
    EtDatetime.prototype.valueOf = function () {
        return this.moment;
    };
    /** Alias of `toIso8601String()` */
    EtDatetime.prototype.toJSON = function () {
        return this.toIso8601String();
    };
    /** Alias of `toIso8601String()` */
    EtDatetime.prototype.toISOString = function () {
        return this.toIso8601String();
    };
    /** Returns Ethiopic year */
    EtDatetime.prototype.getFullYear = function () {
        return this.year;
    };
    /** Returns Ethiopic month (0-indexed) */
    EtDatetime.prototype.getMonth = function () {
        return this.month - 1;
    };
    /** Returns Ethiopic day */
    EtDatetime.prototype.getDate = function () {
        return this.day;
    };
    /** Returns hour */
    EtDatetime.prototype.getHours = function () {
        return this.hour;
    };
    /** Returns minute */
    EtDatetime.prototype.getMinutes = function () {
        return this.minute;
    };
    /** Returns second */
    EtDatetime.prototype.getSeconds = function () {
        return this.second;
    };
    /** Returns millisecond */
    EtDatetime.prototype.getMilliseconds = function () {
        return this.millisecond;
    };
    /**
     * Static method that returns the current EtDatetime.
     */
    EtDatetime.now = function () {
        return new EtDatetime(Date.now());
    };
    Object.defineProperty(EtDatetime.prototype, Symbol.toStringTag, {
        /** Customizes output of Object.prototype.toString.call() */
        get: function () {
            return 'EtDatetime';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enables primitive coercion:
     * - String context → ISO string
     * - Number context → timestamp
     */
    EtDatetime.prototype[Symbol.toPrimitive] = function (hint) {
        if (hint === 'string' || hint === 'default')
            return this.toISOString();
        if (hint === 'number')
            return this.valueOf();
        return this.toISOString();
    };
    /**
     * Returns timestamp in ms (same as valueOf).
     */
    EtDatetime.prototype.getTime = function () {
        return this.valueOf();
    };
    /**
     * Converts EtDatetime to native JavaScript Date.
     */
    EtDatetime.prototype.toDate = function () {
        return new Date(this.moment);
    };
    return EtDatetime;
}());
exports.default = EtDatetime;
