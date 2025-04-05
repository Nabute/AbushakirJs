// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

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
class Duration {
  // --- Static unit conversion factors (to prevent access-before-initialization bugs) ---

  private static readonly MICROSECONDS_PER_MILLISECOND = 1000;
  private static readonly MICROSECONDS_PER_SECOND = 1_000_000;
  private static readonly MICROSECONDS_PER_MINUTE = 60 * Duration.MICROSECONDS_PER_SECOND;
  private static readonly MICROSECONDS_PER_HOUR = 60 * Duration.MICROSECONDS_PER_MINUTE;
  private static readonly MICROSECONDS_PER_DAY = 24 * Duration.MICROSECONDS_PER_HOUR;

  private static readonly MILLISECONDS_PER_SECOND = 1000;
  private static readonly MILLISECONDS_PER_MINUTE = 60 * 1000;
  private static readonly MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
  private static readonly MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

  private static readonly SECONDS_PER_MINUTE = 60;
  private static readonly SECONDS_PER_HOUR = 60 * 60;
  private static readonly SECONDS_PER_DAY = 24 * 60 * 60;

  private static readonly MINUTES_PER_HOUR = 60;
  private static readonly MINUTES_PER_DAY = 24 * 60;

  /** Internal duration value in microseconds (immutable) */
  private readonly duration: number;

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
  constructor(...args: any[]) {
    if (args.length === 1 && typeof args[0] === 'object' && !Array.isArray(args[0])) {
      // Named parameter form
      this.duration = this.computeFromNamedParams(args[0] as DurationNamedParams);
    } else if (args.length === 1 && typeof args[0] === 'number') {
      // Raw microseconds
      this.duration = args[0];
    } else if (
      args.length > 1 &&
      args.length <= 6 &&
      args.every((arg: any) => typeof arg === 'number' || arg === undefined || arg === null)
    ) {
      // Positional form: [days, hours, minutes, seconds, milliseconds, microseconds]
      this.duration = this.computeDuration(args);
    } else {
      throw new Error('ARGUMENT ERROR: Invalid constructor usage.');
    }
  }

  /**
   * Computes the total microseconds from a list of positional arguments.
   *
   * @param args Array of positional arguments [days, hours, minutes, seconds, milliseconds, microseconds]
   * @returns Total duration in microseconds
   */
  private computeDuration(args: any[]): number {
    const [days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0] = args;

    return (
      Duration.MICROSECONDS_PER_DAY * this.toNumber(days) +
      Duration.MICROSECONDS_PER_HOUR * this.toNumber(hours) +
      Duration.MICROSECONDS_PER_MINUTE * this.toNumber(minutes) +
      Duration.MICROSECONDS_PER_SECOND * this.toNumber(seconds) +
      Duration.MICROSECONDS_PER_MILLISECOND * this.toNumber(milliseconds) +
      this.toNumber(microseconds)
    );
  }

  private toNumber(value: any): number {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    throw new Error(`Invalid input value: ${value}`);
  }

  /**
   * Computes the total microseconds from a named parameters object.
   *
   * @param params Object with named time values
   * @returns Total duration in microseconds
   */
  private computeFromNamedParams(params: DurationNamedParams): number {
    const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0 } = params;

