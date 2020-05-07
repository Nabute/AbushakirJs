# AbushakirJs \(ባሕረ ሃሳብ\)

"Bahire Hasab /'bəhrɛ həsəb'/ " simply means "An age with a descriptive and chronological number". In some books it can also be found as "Hasabe Bahir", in a sense giving time an analogy, resembling a sea.

The words Bahire Hasab originate from the ancient language of Ge'ez, \( Arabic: Abu Shakir\) is a time-tracking method, devised by the 12th pope of Alexandria, Pope St. Dimitri.

This package allows developers to implement Ethiopian Calendar and Datetime System in their application\(s\)\`.

This package is implemented using the [UNIX EPOCH](https://en.wikipedia.org/wiki/Unix_time) which means it's not a conversion of any other calendar system into Ethiopian, for instance, Gregorian Calendar.

Unix Epoch is measured using milliseconds since 01 Jan, 1970 UTC. In UNIX EPOCH leap seconds are ignored.

## Getting started

```bash
npm i abushakir
```

## Import it

```typescript
import { EtDatetime, ETC, BahireHasab } from 'abushakir';
```
## Documentation
[AbushakirJs](https://nabute-foundation.gitbook.io/abushakir_js)

## Example

```typescript
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

/// An Example of using the package to create and manipulate Ethiopian Date and
/// Time with the unique Calendar system which includes the way ethiopians
/// use to find movable feasts and holiday.

"use strict";
import { EtDatetime, ETC, BahireHasab } from "abushakir";

console.log("\n**********   Ethiopian Date and Time Section   *************\n");
// Ethiopian Datetime Module [EtDatetime]
var now = new EtDatetime(); // => 2012-07-28 17:18:31.466
console.log("Priting Now's Date := ", now.date); // => {year: 2012, month: 7, day: 28}
console.log("Priting Now's Time := ", now.time); // => {h: 17, m: 18, s: 31}
var covidFirstConfirmed = new EtDatetime(2012, 7, 4);
var covidFirstConfirmedEpoch = new EtDatetime(covidFirstConfirmed.moment);
console.log("Comparing 'isAtSameMomentAs' := ", covidFirstConfirmed.isAtSameMomentAs(covidFirstConfirmedEpoch));


console.log("\n**********   Ethiopian Calendar Section   *************\n");
// Ethiopian Calendar Module [ETC]
var ethiopianCalendar = new ETC(2011, 13, 4);
///
console.log(ethiopianCalendar.monthDays(true, true)); // Iterable Object of the given month
console.log(ethiopianCalendar.monthDays()); // => [2012, 7, 1, 1]
// [year, month, dateNumber, dateNameIndex], Monday as First weekday
console.log("Printing Next Month:= ", ethiopianCalendar.nextMonth); // => ETC instance of nextMonth, same year
console.log("Printing Previous Year:= ", ethiopianCalendar.prevYear); // => ETC instance of prevYear, same month


console.log("\n**********   Bahire Hasab Section   *************\n");
// Bahire Hasab Module [BahireHasab]
var bh = new BahireHasab(2011);
//  let bh: BahireHasab = new BahireHasab(); // Get's the current year
console.log("Printing 2011's Evangelist := ", bh.getEvangelist(true)); // => ሉቃስ
console.log("Printing 2011's ትንሳኤ date := ", bh.getSingleBealOrTsom('ትንሳኤ')); // {month: ሚያዝያ, date: 20}
console.log("Printing 2011's allAtswamat := ", bh.allAtswamat); // => List of All fasting and Movable holidays
```

## Contact

If you want to contact me you can reach me at [daniel@ibrave.dev](mailto:daniel@ibrave.dev).

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Nabute/AbushakirJs/blob/master/LICENSE) file for details

