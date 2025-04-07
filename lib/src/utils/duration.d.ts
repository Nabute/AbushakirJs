/**
 * An object with optional named parameters for constructing a Duration instance.
 */
interface DurationNamedParams {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
}
/**
 * The Duration class represents an immutable span of time in microseconds.
 * It provides various constructors and utility methods to manipulate and compare durations.
 */
declare class Duration {
    private static readonly MICROSECONDS_PER_MILLISECOND;
    private static readonly MICROSECONDS_PER_SECOND;
    private static readonly MICROSECONDS_PER_MINUTE;
    private static readonly MICROSECONDS_PER_HOUR;
    private static readonly MICROSECONDS_PER_DAY;
    private static readonly MILLISECONDS_PER_SECOND;
    private static readonly MILLISECONDS_PER_MINUTE;
    private static readonly MILLISECONDS_PER_HOUR;
    private static readonly MILLISECONDS_PER_DAY;
    private static readonly SECONDS_PER_MINUTE;
    private static readonly SECONDS_PER_HOUR;
    private static readonly SECONDS_PER_DAY;
    private static readonly MINUTES_PER_HOUR;
    private static readonly MINUTES_PER_DAY;
    /** Internal duration value in microseconds (immutable) */
    private readonly duration;
    /**
     * Constructs a new Duration.
     * Accepts either:
     * - A single object with named time units: `{ hours: 1, minutes: 30 }`, or
     * - A list of up to 6 numbers in the order: days, hours, minutes, seconds, milliseconds, microseconds.
     *
     * @param args Either a DurationNamedParams object or a list of numbers
     */
    constructor(paramsOrMicroseconds: DurationNamedParams | number);
    constructor(...positional: number[]);
    /**
     * Computes the total microseconds from a list of positional arguments.
     *
     * @param args Array of positional arguments [days, hours, minutes, seconds, milliseconds, microseconds]
     * @returns Total duration in microseconds
     */
    private computeDuration;
    private toNumber;
    /**
     * Computes the total microseconds from a named parameters object.
     *
     * @param params Object with named time values
     * @returns Total duration in microseconds
     */
    private computeFromNamedParams;
    /**
     * Gets the raw duration value in microseconds.
     */
    get millisecondDuration(): number;
    /** Absolute duration in days */
    get inDays(): number;
    /** Absolute duration in hours */
    get inHours(): number;
    /** Absolute duration in minutes */
    get inMinutes(): number;
    /** Absolute duration in seconds */
    get inSeconds(): number;
    /** Absolute duration in milliseconds */
    get inMilliseconds(): number;
    /** Raw duration in microseconds */
    get inMicroseconds(): number;
    /** Indicates whether the duration is negative */
    get isNegative(): boolean;
    /** Returns the absolute value of this duration */
    abs(): Duration;
    /** Returns a new Duration that is the sum of this and another Duration */
    add(other: Duration): Duration;
    /** Returns a new Duration that is the difference between this and another Duration */
    subtract(other: Duration): Duration;
    /** Multiplies the duration by a numeric factor */
    multiply(factor: number): Duration;
    /** Divides the duration by a numeric quotient */
    divide(quotient: number): Duration;
    /** Returns true if this Duration is greater than another */
    gt(other: Duration): boolean;
    /** Returns true if this Duration is greater than or equal to another */
    gte(other: Duration): boolean;
    /** Returns true if this Duration is less than another */
    lt(other: Duration): boolean;
    /** Returns true if this Duration is less than or equal to another */
    lte(other: Duration): boolean;
    /** Returns true if this Duration is equal to another */
    equal(other: Duration): boolean;
    /** Compares this Duration to another (-1, 0, 1) */
    compareTo(other: Duration): number;
    /**
     * Returns a string in the format `HH:mm:ss.microseconds`
     */
    toString(): string;
    /**
     * Pads a number with leading zeros to ensure 6 digits.
     *
     * @param n Microseconds
     */
    private sixDigits;
    /**
     * Pads a number with leading zeros to ensure 2 digits.
     *
     * @param n Number to format
     */
    private twoDigits;
    /** Returns the microsecond value for numeric operations */
    valueOf(): number;
    /** Serializes this duration as a formatted string */
    toJSON(): string;
    /** Overrides default [object Object] behavior */
    get [Symbol.toStringTag](): string;
}
export default Duration;
