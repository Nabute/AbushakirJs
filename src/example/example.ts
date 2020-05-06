// Copyright 2020 GC (2012 ETC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

/// An Example of using the package to create and manipulate Ethiopian Date and
/// Time with the unique Calendar system which includes the way ethiopians
/// use to find movable feasts and holiday.

import 'package:abushakir/abushakir.dart';
import { EtDatetime, ETC, BahireHasab } from '..';

/**
 * Ethiopian Datetime Module [EtDatetime]
 */
var now: EtDatetime = new EtDatetime(); // => 2012-07-28 17:18:31.466
console.log(now.date); // => {year: 2012, month: 7, day: 28}
console.log(now.time); // => {h: 17, m: 18, s: 31}

var covidFirstConfirmed: EtDatetime = new EtDatetime(2012, 7, 4);
var covidFirstConfirmedEpoch: EtDatetime = new EtDatetime(covidFirstConfirmed.moment);

// var covidFirstDeath: EtDatetime = EtDatetime.parse("2012-07-26 23:00:00");

/// Comparison of two EtDatetime Instances
// Duration daysWithOutDeath = covidFirstConfirmed.difference(covidFirstDeath);

// console.log(daysWithOutDeath.inDays); // 22 days

// assert(covidFirstDeath.isAfter(covidFirstConfirmed), true);

// assert(covidFirstDeath.isBefore(now), true);

console.log(covidFirstConfirmed.isAtSameMomentAs(covidFirstConfirmedEpoch));

/**
 * Ethiopian Calendar Module [ETC]
 */
var ethiopianCalendar: ETC = new ETC(2011, 13, 4);

///
console.log(ethiopianCalendar.monthDays(true, true)); // Iterable Object of the given month
console.log(ethiopianCalendar.monthDays()); // => [2012, 7, 1, 1]
// [year, month, dateNumber, dateNameIndex], Monday as First weekday

console.log(ethiopianCalendar.nextMonth); // => ETC instance of nextMonth, same year
console.log(ethiopianCalendar.prevYear); // => ETC instance of prevYear, same month

/**
 * Bahire Hasab Module [BahireHasab]
 */
var bh: BahireHasab = new BahireHasab(2011);
//  var bh: BahireHasab = new BahireHasab(); // Get's the current year

console.log(bh.getEvangelist(true)); // => ሉቃስ

console.log(bh.getSingleBealOrTsom("ትንሳኤ")); // {month: ሚያዝያ, date: 20}

bh.allAtswamat; // => List of All fasting and Movable holidays
