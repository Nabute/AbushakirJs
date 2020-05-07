---
description: 'An instant in time, such as መጋቢት 20, 2012, 8:18pm.'
---

# Introduction

`EtDatetime` can represent time values that are at a distance of at most 100,000,000 days from epoch \(1970-01-01\): -271821-04-20 to 275760-09-13.

The `EtDatetime`  constructor is a single function whose behavior is overloaded based upon the number and types of its arguments.

 `EtDatetime` constructor can be called with at least two arguments:

```typescript
const covidFirstConfirmed: EtDatetime = new EtDatetime(2012, 7, 4);
```

 `EtDatetime` constructor can be called with exactly one argument:

```typescript
const onceUpOnaTime: EtDatetime = new EtDatetime(1585731446021);
```

Finally `EtDatetime` constructor can also be called with no arguments.

```typescript
const now: EtDatetime = new EtDatetime(); 
```

For convenience and readability, the `EtDatetime` class provides a constant for each day and month name - for example, መስከረም and ማግሰኞ. You can use these constants to improve code readability:

Day and month indexes begin at 0, and the week starts on Monday \(ሰኞ\). That is, the constants መስከረም and ሰኞ are both 1.

### Comparing EtDatetime objects <a id="comparing-etdatetime-objects"></a>

 The `EtDatetime` class contains several handy methods, such as **isAfter**, **isBefore**, and **isAtSameMomentAs**, for comparing `EtDatetime` objects.

```typescript
const samemoment: boolean = covidFirstConfirmed.isAtSameMomentAs(covidFirstConfirmedEpoch)
```

### Using EtDatetime with Duration <a id="using-etdatetime-with-duration"></a>

 Use the **add** and **subtract** methods with a `Duration` object to create a new `EtDatetime` object based on another. For example, to find the date that is sixty days \(24 \* 60 hours\) after today, write:

```typescript
const afterTwoDays = now.add(new Duration(2, 0, 0, 0, 0, 0)) // Adds 2 days from today.
```

{% hint style="info" %}
#### NOTE <a id="note"></a>

There is no UTC or TIme zone feature in this package since it's built only for Ethiopia.
{% endhint %}

For further reading, please refer the [Dart Documentation](https://pub.dev/documentation/abushakir/latest/abushakir/EtDatetime-class.html) 

