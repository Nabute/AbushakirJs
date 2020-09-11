"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
const datetime_1 = require("./datetime");
const constants_1 = require("../utils/constants");
class BahireHasab {
    constructor(year) {
        year < 0 ? (this._year = new datetime_1.default(Date.now()).year) : (this._year = year);
    }
    get ameteAlem() {
        return constants_1.constants.ameteFida + this._year;
    }
    getEvangelist(returnName = false) {
        let evangelist;
        evangelist = this.ameteAlem % 4;
        if (returnName) {
            return constants_1.constants.evangelists[evangelist];
        }
        return evangelist.toString();
    }
    getMeskeremOne(returnName = false) {
        const rabeet = Math.floor(this.ameteAlem / 4);
        const result = (this.ameteAlem + rabeet) % 7;
        if (returnName)
            return constants_1.constants._weekdays[result];
        return result.toString();
    }
    get wenber() {
        return (this.ameteAlem % 19) - 1 < 0 ? 0 : (this.ameteAlem % 19) - 1;
    }
    get abekte() {
        return (this.wenber * constants_1.constants.tinteAbekte) % 30;
    }
    get metkih() {
        return this.wenber === 0 ? 30 : (this.wenber * constants_1.constants.tinteMetkih) % 30;
    }
    yebealeMetkihWer() {
        if (this.metkih > 14) {
            return 1;
        }
        else
            return 2;
    }
    get nenewe() {
        const meskerem1 = this.getMeskeremOne(true);
        const month = this.yebealeMetkihWer();
        let date;
        let dayTewsak = 0;
        for (const el of constants_1.constants._yeeletTewsak) {
            if (el.name === constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(meskerem1) + this.metkih - 1) % 7])
                dayTewsak = el.val;
        }
        let monthName = dayTewsak + this.metkih > 30 ? 'የካቲት' : 'ጥር';
        if (month === 2) {
            // ጥቅምት
            monthName = 'የካቲት';
            const tikimt1 = constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(meskerem1) + 2) % 7];
            const metkihElet = constants_1.constants._weekdays[(constants_1.constants._weekdays.indexOf(tikimt1) + this.metkih - 1) % 7];
            for (const al of constants_1.constants._yeeletTewsak) {
                if (al.name === constants_1.constants._weekdays[constants_1.constants._weekdays.indexOf(metkihElet)])
                    dayTewsak = al.val;
            }
        }
        date = this.metkih + dayTewsak;
        return { month: monthName, date: date % 30 === 0 ? 30 : date % 30 };
    }
    get allAtswamat() {
        const mebajaHamer = this.nenewe;
        const result = [];
        Object.keys(constants_1.constants._yebealTewsak).forEach((key) => {
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
    }
    isMovableHoliday(holidayName) {
        if (constants_1.constants._yebealTewsak.hasOwnProperty(holidayName)) {
            return true;
        }
        else
            throw new Error("FEASTNAME ERROR: Holiday or Feast is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'");
    }
    getSingleBealOrTsom(name) {
        const status = this.isMovableHoliday(name);
        if (status) {
            const mebajaHamer = this.nenewe;
            const target = constants_1.constants._yebealTewsak[name];
            const a = {
                month: constants_1.constants._months[constants_1.constants._months.indexOf(mebajaHamer.month) + Math.floor((mebajaHamer.date + target) / 30)],
                date: (mebajaHamer.date + target) % 30 === 0 ? 30 : (mebajaHamer.date + target) % 30,
            };
            return a;
        }
    }
}
exports.default = BahireHasab;
