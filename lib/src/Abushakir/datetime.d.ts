/**
 * EtDatetime represents a date and time in the Ethiopian calendar.
 * It offers a similar API to JavaScript's Date object, but tailored to the Ethiopian calendar.
 *
 * @remarks
 * Supports construction from Ethiopic components or Unix timestamps,
 * and can be used as a drop-in replacement in many UI contexts.
 *
 * @example
 * ```ts
 * const date = new EtDatetime(2016, 7, 23); // 2016 Meskerem 23
 * const now = EtDatetime.now();
 * console.log(`${date}`); // ISO8601 string
 * ```
 *
 * @license MIT
 */
import Datetime from '../Interfaces/EDT';
import Duration from '../utils/duration';
import { Temporal } from '@js-temporal/polyfill';
declare class EtDatetime implements Datetime {
    /** Epoch-based timestamp in milliseconds (Unix) */
    moment: number;
    /** Ethiopic fixed date representation */
    fixed: number;
    /**
     * Constructs an EtDatetime instance.
     *
     * @param args Either:
     *  - No arguments → initializes to current time
     *  - One number → milliseconds since Unix epoch OR Ethiopic year
     *  - Multiple positional Ethiopic components: (year, month, day, hour?, minute?, second?, millisecond?)
     */
    constructor(...args: any[]);
    /**
     * Sets the current datetime using a Unix timestamp in milliseconds.
     *
     * @param millisecondsSinceEpoch Timestamp in milliseconds since the Unix epoch
     */
    fromMillisecondsSinceEpoch(millisecondsSinceEpoch: number): void;
    /**
     * Updates the EtDatetime to the current system time.
     */
    now(): void;
    /** Ethiopic year */
    get year(): number;
    /** Ethiopic month (1-13) */
    get month(): number;
    /** Ethiopic month name in Geez */
    get monthGeez(): string;
    /** Ethiopic day of the month (1-30) */
    get day(): number;
    /** Day of the month in Geez numeral format */
    get dayGeez(): string;
    /** Hour of the day (0-23) */
    get hour(): number;
    /** Minute of the hour (0-59) */
    get minute(): number;
    /** Second of the minute (0-59) */
    get second(): number;
    /** Millisecond of the second (0-999) */
    get millisecond(): number;
    /** Whether this year is a leap year in the Ethiopian calendar */
    get isLeap(): boolean;
    /** The weekday index of the first day of the year (0-6, Sunday–Saturday) */
    get yearFirstDay(): number;
    /** Weekday index of the current date */
    get weekday(): number;
    /** Date object: { year, month, day } */
    get date(): object;
    /** Time object: { h, m, s } */
    get time(): object;
    /**
     * Returns a formatted string representation: `yyyy-MM-ddTHH:mm:ss.sss`
     */
    toString(): string;
    /**
     * Returns a formatted JSON-friendly object representation
     */
    toJson(): object;
    /**
     * Returns ISO-8601 formatted string.
     */
    toIso8601String(): string;
    /**
     * Returns true if this date is before the other.
     */
    isBefore(other: EtDatetime): boolean;
    /**
     * Returns true if this date is after the other.
     */
    isAfter(other: EtDatetime): boolean;
    /**
     * Returns true if this date is at the same moment as the other.
     */
    isAtSameMomentAs(other: EtDatetime): boolean;
    /**
     * Compares this instance with another EtDatetime.
     * Returns -1 if earlier, 1 if later, or 0 if equal.
     */
    compareTo(other: EtDatetime): number;
    /**
     * Adds a Duration to this date.
     */
    add(duration: Duration): EtDatetime;
    /**
     * Subtracts a Duration from this date.
     */
    subtract(duration: Duration): EtDatetime;
    /**
     * Returns the Duration between this and another EtDatetime.
     */
    difference(other: EtDatetime): Duration;
    /**
     * Gets the fixed date from Ethiopic calendar date.
     */
    private fixedFromEthiopic;
    /**
     * Gets the fixed date from Unix timestamp (in ms).
     */
    private fixedFromUnix;
    /**
     * Converts Ethiopic date-time to Unix epoch milliseconds.
     */
    private dateToEpoch;
    /**
     * Returns the weekday of the first day of the year.
     */
    private _yearFirstDay;
    /** Formats a year as 4-digit string (e.g., 2012) */
    private fourDigits;
    /** Formats a year as 6-digit string (for extreme years) */
    private sixDigits;
    /** Pads a number to 3 digits */
    private threeDigits;
    /** Pads a number to 2 digits */
    private twoDigits;
    /**
     * Converts various types to a number.
     * Throws if the type is invalid (symbol, object).
     */
    private toNumber;
    /** Returns the timestamp in milliseconds */
    valueOf(): number;
    /** Alias of `toIso8601String()` */
    toJSON(): string;
    /** Alias of `toIso8601String()` */
    toISOString(): string;
    /** Returns Ethiopic year */
    getFullYear(): number;
    /** Returns Ethiopic month (0-indexed) */
    getMonth(): number;
    /** Returns Ethiopic day */
    getDate(): number;
    /** Returns hour */
    getHours(): number;
    /** Returns minute */
    getMinutes(): number;
    /** Returns second */
    getSeconds(): number;
    /** Returns millisecond */
    getMilliseconds(): number;
    /**
     * Static method that returns the current EtDatetime.
     */
    static now(): EtDatetime;
    /** Customizes output of Object.prototype.toString.call() */
    get [Symbol.toStringTag](): string;
    /**
     * Enables primitive coercion:
     * - String context → ISO string
     * - Number context → timestamp
     */
    [Symbol.toPrimitive](hint: string | number | symbol): string | number;
    /**
     * Returns timestamp in ms (same as valueOf).
     */
    getTime(): number;
    /**
     * Converts EtDatetime to native JavaScript Date.
     */
    toDate(): Date;
    /**
     * Returns the day of the week (0–6), where 0 is Sunday and 6 is Saturday.
     * Equivalent to JavaScript Date.prototype.getDay().
     */
    getDay(): number;
    /**
     * Returns the day of the month (1–31) in UTC.
     * Equivalent to Date.prototype.getUTCDate().
     */
    getUTCDate(): number;
    /**
     * Returns the day of the week in UTC (0–6), where 0 is Sunday.
     * Equivalent to Date.prototype.getUTCDay().
     */
    getUTCDay(): number;
    /**
     * Returns the full year (e.g. 2024) in UTC.
     * Equivalent to Date.prototype.getUTCFullYear().
     */
    getUTCFullYear(): number;
    /**
     * Returns the month (0–11) in UTC.
     * Equivalent to Date.prototype.getUTCMonth().
     */
    getUTCMonth(): number;
    /**
     * Returns the hour (0–23) in UTC.
     * Equivalent to Date.prototype.getUTCHours().
     */
    getUTCHours(): number;
    /**
     * Returns the minute (0–59) in UTC.
     * Equivalent to Date.prototype.getUTCMinutes().
     */
    getUTCMinutes(): number;
    /**
     * Returns the second (0–59) in UTC.
     * Equivalent to Date.prototype.getUTCSeconds().
     */
    getUTCSeconds(): number;
    /**
     * Returns the milliseconds (0–999) in UTC.
     * Equivalent to Date.prototype.getUTCMilliseconds().
     */
    getUTCMilliseconds(): number;
    /**
     * Returns the year minus 1900 (e.g., 124 for 2024).
     * Deprecated in JavaScript, included here for compatibility.
     */
    getYear(): number;
    /**
     * Sets the year (offset from 1900), used for legacy JavaScript compatibility.
     * Equivalent to Date.prototype.setYear().
     * @param year A number representing the year minus 1900
     */
    setYear(year: number): void;
    /**
     * Sets the day of the month (1–30 for Ethiopian calendar).
     * @param day The day of the month to set.
     */
    setDate(day: number): void;
    /**
     * Sets the full Ethiopian year.
     * @param year The full year (e.g. 2016).
     */
    setFullYear(year: number): void;
    /**
     * Sets the Ethiopian month (0-indexed to match JavaScript Date).
     * @param month Zero-based month index (0 = Meskerem).
     */
    setMonth(month: number): void;
    /**
     * Sets the hour of the day (0–23).
     * @param hours The hour to set.
     */
    setHours(hours: number): void;
    /**
     * Sets the minute (0–59).
     * @param minutes The minute to set.
     */
    setMinutes(minutes: number): void;
    /**
     * Sets the second (0–59).
     * @param seconds The second to set.
     */
    setSeconds(seconds: number): void;
    /**
     * Sets the milliseconds (0–999).
     * @param ms The milliseconds to set.
     */
    setMilliseconds(ms: number): void;
    /**
     * Sets the timestamp (in milliseconds since the Unix epoch).
     * @param timestamp Milliseconds since epoch.
     */
    setTime(timestamp: number): void;
    /**
     * Sets the UTC day of the month.
     * @param day The UTC day to set.
     */
    setUTCDate(day: number): void;
    /**
     * Sets the UTC full year.
     * @param year The UTC year to set.
     */
    setUTCFullYear(year: number): void;
    /**
     * Sets the UTC hour.
     * @param hours The UTC hour to set.
     */
    setUTCHours(hours: number): void;
    /**
     * Sets the UTC minute.
     * @param minutes The UTC minutes to set.
     */
    setUTCMinutes(minutes: number): void;
    /**
     * Sets the UTC second.
     * @param seconds The UTC seconds to set.
     */
    setUTCSeconds(seconds: number): void;
    /**
     * Sets the UTC milliseconds.
     * @param ms The UTC milliseconds to set.
     */
    setUTCMilliseconds(ms: number): void;
    /**
     * Sets the UTC month (0–11).
     * @param month The UTC month to set.
     */
    setUTCMonth(month: number): void;
    /**
     * Updates internal `fixed` and `moment` values from full date-time components.
     *
     * @param year Ethiopian year
     * @param month Ethiopian month (1–13)
     * @param day Ethiopian day of month (1–30)
     * @param hour Hour (0–23)
     * @param minute Minute (0–59)
     * @param second Second (0–59)
     * @param millisecond Millisecond (0–999)
     */
    private _updateFromComponents;
    /**
     * Returns a human-readable date string using system locale.
     * Equivalent to Date.prototype.toDateString().
     */
    toDateString(): string;
    /**
     * Returns a human-readable time string using system locale.
     * Equivalent to Date.prototype.toTimeString().
     */
    toTimeString(): string;
    /**
     * Returns a UTC date-time string.
     * Equivalent to Date.prototype.toUTCString().
     */
    toUTCString(): string;
    /**
     * Returns a locale-sensitive string representation of the date and time.
     * Equivalent to Date.prototype.toLocaleString().
     */
    toLocaleString(): string;
    /**
     * Returns a locale-sensitive string of just the date portion.
     * Equivalent to Date.prototype.toLocaleDateString().
     */
    toLocaleDateString(): string;
    /**
     * Returns a locale-sensitive string of just the time portion.
     * Equivalent to Date.prototype.toLocaleTimeString().
     */
    toLocaleTimeString(): string;
    /**
     * Returns a Temporal.Instant object representing this date-time.
     * Requires Temporal API (ES2024) or @js-temporal/polyfill.
     */
    toTemporalInstant(): Temporal.Instant;
}
export default EtDatetime;
