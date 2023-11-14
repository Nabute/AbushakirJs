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
// for (const num of testNums) {
//   console.log(ConvertToEthiopic(num)); // [፩, ፲, ፲፭, ፳, ፳፭, ፸፰, ፻፭, ፫፻፴፫, ፬፻፶, ፮፻, ፲፻, ፲፻፩, ፲፻፲, ፲፻፶፮, ፲፪፻, ፳፻፲፫, ፺፱፻፺፱, ፻፻]
// }
/*
 * Conversion from any calendar (for instance, from Gregorian) into Ethiopian Calendar.
 */
var gregorian1 = Date.now();
var ethiopian1 = new __1.EtDatetime(gregorian1);
// console.log(
//   `Gregorian := ${new Date(gregorian1).toISOString()} is equivalent to Ethiopian ${ethiopian1.toIso8601String()}`,
// );
// Gregorian := 2020-09-22T22:43:33.077Z is equivalent to Ethiopian 2013-01-12T22:43:33.077
/*
 * Conversion from Ethiopian Calendar into any calendar (for instance, to Gregorian).
 */
var ethiopian = new __1.EtDatetime();
var gregorian = new Date(ethiopian.moment);
// console.log(`Ethiopian ${ethiopian.toIso8601String()} is equivalent to Gregorian := ${gregorian.toISOString()}`);
// Ethiopian 2013-01-12T22:43:33.078 is equivalent to Gregorian := 2020-09-22T22:43:33.078Z
// console.log(`Ethiopian EPOCH := ${ethiopian.moment}`); // Ethiopian EPOCH := 1600814613078
// console.log(`Gregorian EPOCH := ${gregorian.valueOf()}`); // Gregorian EPOCH := 1600814613078
var date = new __1.EtDatetime(2013, 1, 11);
// console.log(date);
