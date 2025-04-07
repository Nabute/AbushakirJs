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
}
export default EtDatetime;
