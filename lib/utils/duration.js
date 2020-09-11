"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
class Duration {
    constructor(...args) {
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
    setMicroseconds(microseconds) {
        Duration._duration = Math.floor(microseconds);
    }
    get millisecondDuration() {
        return Duration._duration;
    }
    get inDays() {
        return Math.abs(Duration._duration / this.microsecondsPerDay);
    }
    get inHours() {
        return Math.abs(Duration._duration / this.microsecondsPerHour);
    }
    get inMinutes() {
        return Math.abs(Duration._duration / this.microsecondsPerMinute);
    }
    get inSeconds() {
        return Math.abs(Duration._duration / this.microsecondsPerSecond);
    }
    get inMilliseconds() {
        return Math.abs(Duration._duration / this.microsecondsPerMillisecond);
    }
    get inMicroseconds() {
        return Duration._duration;
    }
    get isNegative() {
        return Duration._duration < 0;
    }
    // operations
    abs() {
        return new Duration(Math.abs(Duration._duration));
    }
    add(other) {
        return new Duration(Duration._duration + other.millisecondDuration);
    }
    subtract(other) {
        return new Duration(Duration._duration - other.millisecondDuration);
    }
    multiply(factor) {
        return new Duration(Math.round(Duration._duration * factor));
    }
    divide(quotient) {
        if (quotient === 0)
            throw new Error('INTEGERDIVISIONBYZERO: Integer can not be divided by zero.');
        return new Duration(Math.floor(Duration._duration / quotient));
    }
    gt(other) {
        return Duration._duration > other.millisecondDuration;
    }
    gte(other) {
        return Duration._duration >= other.millisecondDuration;
    }
    lt(other) {
        return Duration._duration < other.millisecondDuration;
    }
    lte(other) {
        return Duration._duration <= other.millisecondDuration;
    }
    equal(other) {
        return Duration._duration === other.inMicroseconds;
    }
    compareTo(other) {
        if (this.lt(other))
            return -1;
        else if (this.equal(other))
            return 0;
        else
            return 1;
    }
    tostring() {
        if (this.isNegative)
            return `-${this}`;
        const min = this.twoDigits(this.inMinutes % this.minutesPerHour);
        const sec = this.twoDigits(this.inSeconds % this.secondsPerMinute);
        const micSec = this.sixDigits(this.inMicroseconds % this.microsecondsPerSecond);
        return `${this.inHours}:${min}:${sec}.${micSec}`;
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
    sixDigits(n) {
        if (n >= 100000)
            return `${n}`;
        if (n >= 10000)
            return `0${n}`;
        if (n >= 1000)
            return `00${n}`;
        if (n >= 100)
            return `000${n}`;
        if (n >= 10)
            return `0000${n}`;
        return `00000${n}`;
    }
    twoDigits(n) {
        if (n >= 10)
            return `${n}`;
        return `0${n}`;
    }
}
exports.default = Duration;
