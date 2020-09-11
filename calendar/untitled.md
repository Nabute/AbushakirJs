---
description: 'Ethiopia, 13 Month of sunshine.'
---

# Introduction

The Ethiopian calendar is one of the the calendars which uses the solar system to reckon years, months and days, even time. Ethiopian single year consists of 365.25 days which will be 366 days with in 4 years period which causes the leap year. Ethiopian calendar has 13 months from which 12 months are full 30 days each and the 13th month will be 5 days or 6 days during leap year.

Create `ETC` object instances which are days of certain month in a certain year, using one of the constructors. The `ETC`  constructor is a single function whose behavior is overloaded based upon the number of its arguments.

`EtC` constructor can be called with at least one arguments and at most 3 arguments:

```typescript
const pagumeSix: ETC = new ETC(2011, 13, 6);
```

`EtC` constructor can be called with out any argument\(s\):

```typescript
const pagumeSix: ETC = new ETC(2011, 13, 6)
```

 After creating instance of `ETC`, you can navigate to the future or past of the given date in month and year.

```typescript
const nextMonth: ETC = pagumeSix.nextMonth 
const prevMonth: ETC = pagumeSix.prevMonth

// back and forth in year
const nextYear: ETC = pagumeSix.nextYear 
const prevYear : ETC = pagumeSix.prevYear
```

All the available days within a single month can be found using

```typescript
pagumeSix.monthDays(true, true) // geezDay?: boolean, weekDayName?: boolean

/* Output will be
[ [ 2011, 13, '፩', 'አርብ' ],
  [ 2011, 13, '፪', 'ቅዳሜ' ],
  [ 2011, 13, '፫', 'እሁድ' ],
  [ 2011, 13, '፬', 'ሰኞ' ],
  [ 2011, 13, '፭', 'ማግሰኞ' ],
  [ 2011, 13, '፮', 'ረቡዕ' ] ]
*/
```

or just all of the days available in the given year can also be found using

```typescript
pagumeSix.yearDays(true, true) // geezDay?: boolean, weekDayName?: boolean
```



