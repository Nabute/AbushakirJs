# AbushakirJs (ባሕረ ሃሳብ)

> **Bahire Hasab /'bəhrɛ həsəb/**" means _“An age with a descriptive and chronological number.”_ It's also seen as **Hasabe Bahir**, likening time to a vast sea.

Originating from **Ge’ez** and known in Arabic as **Abu Shakir**, this system was devised by the 12th Coptic Pope of Alexandria, **Pope St. Dimitri**, to track time through the Ethiopian calendar.

---

## What is AbushakirJs?

**AbushakirJs** is a fully native JavaScript and TypeScript library that implements the **Ethiopian calendar and datetime system**, based on the **UNIX Epoch** (milliseconds since January 1, 1970 UTC). It is **not a conversion layer** over Gregorian — it's a first-class timekeeping model.

- Works directly with the Ethiopian calendar  
- Handles date-time, holidays, feasts, and calendar math  
- ESDate-compatible API (new!)  
- Ideal for frontend and backend usage (Node, browsers)

---

## Getting Started

### Install

```bash
npm i abushakir
```

---

### Import

```ts
import {
  EtDatetime,
  ETC,
  BahireHasab,
  ConvertToEthiopic
} from 'abushakir';
```

---

## Documentation

- **Docs:** [AbushakirJs Docs →](https://nabute925.gitbook.io/abushakir_js/)
- **Demo App:** [Ethiopian Calendar (Vue)](https://github.com/Nabute/Abushakir-VueJs)

---

## Features

### Ethiopian Datetime (`EtDatetime`)

```ts
const now = new EtDatetime(); // 2012-07-28T17:18:31.466
console.log(now.date); // { year: 2012, month: 7, day: 28 }
console.log(now.time); // { h: 17, m: 18, s: 31 }
```

Supports:

- Full date-time creation
- Time arithmetic (`add`, `subtract`, `difference`)
- Comparison methods (`isAfter`, `isBefore`, `isAtSameMomentAs`)
- ISO 8601 output
- Temporal API (`toTemporalInstant()`)
- ECMAScript-style API:
  - `getDay`, `getFullYear`, `getMonth`, `getDate`, `setDate`, etc.
  - `toDateString`, `toLocaleString`, `toUTCString`, etc.

---

### Calendar Grid (`ETC`)

```ts
const calendar = new ETC(2011, 13, 4);
calendar.monthDays();            // [2012, 7, 1, 1]
calendar.monthDays(true, true);  // Iterable month representation
console.log(calendar.nextMonth); // ETC instance for next month
console.log(calendar.prevYear);  // ETC instance for same month last year
```

---

### Bahire Hasab (የባሕረ ሐሳብ ሒሳብ)

```ts
const bh = new BahireHasab(2011);
bh.getEvangelist(true); // => ሉቃስ
bh.getSingleBealOrTsom('ትንሳኤ'); // => {month: ሚያዝያ, date: 20}
const fasts = bh.allAtswamat;
```

---

### Arabic to Ethiopic Numerals

```ts
const nums = [1, 10, 105, 9999];
nums.map(ConvertToEthiopic);
// Output: ['፩', '፲', '፻፭', '፺፱፻፺፱']
```

---

### Calendar Conversion

#### Gregorian → Ethiopian

```ts
const gregorian = Date.now();
const ethiopian = new EtDatetime(gregorian);
console.log(ethiopian.toIso8601String());
```

#### Ethiopian → Gregorian

```ts
const etDate = new EtDatetime(2013, 1, 12);
console.log(new Date(etDate.moment).toISOString());
```

---

## Example

```ts
const et1 = new EtDatetime(2012, 7, 4);
const et2 = new EtDatetime(2012, 7, 26);

const duration = et2.difference(et1);
console.log(duration.inDays); // 22
console.log(et2.isAfter(et1)); // true
```

---

## Contact

Reach out with questions or feedback:  
[nabute925@gmail.com](mailto:nabute925@gmail.com)

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](https://github.com/Nabute/AbushakirJs/blob/master/LICENSE) file for details.