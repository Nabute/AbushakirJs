"use strict";
// Copyright 2012 ETC (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
/// An Example of using the package to create and manipulate Ethiopian Date and
/// Time with the unique Calendar system which includes the way ethiopians
/// use to find movable feasts and holiday.
var __1 = require("..");
/**
 * Ethiopian Datetime Module [EtDatetime]
 */
var now = new __1.EtDatetime(); // => 2012-07-28 17:18:31.466
var nowDate = now.date; // => {year: 2012, month: 7, day: 28}
var nowTIme = now.time; // => {h: 17, m: 18, s: 31}
var covidFirstConfirmed = new __1.EtDatetime(2012, 7, 4);
var covidFirstConfirmedEpoch = new __1.EtDatetime(covidFirstConfirmed.moment);
// let covidFirstDeath: EtDatetime = EtDatetime.parse("2012-07-26 23:00:00");
/// Comparison of two EtDatetime Instances
// Duration daysWithOutDeath = covidFirstConfirmed.difference(covidFirstDeath);
// daysWithOutDeath.inDays); // 22 days
// assert(covidFirstDeath.isAfter(covidFirstConfirmed), true);
// assert(covidFirstDeath.isBefore(now), true);
covidFirstConfirmed.isAtSameMomentAs(covidFirstConfirmedEpoch);
/**
 * Ethiopian Calendar Module [ETC]
 */
var ethiopianCalendar = new __1.ETC(2011, 13, 4);
///
ethiopianCalendar.monthDays(true, true); // Iterable Object of the given month
ethiopianCalendar.monthDays(); // => [2012, 7, 1, 1]
// [year, month, dateNumber, dateNameIndex], Monday as First weekday
var nextmonth = ethiopianCalendar.nextMonth; // => ETC instance of nextMonth, same year
var previousmonth = ethiopianCalendar.prevYear; // => ETC instance of prevYear, same month
/**
 * Bahire Hasab Module [BahireHasab]
 */
var bh = new __1.BahireHasab(2011);
//  let bh: BahireHasab = new BahireHasab(); // Get's the current year
bh.getEvangelist(true); // => ሉቃስ
bh.getSingleBealOrTsom('ትንሳኤ'); // {month: ሚያዝያ, date: 20}
var allFastings = bh.allAtswamat; // => List of All fasting and Movable holidays
/**
 * Arabic or English number (1,2,3...) to Ethiopic or GE'EZ number Convertor
 */
var testNums = [1, 10, 15, 20, 25, 78, 105, 333, 450, 600, 1000, 1001, 1010, 1056, 1200, 2013, 9999, 10000];
for (var _i = 0, testNums_1 = testNums; _i < testNums_1.length; _i++) {
    var num = testNums_1[_i];
    console.log(__1.ConvertToEthiopic(num)); // [፲, ፲፭, ፳, ፳፭, ፸፰, ፻፭, ፫፻፴፫, ፬፻፶, ፮፻, ፲፻, ፲፻፩, ፲፻፲, ፲፻፶፮, ፲፪፻, ፳፻፲፫, ፺፱፻፺፱, ፻፻]
}
