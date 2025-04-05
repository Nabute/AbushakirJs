// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

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
import { constants } from '../utils/constants';
import Duration from '../utils/duration';

class EtDatetime implements Datetime {
  /** Epoch-based timestamp in milliseconds (Unix) */
  moment!: number;

  /** Ethiopic fixed date representation */
  fixed!: number;

  /**
   * Constructs an EtDatetime instance.
   * 
   * @param args Either:
   *  - No arguments → initializes to current time
   *  - One number → milliseconds since Unix epoch OR Ethiopic year
   *  - Multiple positional Ethiopic components: (year, month, day, hour?, minute?, second?, millisecond?)
   */
  constructor(...args: any[]) {
    if (args.length >= 2) {
      this.fixed = this.fixedFromEthiopic(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
      this.moment = this.dateToEpoch(
        this.toNumber(args[0]),
        this.toNumber(args[1]),
        this.toNumber(args[2]),
        this.toNumber(args[3]),
        this.toNumber(args[4]),
        this.toNumber(args[5]),
        this.toNumber(args[6]),
      );
      if (this.fixed === null) throw new Error('ARGUMENT ERROR: Unacceptable argument.');
    }

    if (args.length === 1) {
      const value: number = this.toNumber(args[0]);
      if (Math.abs(value) > 9999) {
        this.fromMillisecondsSinceEpoch(value);
      } else {
        this.fixed = this.fixedFromEthiopic(value, 1, 1);
        this.moment = this.dateToEpoch(value, 1, 1, 0, 0, 0, 0);
        if (this.fixed === null) throw new Error('ARGUMENT ERROR: Unacceptable argument.');
      }
    }

    if (args.length === 0) {
      this.fixed = this.fixedFromUnix(Date.now());
      this.moment = Date.now();
    }

    if (!this.fixed) {
      this.fixed = 0;
    }
  }

  /**
   * Sets the current datetime using a Unix timestamp in milliseconds.
   * 
   * @param millisecondsSinceEpoch Timestamp in milliseconds since the Unix epoch
   */
  fromMillisecondsSinceEpoch(millisecondsSinceEpoch: number): void {
    this.moment = millisecondsSinceEpoch;
    this.fixed = this.fixedFromUnix(millisecondsSinceEpoch);
    if (this.fixed === null) throw new Error('ARGUMENT ERROR: Unacceptable argument.');
    if (
      Math.abs(millisecondsSinceEpoch) >= constants.maxMillisecondsSinceEpoch
    )
      throw new Error(`Calendar outside valid range ${constants.maxMillisecondsSinceEpoch}`);
  }

  /**
   * Updates the EtDatetime to the current system time.
   */
  now(): void {
    this.fixed = this.fixedFromUnix(Date.now());
    this.moment = Date.now();
  }

  /** Ethiopic year */
  public get year(): number {
    return Math.floor((4 * (this.fixed - constants._ethiopicEpoch) + 1463) / 1461);
  }

  /** Ethiopic month (1-13) */
  public get month(): number {
    return Math.floor((this.fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1;
  }

  /** Ethiopic month name in Geez */
  public get monthGeez(): string {
    return constants._months[(this.month - 1) % 13];
  }

  /** Ethiopic day of the month (1-30) */
  public get day(): number {
    return this.fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
  }

  /** Day of the month in Geez numeral format */
  public get dayGeez(): string {
    return constants._dayNumbers[(this.day - 1) % 30];
  }

  /** Hour of the day (0-23) */
  public get hour(): number {
    return Math.floor(this.moment / constants.hourMilliSec) % 24;
  }

  /** Minute of the hour (0-59) */
  public get minute(): number {
    return Math.floor(this.moment / constants.minMilliSec) % 60;
  }

  /** Second of the minute (0-59) */
  public get second(): number {
    return Math.floor((this.moment / constants.secMilliSec) % 60);
  }

  /** Millisecond of the second (0-999) */
  public get millisecond(): number {
    return this.moment % 1000;
  }

  /** Whether this year is a leap year in the Ethiopian calendar */
  public get isLeap(): boolean {
    return this.year % 4 === 3;
  }

  /** The weekday index of the first day of the year (0-6, Sunday–Saturday) */
  get yearFirstDay(): number {
    return this._yearFirstDay();
  }

  /** Weekday index of the current date */
  get weekday(): number {
    return (this.yearFirstDay + (this.month - 1) * 2) % 7;
  }

  /** Date object: { year, month, day } */
  get date(): object {
    return { year: this.year, month: this.month, day: this.day };
  }

  /** Time object: { h, m, s } */
  get time(): object {
    return { h: this.hour, m: this.minute, s: this.second };
  }

  /**
   * Returns a formatted string representation: `yyyy-MM-ddTHH:mm:ss.sss`
   */
  toString(): string {
    return this.toIso8601String();
  }

  /**
   * Returns a formatted JSON-friendly object representation
   */
  toJson(): object {
    return {
      year: this.fourDigits(this.year),
      month: this.twoDigits(this.month),
      date: this.twoDigits(this.day),
      hour: this.twoDigits(this.hour),
      min: this.twoDigits(this.minute),
      sec: this.twoDigits(this.second),
      ms: this.threeDigits(this.millisecond),
    };
  }

  /**
   * Returns ISO-8601 formatted string.
   */
  toIso8601String(): string {
    const y: string = this.year >= -9999 && this.year <= 9999 ? this.fourDigits(this.year) : this.sixDigits(this.year);
    const m: string = this.twoDigits(this.month);
    const d: string = this.twoDigits(this.day);
    const h: string = this.twoDigits(this.hour);
    const min: string = this.twoDigits(this.minute);
    const sec: string = this.twoDigits(this.second);
    const ms: string = this.threeDigits(this.millisecond);
    return `${y}-${m}-${d}T${h}:${min}:${sec}.${ms}`;
  }

  /**
   * Returns true if this date is before the other.
   */
  isBefore(other: EtDatetime): boolean {
    return this.fixed < other.fixed || this.moment < other.moment;
  }

  /**
   * Returns true if this date is after the other.
   */
  isAfter(other: EtDatetime): boolean {
    return this.fixed > other.fixed || this.moment > other.moment;
  }

  /**
   * Returns true if this date is at the same moment as the other.
   */
  isAtSameMomentAs(other: EtDatetime): boolean {
    return this.fixed === other.fixed && this.moment === other.moment;
  }

  /**
   * Compares this instance with another EtDatetime.
   * Returns -1 if earlier, 1 if later, or 0 if equal.
   */
  compareTo(other: EtDatetime): number {
    if (this.isBefore(other)) return -1;
    else if (this.isAtSameMomentAs(other)) return 0;
    else return 1;
  }

  /**
   * Adds a Duration to this date.
   */
  add(duration: Duration): EtDatetime {
    return new EtDatetime(this.moment + duration.inMilliseconds);
  }

  /**
   * Subtracts a Duration from this date.
   */
  subtract(duration: Duration): EtDatetime {
    return new EtDatetime(this.moment - duration.inMilliseconds);
  }

  /**
   * Returns the Duration between this and another EtDatetime.
   */
  difference(other: EtDatetime): Duration {
    return new Duration(Math.abs(this.fixed - other.fixed), 0, 0, 0, 0, 0);
  }

  /**
   * Gets the fixed date from Ethiopic calendar date.
   */
  private fixedFromEthiopic(year: number, month: number, day: number): number {
    return Math.floor(constants._ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
  }

  /**
   * Gets the fixed date from Unix timestamp (in ms).
   */
  private fixedFromUnix(ms: number): number {
    return constants._unixEpoch + Math.floor(ms / 86400000);
  }

  /**
   * Converts Ethiopic date-time to Unix epoch milliseconds.
   */
  private dateToEpoch(
    year: number,
    month: number,
    date: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number,
  ): number {
    return (
      (this.fixedFromEthiopic(year, month, date) - constants._unixEpoch) * constants.dayMilliSec +
      (hour ? hour * constants.hourMilliSec : 0) +
      (minute ? minute * constants.minMilliSec : 0) +
      (second ? second * constants.secMilliSec : 0) +
      (millisecond ?? 0)
    );
  }

  /**
   * Returns the weekday of the first day of the year.
   */
  private _yearFirstDay(): number {
    const ameteAlem = constants.ameteFida + this.year;
    const rabeet = Math.floor(ameteAlem / 4);
    return (ameteAlem + rabeet) % 7;
  }

  /** Formats a year as 4-digit string (e.g., 2012) */
  private fourDigits(n: number): string {
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (abs >= 1000) return `${n}`;
    if (abs >= 100) return `${sign}0${abs}`;
    if (abs >= 10) return `${sign}00${abs}`;
    return `${sign}000${abs}`;
  }

  /** Formats a year as 6-digit string (for extreme years) */
  private sixDigits(n: number): string {
    if (n < -9999 || n > 9999) throw new Error('Year out of scope');
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '+';
    if (abs >= 100000) return `${sign}${abs}`;
    return `${sign}0${abs}`;
  }

  /** Pads a number to 3 digits */
  private threeDigits(n: number): string {
    if (n >= 100) return `${n}`;
    if (n >= 10) return `0${n}`;
    return `00${n}`;
  }

  /** Pads a number to 2 digits */
  private twoDigits(n: number): string {
    return n >= 10 ? `${n}` : `0${n}`;
  }

  /**
   * Converts various types to a number.
   * Throws if the type is invalid (symbol, object).
   */
  private toNumber(value: any): number {
    if (value === undefined) return NaN;
    if (value === null) return 0;
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'string') return parseInt(value, 10);
    if (typeof value === 'symbol' || typeof value === 'object')
      throw new Error('TYPE ERROR: Unexpected operand type.');
    return value;
  }

  /** Returns the timestamp in milliseconds */
  valueOf(): number {
    return this.moment;
  }

  /** Alias of `toIso8601String()` */
  toJSON(): string {
    return this.toIso8601String();
  }

  /** Alias of `toIso8601String()` */
  toISOString(): string {
    return this.toIso8601String();
  }

  /** Returns Ethiopic year */
  getFullYear(): number {
    return this.year;
  }

  /** Returns Ethiopic month (0-indexed) */
  getMonth(): number {
    return this.month - 1;
  }

  /** Returns Ethiopic day */
  getDate(): number {
    return this.day;
  }

  /** Returns hour */
  getHours(): number {
    return this.hour;
  }

  /** Returns minute */
  getMinutes(): number {
    return this.minute;
  }

  /** Returns second */
  getSeconds(): number {
    return this.second;
  }

  /** Returns millisecond */
  getMilliseconds(): number {
    return this.millisecond;
  }

  /**
   * Static method that returns the current EtDatetime.
   */
  static now(): EtDatetime {
    return new EtDatetime(Date.now());
  }

  /** Customizes output of Object.prototype.toString.call() */
  get [Symbol.toStringTag]() {
    return 'EtDatetime';
  }

  /**
   * Enables primitive coercion:
   * - String context → ISO string
   * - Number context → timestamp
   */
  [Symbol.toPrimitive](hint: string | number | symbol) {
    if (hint === 'string' || hint === 'default') return this.toISOString();
    if (hint === 'number') return this.valueOf();
    return this.toISOString();
  }

  /**
   * Returns timestamp in ms (same as valueOf).
   */
  getTime(): number {
    return this.valueOf();
  }

  /**
   * Converts EtDatetime to native JavaScript Date.
   */
  toDate(): Date {
    return new Date(this.moment);
  }
}

export default EtDatetime;
