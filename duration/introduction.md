---
description: 'A span of time, such as 27 days, 4 hours, 12 minutes, and 3 seconds.'
---

# Introduction

A Duration represents a difference from one point in time to another. The duration may be _negative_ if the difference is from a later time to an earlier.

`Durations` are context independent. For example, a duration of 2 days is always 48 hours, even when it is added to a `EtDateTime` just when the time zone is about to do a daylight-savings switch. \(See [`EtDateTime.add`](../date-time/introduction.md#comparing-etdatetime-objects)\).

Despite the same name, a Duration object does not implement `Durations` as specified by ISO 8601. In particular, a duration object does not keep track of the individually provided members \(such as "days" or "hours"\), but only uses these arguments to compute the length of the corresponding time interval.

To create a new Duration object, use this class's single constructor giving the appropriate arguments whose value will be the sum of all individual arguments.

```typescript
const hourDifference: Duration = new Duration(2, 0, 0, 0, 0, 0);
```

Duration class has all the functionalities to apply Arithmetic operations like

* Addition
* Subtraction
* Multiplication
* Division

and also Equality and Relational Operations like

* Greater than \(&gt;\)
* Greater than and Equal to \(&gt;=\)
* Less than \(&lt;\)
* Less than and Equal to \(&lt;=\)
* Equality \(=\)

Duration class can also return the given time duration or span in different ways, like

* In Days
* In Hours
* In Minutes
* In Seconds
* In Milliseconds and 
* In Microseconds

