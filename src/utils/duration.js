"use strict";
exports.__esModule = true;
var Duration = /** @class */ (function () {
    // var zero: Duration = new Duration(seconds: 0);
    function Duration(_a) {
        var days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, milliseconds = _a.milliseconds, microseconds = _a.microseconds;
        this.microsecondsPerMillisecond = 1000;
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
        if (days !== undefined &&
            hours !== undefined &&
            minutes !== undefined &&
            seconds !== undefined &&
            milliseconds !== undefined &&
            microseconds !== undefined)
            throw new Error('ARGUMENT ERROR: One of the params must be provided.');
        var temp = 0;
        if (days !== undefined) {
            temp += Math.abs(this.microsecondsPerDay * days);
        }
        if (hours !== undefined) {
            temp += Math.abs(this.microsecondsPerHour * hours);
        }
        if (minutes !== undefined) {
            temp += Math.abs(this.microsecondsPerMinute * minutes);
        }
        if (seconds !== undefined) {
            temp += Math.abs(this.microsecondsPerSecond * seconds);
        }
        if (milliseconds !== undefined) {
            temp += Math.abs(this.microsecondsPerMillisecond * milliseconds);
        }
        if (microseconds !== undefined) {
            temp += Math.abs(microseconds);
        }
        this.setMicroseconds(temp);
    }
    Duration.prototype.setMicroseconds = function (microseconds) {
        Duration._duration = microseconds;
    };
    Object.defineProperty(Duration.prototype, "millisecondDuration", {
        get: function () {
            return Duration._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Duration.prototype, "inDays", {
        //
        // }
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
    return Duration;
}());
exports.Duration = Duration;
