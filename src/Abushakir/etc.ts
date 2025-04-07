// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

import { Calendar } from '../Interfaces/Calendar';
import EtDatetime from '../Abushakir/datetime';
import { constants } from '../utils/constants';

/**
 * Ethiopian Calendar implementation.
 */
export default class ETC implements Calendar {
  private _date: EtDatetime;

  /**
   * Creates an instance of the Ethiopian Calendar.
   * @param args - Year, month, and day values (up to 3 arguments).
   * @throws {Error} - If the number of arguments is not between 1 and 3.
   */
  constructor(...args: any[]) {
    if (args.length === 3) {
      this._date = new EtDatetime(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
    } else if (args.length === 2) {
      this._date = new EtDatetime(this.toNumber(args[0]), this.toNumber(args[1]), 1);
    } else if (args.length === 1) {
      this._date = new EtDatetime(this.toNumber(args[0]), 1, 1);
    } else {
      throw new Error(`ARGUMENT ERROR: Expected up to 3 arguments, ${args.length} given.`);
    }
  }

  /**
   * Gets the year of the Ethiopian Calendar.
   */
  get year(): number {
    return this._date.year;
  }

  /**
   * Gets the month of the Ethiopian Calendar.
   */
  get month(): number {
    return this._date.month;
  }

  /**
   * Gets the day of the Ethiopian Calendar.
   */
  get day(): number {
    return this._date.day;
  }

  /**
   * Gets the month name in the Ethiopian Calendar.
   */
  get monthName(): string {
    return this._date.monthGeez;
  }

  /**
   * Gets an array of all months in the Ethiopian Calendar.
   */
  get allMonths(): string[] {
    return constants._months;
  }

  /**
   * Gets an array of day numbers in the Ethiopian Calendar.
   */
  get dayNumbers(): string[] {
    return constants._dayNumbers;
  }

  /**
   * Gets an array of weekday names in the Ethiopian Calendar.
   */
  get weekdays(): string[] {
    return constants._weekdays;
  }

  /**
   * Gets the next month in the Ethiopian Calendar.
   */
  get nextMonth(): ETC {
    return new ETC(this._date.year, this._date.month + 1);
  }

  /**
   * Gets the previous month in the Ethiopian Calendar.
   */
  get prevMonth(): ETC {
    const newYear = this._date.month === 1 ? this._date.year - 1 : this._date.year;
    const newMonth = this._date.month - 1 === 0 ? 13 : this._date.month - 1;
    return new ETC(newYear, newMonth);
  }

  /**
   * Gets the next year in the Ethiopian Calendar.
   */
  get nextYear(): ETC {
    return new ETC(this._date.year + 1, this._date.month);
  }

  /**
   * Gets the previous year in the Ethiopian Calendar.
   */
  get prevYear(): ETC {
    return new ETC(this._date.year - 1, this._date.month);
  }

  /**
   * Gets an array of days in the current month.
   * @param geezDay - If true, includes the Geez day numbers.
   * @param weekDayName - If true, includes the weekday names.
   * @returns An array of days in the current month.
   */
  monthDays(geezDay: boolean = false, weekDayName: boolean = false): any[] {
    let monthBeginning: number = this._monthRange()[0];
    const daysInMonth: number = this._monthRange()[1];
    const result: any[] = [];

    for (let i = 0; i < daysInMonth; i++) {
      const day = geezDay ? constants._dayNumbers[i] : i + 1;
      const entry = [
        this._date.year,
        this._date.month,
        day,
        weekDayName ? constants._weekdays[monthBeginning] : monthBeginning,
      ];
      result.push(entry);
      monthBeginning = (monthBeginning + 1) % 7;
    }

    return result;
  }

  /**
   * Gets an array of days in the entire year.
   * @param geezDay - If true, includes the Geez day numbers.
   * @param weekDayName - If true, includes the weekday names.
   * @returns An array of days in the entire year.
   */
  yearDays(geezDay: boolean = false, weekDayName: boolean = false): any[] {
    const result: any[] = [];
    for (let i = 0; i < constants._months.length; i++) {
      result.push(this._monthDays(this._date.year, i + 1, geezDay, weekDayName));
    }
    return result;
  }

  /**
   * Sets the date to the current system date.
   */
  today() {
    this._date = new EtDatetime(Date.now());
  }

  private _monthRange(): number[] {
    if (this._date.month < 1 || this._date.month > 13) {
      throw new Error('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
    }
    return [this._date.weekday, this._date.month === 13 ? (this._date.isLeap ? 6 : 5) : 30];
  }

  private _monthDays(year: number, month: number, geezDay: boolean, weekDayName: boolean): any[] {
    const yr = new EtDatetime(year, month);
    let monthBeginning: number = yr.weekday;
    const daysInMonth: number = yr.month === 13 ? (yr.isLeap ? 6 : 5) : 30;
    const result: any[] = [];

    for (let i = 0; i < daysInMonth; i++) {
      const day = geezDay ? constants._dayNumbers[i] : i + 1;
      const entry = [year, month, day, weekDayName ? constants._weekdays[monthBeginning] : monthBeginning];
      result.push(entry);
      monthBeginning = (monthBeginning + 1) % 7;
    }

    return result;
  }

  private toNumber(value: any): number {
    if (value === undefined) return NaN;
    if (value === null) return 0;

    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }

    if (typeof value === 'string') {
      return parseInt(value, 10);
    }

    if (typeof value === 'symbol') {
      throw new Error('TYPE ERROR: Unexpected operand type.');
    }

    if (typeof value === 'object') {
      throw new Error('TYPE ERROR: Unexpected operand type.');
    }

    return value;
  }
}
