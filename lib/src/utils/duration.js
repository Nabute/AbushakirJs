"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
var Duration = /** @class */ (function () {
    function Duration() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.microsecondsPerMillisecond = 1;
        this.millisecondsPerSecond = 1000;
        this.secondsPerMinute = 60;
        this.minutesPerHour = 60;
        this.hoursPerDay = 24;
        this.microsecondsPerSecond = this.microsecondsPerMillisecond * this.millisecondsPerSecond;
        this.microsecondsPerMinute = this.microsecondsPerSecond * this.secondsPerMinute;
        this.microsecondsPerHour = this.microsecondsPerMinute * this.minutesPerHour;
        this.microsecondsPerDay = this.microsecondsPerHour * this.hoursPerDay;
        this.millisecondsPerMinute = this.millisecondsPerSecond * this.secondsPerMinute;
        this.millisecondsPerHour = this.millisecondsPerMinute * this.minutesPerHour;
        this.millisecondsPerDay = this.millisecondsPerHour * this.hoursPerDay;
        this.secondsPerHour = this.secondsPerMinute * this.minutesPerHour;
        this.secondsPerDay = this.secondsPerHour * this.hoursPerDay;
        this.minutesPerDay = this.minutesPerHour * this.hoursPerDay;
        if (args.length > 0 && args.length < 7) {
            this.setMicroseconds(this.microsecondsPerDay * this.toNumber(args[0]) +
                this.microsecondsPerHour * this.toNumber(args[1]) +
                this.microsecondsPerMinute * this.toNumber(args[2]) +
                this.microsecondsPerSecond * this.toNumber(args[3]) +
                this.microsecondsPerMillisecond * this.toNumber(args[4]) +
                this.toNumber(args[5]));
        }
        else
            throw new Error('ARGUMENT ERROR: Invalid argument.');
    }
    Duration.prototype.setMicroseconds = function (microseconds) {
        Duration._duration = Math.floor(microseconds);
    };
    Object.defineProperty(Duration.prototype, "millisecondDuration", {
        get: function () {
            return Duration._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inDays", {
        get: function () {
            return Math.abs(Duration._duration / this.microsecondsPerDay);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inHours", {
        get: function () {
            return Math.abs(Duration._duration / this.microsecondsPerHour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inMinutes", {
        get: function () {
            return Math.abs(Duration._duration / this.microsecondsPerMinute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inSeconds", {
        get: function () {
            return Math.abs(Duration._duration / this.microsecondsPerSecond);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inMilliseconds", {
        get: function () {
            return Math.abs(Duration._duration / this.microsecondsPerMillisecond);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inMicroseconds", {
        get: function () {
            return Duration._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "isNegative", {
        get: function () {
            return Duration._duration < 0;
        },
        enumerable: true,
        configurable: true
    });
    // operations
    Duration.prototype.abs = function () {
        return new Duration(Math.abs(Duration._duration));
    };
    Duration.prototype.add = function (other) {
        return new Duration(Duration._duration + other.millisecondDuration);
    };
    Duration.prototype.subtract = function (other) {
        return new Duration(Duration._duration - other.millisecondDuration);
    };
    Duration.prototype.multiply = function (factor) {
        return new Duration(Math.round(Duration._duration * factor));
    };
    Duration.prototype.divide = function (quotient) {
        if (quotient === 0)
            throw new Error('INTEGERDIVISIONBYZERO: Integer can not be divided by zero.');
        return new Duration(Math.floor(Duration._duration / quotient));
    };
    Duration.prototype.gt = function (other) {
        return Duration._duration > other.millisecondDuration;
    };
    Duration.prototype.gte = function (other) {
        return Duration._duration >= other.millisecondDuration;
    };
    Duration.prototype.lt = function (other) {
        return Duration._duration < other.millisecondDuration;
    };
    Duration.prototype.lte = function (other) {
        return Duration._duration <= other.millisecondDuration;
    };
    Duration.prototype.equal = function (other) {
        return Duration._duration === other.inMicroseconds;
    };
    Duration.prototype.compareTo = function (other) {
        if (this.lt(other))
            return -1;
        else if (this.equal(other))
            return 0;
        else
            return 1;
    };
    Duration.prototype.tostring = function () {
        if (this.isNegative)
            return "-" + this;
        var min = this.twoDigits(this.inMinutes % this.minutesPerHour);
        var sec = this.twoDigits(this.inSeconds % this.secondsPerMinute);
        var micSec = this.sixDigits(this.inMicroseconds % this.microsecondsPerSecond);
        return this.inHours + ":" + min + ":" + sec + "." + micSec;
    };
    Duration.prototype.toNumber = function (value) {
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
    };
    Duration.prototype.sixDigits = function (n) {
        if (n >= 100000)
            return "" + n;
        if (n >= 10000)
            return "0" + n;
        if (n >= 1000)
            return "00" + n;
        if (n >= 100)
            return "000" + n;
        if (n >= 10)
            return "0000" + n;
        return "00000" + n;
    };
    Duration.prototype.twoDigits = function (n) {
        if (n >= 10)
            return "" + n;
        return "0" + n;
    };
    return Duration;
}());
exports.default = Duration;
