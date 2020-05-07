---
description: NPM package for Ethiopian Calendar and Date-time reckoning system.
---

# AbushakirJs \(ባሕረ ሃሳብ\)

### What does it mean?

The words Bahire Hasab originate from the ancient language of Ge'ez, \( Arabic: Abu Shakir\) is a time-tracking method, devised by the 12th pope of Alexandria, Pope St. Dimitri.

The words Bahire Hasab originate from the ancient language of Ge'ez, \( Arabic: Abu Shakir\) is a time-tracking method, devised by the 12th pope of Alexandria, Pope St. Dimitri.

## What does it mean?

"Bahire Hasab /'bəhrɛ həsəb'/ " simply means "An age with a descriptive and chronological number". In some books it can also be found as "Hasabe Bahir", in a sense giving time an analogy, resembling a sea.

"Bahire Hasab /'bəhrɛ həsəb'/ " simply means "An age with a descriptive and chronological number". In some books it can also be found as "Hasabe Bahir", in a sense giving time an analogy, resembling a sea.

This package allows developers to implement Ethiopian Calendar and Datetime System in their application\(s\)\`.

This package allows developers to implement Ethiopian Calendar and Datetime System in their application\(s\)\`.

This package is implemented using the [UNIX EPOCH](https://en.wikipedia.org/wiki/Unix_time) which means it's not a conversion of any other calendar system into Ethiopian, for instance, Gregorian Calendar.

This package is implemented using the [UNIX EPOCH](https://en.wikipedia.org/wiki/Unix_time) which means it's not a conversion of any other calendar system into Ethiopian, for instance, Gregorian Calendar.

Unix Epoch is measured using milliseconds since 01 Jan, 1970 UTC. In UNIX EPOCH leap seconds are ignored.

Unix Epoch is measured using milliseconds since 01 Jan, 1970 UTC. In unix epoch leap seconds are ignored.

### Getting Started

## Getting started

```bash
npm i abushakir
```

```text
npm i abushakir
```

### Examples

## Example

```typescript
// Copyright 2020 GC (2012 ETC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

/// An Example of using the package to create and manipulate Ethiopian Date and
/// Time with the unique Calendar system which includes the way ethiopians
/// use to find movable feasts and holiday.

import { EtDatetime, ETC, BahireHasab } from '..';


// Ethiopian Datetime Module [EtDatetime]
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

// Ethiopian Calendar Module [ETC]
const ethiopianCalendar: ETC = new ETC(2011, 13, 4);

///
ethiopianCalendar.monthDays(true, true); // Iterable Object of the given month
ethiopianCalendar.monthDays(); // => [2012, 7, 1, 1]
// [year, month, dateNumber, dateNameIndex], Monday as First weekday

const nextmonth = ethiopianCalendar.nextMonth; // => ETC instance of nextMonth, same year
const previousmonth = ethiopianCalendar.prevYear; // => ETC instance of prevYear, same month


// Bahire Hasab Module [BahireHasab]
const bh: BahireHasab = new BahireHasab(2011);
//  let bh: BahireHasab = new BahireHasab(); // Get's the current year

bh.getEvangelist(true); // => ሉቃስ

bh.getSingleBealOrTsom('ትንሳኤ'); // {month: ሚያዝያ, date: 20}

const allFastings = bh.allAtswamat; // => List of All fasting and Movable holidays

```

```typescript
// Copyright 2020 GC (2012 ETC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

/// An Example of using the package to create and manipulate Ethiopian Date and
/// Time with the unique Calendar system which includes the way ethiopians
/// use to find movable feasts and holiday.

import { EtDatetime, ETC, BahireHasab } from '..';


// Ethiopian Datetime Module [EtDatetime]
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

// Ethiopian Calendar Module [ETC]
const ethiopianCalendar: ETC = new ETC(2011, 13, 4);

///
ethiopianCalendar.monthDays(true, true); // Iterable Object of the given month
ethiopianCalendar.monthDays(); // => [2012, 7, 1, 1]
// [year, month, dateNumber, dateNameIndex], Monday as First weekday

const nextmonth = ethiopianCalendar.nextMonth; // => ETC instance of nextMonth, same year
const previousmonth = ethiopianCalendar.prevYear; // => ETC instance of prevYear, same month


// Bahire Hasab Module [BahireHasab]
const bh: BahireHasab = new BahireHasab(2011);
//  let bh: BahireHasab = new BahireHasab(); // Get's the current year

bh.getEvangelist(true); // => ሉቃስ

bh.getSingleBealOrTsom('ትንሳኤ'); // {month: ሚያዝያ, date: 20}

const allFastings = bh.allAtswamat; // => List of All fasting and Movable holidays
```

### Contact

## Contact

 If you want to contact me you can reach me at [daniel@ibrave.dev](mailto:daniel@ibrave.dev).

If you want to contact me you can reach me at [daniel@ibrave.dev](mailto:daniel@ibrave.dev).

### License

## License

 This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Nabute/Abushakir/blob/master/LICENSE) file for details

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Nabute/AbushakirJs/tree/fd9d3ed8fcf89c03abf59c1713f93640e20e3079/LICENSE/README.md) file for details

