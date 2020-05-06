"use strict";
//
exports.__esModule = true;
var datetime_1 = require("./datetime");
var constants_1 = require("../utils/constants");
var BahireHasab = /** @class */ (function () {
    function BahireHasab(year) {
        year < 0 ? this._year = new datetime_1["default"](Date.now()).year : this._year = year;
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
            return ((this.ameteAlem % 19) - 1) < 0 ? 0 : (this.ameteAlem % 19) - 1;
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
            return this.wenber == 0 ? 30 : (this.wenber * constants_1.constants.tinteMetkih) % 30;
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
            var _this = this;
            var meskerem1 = this.getMeskeremOne(true);
            var month = this.yebealeMetkihWer();
            var date;
            var dayTewsak = 0;
            constants_1.constants._yeeletTewsak.forEach(function (el) {
                if (el.name == constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(meskerem1) + _this.metkih - 1) % 7])
                    dayTewsak = el.val;
            });
            var monthName = dayTewsak + this.metkih > 30 ? 'የካቲት' : 'ጥር';
            if (month == 2) {
                // ጥቅምት
                monthName = 'የካቲት';
                var tikimt1 = _weekdays[(_weekdays.indexOf(meskerem1) + 2) % 7];
                var metkihElet = constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(tikimt1) + this.metkih - 1) % 7];
                constants_1.constants._yeeletTewsak.forEach(function (el) {
                    if (el['key'] == constants_1.constants._weekdays[constants_1.constants._weekdays.indexOf(metkihElet)])
                        dayTewsak = el['value'];
                });
            }
            date = this.metkih + dayTewsak;
            return { "month": monthName, "date": date % 30 == 0 ? 30 : date % 30 };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BahireHasab.prototype, "allAtswamat", {
        get: function () {
            var mebajaHamer = this.nenewe;
            var result = [];
            constants_1.constants._yebealTewsak.forEach(function (beal, numOfDays) {
                result.push({ "beal": beal, "day": { "month": constants_1.constants._months[constants_1.constants._months.indexOf(mebajaHamer['month']) + Math.floor((mebajaHamer['date'] + numOfDays) / 30)], "date": (mebajaHamer['date'] + numOfDays) % 30 == 0 ? 30 : (mebajaHamer['date'] + numOfDays) % 30 } });
            });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    BahireHasab.prototype.isMovableHoliday = function (holidayName) {
        if (constants_1.constants._yebealTewsak.keys.contains(holidayName)) {
            return true;
        }
        else
            throw new Error("FEASTNAME ERROR: Holiday is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'");
    };
    BahireHasab.prototype.getSingleBealOrTsom = function (name) {
        var status = this.isMovableHoliday(name);
        if (status) {
            var mebajaHamer = this.nenewe;
            var target = constants_1.constants._yebealTewsak[name];
            var a = {
                "month": constants_1.constants._months[constants_1.constants._months.indexOf(mebajaHamer['month']) + Math.floor((mebajaHamer['date'] + target) / 30)],
                "date": (mebajaHamer['date'] + target) % 30 == 0 ? 30 : (mebajaHamer['date'] + target) % 30
            };
            return a;
        }
    };
    return BahireHasab;
}());
exports["default"] = BahireHasab;
