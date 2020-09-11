"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
var datetime_1 = require("./datetime");
var constants_1 = require("../utils/constants");
var BahireHasab = /** @class */ (function () {
    function BahireHasab(year) {
        year < 0 ? (this._year = new datetime_1.default(Date.now()).year) : (this._year = year);
    }
    Object.defineProperty(BahireHasab.prototype, "ameteAlem", {
        get: function () {
            return constants_1.constants.ameteFida + this._year;
        },
        enumerable: true,
        configurable: true
    });
    BahireHasab.prototype.getEvangelist = function (returnName) {
        if (returnName === void 0) { returnName = false; }
        var evangelist;
        evangelist = this.ameteAlem % 4;
        if (returnName) {
            return constants_1.constants.evangelists[evangelist];
        }
        return evangelist.toString();
    };
    BahireHasab.prototype.getMeskeremOne = function (returnName) {
        if (returnName === void 0) { returnName = false; }
        var rabeet = Math.floor(this.ameteAlem / 4);
        var result = (this.ameteAlem + rabeet) % 7;
        if (returnName)
            return constants_1.constants._weekdays[result];
        return result.toString();
    };
    Object.defineProperty(BahireHasab.prototype, "wenber", {
        get: function () {
            return (this.ameteAlem % 19) - 1 < 0 ? 0 : (this.ameteAlem % 19) - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BahireHasab.prototype, "abekte", {
        get: function () {
            return (this.wenber * constants_1.constants.tinteAbekte) % 30;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BahireHasab.prototype, "metkih", {
        get: function () {
            return this.wenber === 0 ? 30 : (this.wenber * constants_1.constants.tinteMetkih) % 30;
        },
        enumerable: true,
        configurable: true
    });
    BahireHasab.prototype.yebealeMetkihWer = function () {
        if (this.metkih > 14) {
            return 1;
        }
        else
            return 2;
    };
    Object.defineProperty(BahireHasab.prototype, "nenewe", {
        get: function () {
            var meskerem1 = this.getMeskeremOne(true);
            var month = this.yebealeMetkihWer();
            var date;
            var dayTewsak = 0;
            for (var _i = 0, _a = constants_1.constants._yeeletTewsak; _i < _a.length; _i++) {
                var el = _a[_i];
                if (el.name === constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(meskerem1) + this.metkih - 1) % 7])
                    dayTewsak = el.val;
            }
            var monthName = dayTewsak + this.metkih > 30 ? 'የካቲት' : 'ጥር';
            if (month === 2) {
                // ጥቅምት
                monthName = 'የካቲት';
                var tikimt1 = constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(meskerem1) + 2) % 7];
                var metkihElet = constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(tikimt1) + this.metkih - 1) % 7];
                for (var _b = 0, _c = constants_1.constants._yeeletTewsak; _b < _c.length; _b++) {
                    var al = _c[_b];
                    if (al.name === constants_1.constants._weekdays[constants_1.constants._weekdays.indexOf(metkihElet)])
                        dayTewsak = al.val;
                }
            }
            date = this.metkih + dayTewsak;
            return { month: monthName, date: date % 30 === 0 ? 30 : date % 30 };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BahireHasab.prototype, "allAtswamat", {
        get: function () {
            var mebajaHamer = this.nenewe;
            var result = [];
            Object.keys(constants_1.constants._yebealTewsak).forEach(function (key) {
                result.push({
                    beal: key,
                    day: {
                        month: constants_1.constants._months[constants_1.constants._months.indexOf(mebajaHamer.month) +
                            Math.floor((mebajaHamer.date + constants_1.constants._yebealTewsak[key]) / 30)],
                        date: (mebajaHamer.date + constants_1.constants._yebealTewsak[key]) % 30 === 0
                            ? 30
                            : (mebajaHamer.date + constants_1.constants._yebealTewsak[key]) % 30,
                    },
                });
            });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    BahireHasab.prototype.isMovableHoliday = function (holidayName) {
        if (constants_1.constants._yebealTewsak.hasOwnProperty(holidayName)) {
            return true;
        }
        else
            throw new Error("FEASTNAME ERROR: Holiday or Feast is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'");
    };
    BahireHasab.prototype.getSingleBealOrTsom = function (name) {
        var status = this.isMovableHoliday(name);
        if (status) {
            var mebajaHamer = this.nenewe;
            var target = constants_1.constants._yebealTewsak[name];
            var a = {
                month: constants_1.constants._months[constants_1.constants._months.indexOf(mebajaHamer.month) + Math.floor((mebajaHamer.date + target) / 30)],
                date: (mebajaHamer.date + target) % 30 === 0 ? 30 : (mebajaHamer.date + target) % 30,
            };
            return a;
        }
    };
    return BahireHasab;
}());
exports.default = BahireHasab;
