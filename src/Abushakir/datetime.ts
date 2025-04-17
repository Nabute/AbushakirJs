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
import { Temporal } from '@js-temporal/polyfill';

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
    if (Math.abs(millisecondsSinceEpoch) >= constants.maxMillisecondsSinceEpoch)
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
    if (typeof value === 'symbol' || typeof value === 'object') throw new Error('TYPE ERROR: Unexpected operand type.');
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

  /**
   * Returns the day of the week (0–6), where 0 is Sunday and 6 is Saturday.
   * Equivalent to JavaScript Date.prototype.getDay().
   */
  getDay(): number {
    return this.weekday;
  }

  /**
   * Returns the day of the month (1–31) in UTC.
   * Equivalent to Date.prototype.getUTCDate().
   */
  getUTCDate(): number {
    return new Date(this.moment).getUTCDate();
  }

  /**
   * Returns the day of the week in UTC (0–6), where 0 is Sunday.
   * Equivalent to Date.prototype.getUTCDay().
   */
  getUTCDay(): number {
    return new Date(this.moment).getUTCDay();
  }

  /**
   * Returns the full year (e.g. 2024) in UTC.
   * Equivalent to Date.prototype.getUTCFullYear().
   */
  getUTCFullYear(): number {
    return new Date(this.moment).getUTCFullYear();
  }

  /**
   * Returns the month (0–11) in UTC.
   * Equivalent to Date.prototype.getUTCMonth().
   */
  getUTCMonth(): number {
    return new Date(this.moment).getUTCMonth();
  }

  /**
   * Returns the hour (0–23) in UTC.
   * Equivalent to Date.prototype.getUTCHours().
   */
  getUTCHours(): number {
    return new Date(this.moment).getUTCHours();
  }

  /**
   * Returns the minute (0–59) in UTC.
   * Equivalent to Date.prototype.getUTCMinutes().
   */
  getUTCMinutes(): number {
    return new Date(this.moment).getUTCMinutes();
  }

  /**
   * Returns the second (0–59) in UTC.
   * Equivalent to Date.prototype.getUTCSeconds().
   */
  getUTCSeconds(): number {
    return new Date(this.moment).getUTCSeconds();
  }

  /**
   * Returns the milliseconds (0–999) in UTC.
   * Equivalent to Date.prototype.getUTCMilliseconds().
   */
  getUTCMilliseconds(): number {
    return new Date(this.moment).getUTCMilliseconds();
  }

  /**
   * Returns the year minus 1900 (e.g., 124 for 2024).
   * Deprecated in JavaScript, included here for compatibility.
   */
  getYear(): number {
    return this.getFullYear() - 1900;
  }


  /**
   * Sets the year (offset from 1900), used for legacy JavaScript compatibility.
   * Equivalent to Date.prototype.setYear().
   * @param year A number representing the year minus 1900
   */
  setYear(year: number): void {
    this.setFullYear(year + 1900);
  }

  /**
   * Sets the day of the month (1–30 for Ethiopian calendar).
   * @param day The day of the month to set.
   */
  setDate(day: number): void {
    const { year, month } = this;
    this._updateFromComponents(year, month, day, this.hour, this.minute, this.second, this.millisecond);
  }

  /**
   * Sets the full Ethiopian year.
   * @param year The full year (e.g. 2016).
   */
  setFullYear(year: number): void {
    this._updateFromComponents(year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
  }

  /**
   * Sets the Ethiopian month (0-indexed to match JavaScript Date).
   * @param month Zero-based month index (0 = Meskerem).
   */
  setMonth(month: number): void {
    this._updateFromComponents(this.year, month + 1, this.day, this.hour, this.minute, this.second, this.millisecond);
  }

  /**
   * Sets the hour of the day (0–23).
   * @param hours The hour to set.
   */
  setHours(hours: number): void {
    this._updateFromComponents(this.year, this.month, this.day, hours, this.minute, this.second, this.millisecond);
  }

  /**
   * Sets the minute (0–59).
   * @param minutes The minute to set.
   */
  setMinutes(minutes: number): void {
    this._updateFromComponents(this.year, this.month, this.day, this.hour, minutes, this.second, this.millisecond);
  }

  /**
   * Sets the second (0–59).
   * @param seconds The second to set.
   */
  setSeconds(seconds: number): void {
    this._updateFromComponents(this.year, this.month, this.day, this.hour, this.minute, seconds, this.millisecond);
  }

  /**
   * Sets the milliseconds (0–999).
   * @param ms The milliseconds to set.
   */
  setMilliseconds(ms: number): void {
    this._updateFromComponents(this.year, this.month, this.day, this.hour, this.minute, this.second, ms);
  }

  /**
   * Sets the timestamp (in milliseconds since the Unix epoch).
   * @param timestamp Milliseconds since epoch.
   */
  setTime(timestamp: number): void {
    this.fromMillisecondsSinceEpoch(timestamp);
  }

  /**
   * Sets the UTC day of the month.
   * @param day The UTC day to set.
   */
  setUTCDate(day: number): void {
    const d = new Date(this.moment);
    d.setUTCDate(day);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

  /**
   * Sets the UTC full year.
   * @param year The UTC year to set.
   */
  setUTCFullYear(year: number): void {
    const d = new Date(this.moment);
    d.setUTCFullYear(year);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

  /**
   * Sets the UTC hour.
   * @param hours The UTC hour to set.
   */
  setUTCHours(hours: number): void {
    const d = new Date(this.moment);
    d.setUTCHours(hours);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

  /**
   * Sets the UTC minute.
   * @param minutes The UTC minutes to set.
   */
  setUTCMinutes(minutes: number): void {
    const d = new Date(this.moment);
    d.setUTCMinutes(minutes);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

  /**
   * Sets the UTC second.
   * @param seconds The UTC seconds to set.
   */
  setUTCSeconds(seconds: number): void {
    const d = new Date(this.moment);
    d.setUTCSeconds(seconds);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

  /**
   * Sets the UTC milliseconds.
   * @param ms The UTC milliseconds to set.
   */
  setUTCMilliseconds(ms: number): void {
    const d = new Date(this.moment);
    d.setUTCMilliseconds(ms);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

  /**
   * Sets the UTC month (0–11).
   * @param month The UTC month to set.
   */
  setUTCMonth(month: number): void {
    const d = new Date(this.moment);
    d.setUTCMonth(month);
    this.fromMillisecondsSinceEpoch(d.getTime());
  }

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
  private _updateFromComponents(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number
  ): void {
    this.fixed = this.fixedFromEthiopic(year, month, day);
    this.moment = this.dateToEpoch(year, month, day, hour, minute, second, millisecond);
  }

  /**
   * Returns a human-readable date string using system locale.
   * Equivalent to Date.prototype.toDateString().
   */
  toDateString(): string {
    return this.toDate().toDateString();
  }

  /**
   * Returns a human-readable time string using system locale.
   * Equivalent to Date.prototype.toTimeString().
   */
  toTimeString(): string {
    return this.toDate().toTimeString();
  }

  /**
   * Returns a UTC date-time string.
   * Equivalent to Date.prototype.toUTCString().
   */
  toUTCString(): string {
    return this.toDate().toUTCString();
  }

  /**
   * Returns a locale-sensitive string representation of the date and time.
   * Equivalent to Date.prototype.toLocaleString().
   */
  toLocaleString(): string {
    return this.toDate().toLocaleString();
  }

  /**
   * Returns a locale-sensitive string of just the date portion.
   * Equivalent to Date.prototype.toLocaleDateString().
   */
  toLocaleDateString(): string {
    return this.toDate().toLocaleDateString();
  }

  /**
   * Returns a locale-sensitive string of just the time portion.
   * Equivalent to Date.prototype.toLocaleTimeString().
   */
  toLocaleTimeString(): string {
    return this.toDate().toLocaleTimeString();
  }

  /**
   * Returns a Temporal.Instant object representing this date-time.
   * Requires Temporal API (ES2024) or @js-temporal/polyfill.
   */
  toTemporalInstant(): Temporal.Instant {
    return Temporal.Instant.fromEpochMilliseconds(this.moment);
  }

}

export default EtDatetime;
