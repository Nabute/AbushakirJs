"use strict";
exports.__esModule = true;
var datetime_1 = require("../Abushakir/datetime");
var constants_1 = require("../utils/constants");
var ETC = /** @class */ (function () {
    function ETC() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._date = new datetime_1["default"](args[0], args[1], args[2]);
        // handle argument errors ( maximum of 3 arguments)
    }
    Object.defineProperty(ETC.prototype, "year", {
        get: function () {
            return this._date.year;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "month", {
        get: function () {
            return this._date.month;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "day", {
        get: function () {
            return this._date.day;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "monthName", {
        get: function () {
            return this._date.monthGeez;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "allMonths", {
        get: function () {
            return constants_1.constants._months;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "dayNumbers", {
        get: function () {
            return constants_1.constants._dayNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "weekdays", {
        get: function () {
            return constants_1.constants._weekdays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "nextMonth", {
        get: function () {
            return new ETC(this._date.year, this._date.month + 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "prevMonth", {
        get: function () {
            return new ETC(this._date.month == 1 ? this._date.year - 1 : this._date.year, this._date.month - 1 == 0 ? 13 : this._date.month - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "nextYear", {
        get: function () {
            return new ETC(this._date.year + 1, this._date.month);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ETC.prototype, "prevYear", {
        get: function () {
            return new ETC(this._date.year - 1, this._date.month);
        },
        enumerable: true,
        configurable: true
    });
    ETC.prototype._monthRange = function () {
        if (this._date.month <= 1 && this._date.month >= 13)
            throw new Error('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
        return [this._date.weekday, this._date.month == 13 ? (this._date.isLeap ? 6 : 5) : 30];
    };
    ETC.prototype._monthDays = function (year, month, geezDay, weekDayName) {
        var yr = new datetime_1["default"](year, month);
        var monthBeginning = yr.weekday;
        var daysInMonth = yr.month == 13 ? (yr.isLeap ? 6 : 5) : 30;
        var result = [];
        for (var i = 0; i < daysInMonth; i++) {
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
    };
    ETC.prototype.monthDays = function (geezDay, weekDayName) {
        if (geezDay === void 0) { geezDay = false; }
        if (weekDayName === void 0) { weekDayName = false; }
        var monthBeginning = this._monthRange()[0];
        var daysInMonth = this._monthRange()[1];
        var result = [];
        for (var i = 0; i < daysInMonth; i++) {
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
    };
    ETC.prototype.yearDays = function (geezDay, weekDayName) {
        if (geezDay === void 0) { geezDay = false; }
        if (weekDayName === void 0) { weekDayName = false; }
        var result = [];
        for (var i = 0; i < constants_1.constants._months.length; i++) {
            result.push(this._monthDays(this._date.year, i + 1, geezDay, weekDayName));
        }
        return result;
    };
    ETC.prototype.today = function () {
        this._date = new datetime_1["default"](Date.now());
    };
    return ETC;
}());
exports["default"] = ETC;
