// Copyright 2012 ETC (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

/// An Example of using the package to create and manipulate Ethiopian Date and
/// Time with the unique Calendar system which includes the way ethiopians
/// use to find movable feasts and holiday.

import { EtDatetime, ETC, BahireHasab, ConvertToEthiopic } from '..';

/**
 * Ethiopian Datetime Module [EtDatetime]
 */
const now: EtDatetime = new EtDatetime(); // => 2012-07-28 17:18:31.466
const nowDate = now.date; // => {year: 2012, month: 7, day: 28}
const nowTIme = now.time; // => {h: 17, m: 18, s: 31}

const covidFirstConfirmed: EtDatetime = new EtDatetime(2012, 7, 4);
const covidFirstConfirmedEpoch: EtDatetime = new EtDatetime(covidFirstConfirmed.moment);

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
const ethiopianCalendar: ETC = new ETC(2011, 13, 4);

///
ethiopianCalendar.monthDays(true, true); // Iterable Object of the given month
ethiopianCalendar.monthDays(); // => [2012, 7, 1, 1]
// [year, month, dateNumber, dateNameIndex], Monday as First weekday

const nextmonth = ethiopianCalendar.nextMonth; // => ETC instance of nextMonth, same year
const previousmonth = ethiopianCalendar.prevYear; // => ETC instance of prevYear, same month

/**
 * Bahire Hasab Module [BahireHasab]
 */
const bh: BahireHasab = new BahireHasab(2011);
//  let bh: BahireHasab = new BahireHasab(); // Get's the current year

bh.getEvangelist(true); // => ሉቃስ

bh.getSingleBealOrTsom('ትንሳኤ'); // {month: ሚያዝያ, date: 20}

const allFastings = bh.allAtswamat; // => List of All fasting and Movable holidays

/**
 * Arabic or English number (1,2,3...) to Ethiopic or GE'EZ number Convertor
 */

const testNums: number[] = [1, 10, 15, 20, 25, 78, 105, 333, 450, 600, 1000, 1001, 1010, 1056, 1200, 2013, 9999, 10000];

for (const num of testNums) {
  console.log(ConvertToEthiopic(num)); // [፩, ፲, ፲፭, ፳, ፳፭, ፸፰, ፻፭, ፫፻፴፫, ፬፻፶, ፮፻, ፲፻, ፲፻፩, ፲፻፲, ፲፻፶፮, ፲፪፻, ፳፻፲፫, ፺፱፻፺፱, ፻፻]
}

/*
 * Conversion from any calendar (for instance, from Gregorian) into Ethiopian Calendar.
 */
const gregorian1: number = Date.now();
const ethiopian1: EtDatetime = new EtDatetime(gregorian1);

console.log(
  `Gregorian := ${new Date(gregorian1).toISOString()} is equivalent to Ethiopian ${ethiopian1.toIso8601String()}`,
);
// Gregorian := 2020-09-22T22:43:33.077Z is equivalent to Ethiopian 2013-01-12T22:43:33.077

/*
 * Conversion from Ethiopian Calendar into any calendar (for instance, to Gregorian).
 */
const ethiopian: EtDatetime = new EtDatetime();
const gregorian: Date = new Date(ethiopian.moment);

console.log(`Ethiopian ${ethiopian.toIso8601String()} is equivalent to Gregorian := ${gregorian.toISOString()}`);
// Ethiopian 2013-01-12T22:43:33.078 is equivalent to Gregorian := 2020-09-22T22:43:33.078Z

console.log(`Ethiopian EPOCH := ${ethiopian.moment}`); // Ethiopian EPOCH := 1600814613078
console.log(`Gregorian EPOCH := ${gregorian.valueOf()}`); // Gregorian EPOCH := 1600814613078

const date = new EtDatetime(2013, 1, 11);
console.log(date);