    return (
      days * Duration.MICROSECONDS_PER_DAY +
      hours * Duration.MICROSECONDS_PER_HOUR +
      minutes * Duration.MICROSECONDS_PER_MINUTE +
      seconds * Duration.MICROSECONDS_PER_SECOND +
      milliseconds * Duration.MICROSECONDS_PER_MILLISECOND +
      microseconds
    );
  }

  /**
   * Gets the raw duration value in microseconds.
   */
  get millisecondDuration(): number {
    return this.duration;
  }

  /** Absolute duration in days */
  get inDays(): number {
    return Math.abs(this.duration / Duration.MICROSECONDS_PER_DAY);
  }

  /** Absolute duration in hours */
  get inHours(): number {
    return Math.abs(this.duration / Duration.MICROSECONDS_PER_HOUR);
  }

  /** Absolute duration in minutes */
  get inMinutes(): number {
    return Math.abs(this.duration / Duration.MICROSECONDS_PER_MINUTE);
  }

  /** Absolute duration in seconds */
  get inSeconds(): number {
    return Math.abs(this.duration / Duration.MICROSECONDS_PER_SECOND);
  }

  /** Absolute duration in milliseconds */
  get inMilliseconds(): number {
    return Math.abs(this.duration / Duration.MICROSECONDS_PER_MILLISECOND);
  }

  /** Raw duration in microseconds */
  get inMicroseconds(): number {
    return this.duration;
  }

  /** Indicates whether the duration is negative */
  get isNegative(): boolean {
    return this.duration < 0;
  }

  /** Returns the absolute value of this duration */
  abs(): Duration {
    return new Duration(Math.abs(this.duration));
  }

  /** Returns a new Duration that is the sum of this and another Duration */
  add(other: Duration): Duration {
    return new Duration(this.duration + other.millisecondDuration);
  }

  /** Returns a new Duration that is the difference between this and another Duration */
  subtract(other: Duration): Duration {
    return new Duration(this.duration - other.millisecondDuration);
  }

  /** Multiplies the duration by a numeric factor */
  multiply(factor: number): Duration {
    return new Duration(Math.round(this.duration * factor));
  }

  /** Divides the duration by a numeric quotient */
  divide(quotient: number): Duration {
    if (quotient === 0) throw new Error('INTEGERDIVISIONBYZERO: Integer can not be divided by zero.');
    return new Duration(Math.floor(this.duration / quotient));
  }

  /** Returns true if this Duration is greater than another */
  gt(other: Duration): boolean {
    return this.duration > other.millisecondDuration;
  }

  /** Returns true if this Duration is greater than or equal to another */
  gte(other: Duration): boolean {
    return this.duration >= other.millisecondDuration;
  }

  /** Returns true if this Duration is less than another */
  lt(other: Duration): boolean {
    return this.duration < other.millisecondDuration;
  }

  /** Returns true if this Duration is less than or equal to another */
  lte(other: Duration): boolean {
    return this.duration <= other.millisecondDuration;
  }

  /** Returns true if this Duration is equal to another */
  equal(other: Duration): boolean {
    return this.duration === other.inMicroseconds;
  }

  /** Compares this Duration to another (-1, 0, 1) */
  compareTo(other: Duration): number {
    if (this.lt(other)) return -1;
    if (this.equal(other)) return 0;
    return 1;
  }

  /**
   * Returns a string in the format `HH:mm:ss.microseconds`
   */
  toString(): string {
    const totalMicro = Math.abs(this.inMicroseconds);
    const totalMillis = Math.floor(totalMicro / 1000);

    const hours = Math.floor(totalMillis / Duration.MILLISECONDS_PER_HOUR);
    const minutes = Math.floor((totalMillis % Duration.MILLISECONDS_PER_HOUR) / Duration.MILLISECONDS_PER_MINUTE);
    const seconds = Math.floor((totalMillis % Duration.MILLISECONDS_PER_MINUTE) / Duration.MILLISECONDS_PER_SECOND);
    const microseconds = totalMicro % Duration.MICROSECONDS_PER_SECOND;

    const sign = this.isNegative ? '-' : '';

    return `${sign}${this.twoDigits(hours)}:${this.twoDigits(minutes)}:${this.twoDigits(seconds)}.${this.sixDigits(
      microseconds,
    )}`;
  }

  /**
   * Pads a number with leading zeros to ensure 6 digits.
   *
   * @param n Microseconds
   */
  private sixDigits(n: number): string {
    return n.toString().padStart(6, '0');
  }

  /**
   * Pads a number with leading zeros to ensure 2 digits.
   *
   * @param n Number to format
   */
  private twoDigits(n: number): string {
    return n.toString().padStart(2, '0');
  }

  /** Returns the microsecond value for numeric operations */
  valueOf(): number {
    return this.duration;
  }

  /** Serializes this duration as a formatted string */
  toJSON(): string {
    return this.toString();
  }

  /** Overrides default [object Object] behavior */
  get [Symbol.toStringTag]() {
    return 'Duration';
  }
}

export default Duration;
