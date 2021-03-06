// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

import { Calendar } from '../Interfaces/Calendar';
import EtDatetime from '../Abushakir/datetime';
import { constants } from '../utils/constants';

export default class ETC implements Calendar {
  private _date: EtDatetime;

  constructor(...args: any[]) {
    if (args.length === 3) {
      this._date = new EtDatetime(this.toNumber(args[0]), this.toNumber(args[1]), this.toNumber(args[2]));
    } else if (args.length === 2) {
      this._date = new EtDatetime(this.toNumber(args[0]), this.toNumber(args[1]), 1);
    } else if (args.length === 1) {
      this._date = new EtDatetime(this.toNumber(args[0]), 1, 1);
    } else throw new Error(`ARGUMENT ERROR: Expected upto 3 arguments, ${args.length} given.`);
  }

  get year(): number {
    return this._date.year;
  }

  get month(): number {
    return this._date.month;
  }

  get day(): number {
    return this._date.day;
  }

  get monthName(): string {
    return this._date.monthGeez;
  }

  get allMonths(): string[] {
    return constants._months;
  }

  get dayNumbers(): string[] {
    return constants._dayNumbers;
  }

  get weekdays(): string[] {
    return constants._weekdays;
  }

  get nextMonth(): ETC {
    return new ETC(this._date.year, this._date.month + 1);
  }

  get prevMonth(): ETC {
    return new ETC(
      this._date.month === 1 ? this._date.year - 1 : this._date.year,
      this._date.month - 1 === 0 ? 13 : this._date.month - 1,
    );
  }

  get nextYear(): ETC {
    return new ETC(this._date.year + 1, this._date.month);
  }

  get prevYear(): ETC {
    return new ETC(this._date.year - 1, this._date.month);
  }

  monthDays(geezDay: boolean = false, weekDayName: boolean = false): any[] {
    let monthBeginning: number = this._monthRange()[0];
    const daysInMonth: number = this._monthRange()[1];
    const result: any[] = [];
    for (let i = 0; i < daysInMonth; i++) {
      if (geezDay) {
        result.push([
          this._date.year,
          this._date.month,
          constants._dayNumbers[i],
          weekDayName ? constants._weekdays[monthBeginning] : monthBeginning,
        ]);
      } else
        result.push([
          this._date.year,
          this._date.month,
          i + 1,
          weekDayName ? constants._weekdays[monthBeginning] : monthBeginning,
        ]);
      monthBeginning = (monthBeginning + 1) % 7;
    }
    return result;
  }

  yearDays(geezDay: boolean = false, weekDayName: boolean = false): any[] {
    const result: any[] = [];
    for (let i = 0; i < constants._months.length; i++) {
      result.push(this._monthDays(this._date.year, i + 1, geezDay, weekDayName));
    }
    return result;
  }

  today() {
    this._date = new EtDatetime(Date.now());
  }

  private _monthRange(): number[] {
    if (this._date.month <= 1 && this._date.month >= 13)
      throw new Error('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
    return [this._date.weekday, this._date.month === 13 ? (this._date.isLeap ? 6 : 5) : 30];
  }

  private _monthDays(year: number, month: number, geezDay: boolean, weekDayName: boolean): any[] {
    const yr = new EtDatetime(year, month);
    let monthBeginning: number = yr.weekday;
    const daysInMonth: number = yr.month === 13 ? (yr.isLeap ? 6 : 5) : 30;
    const result: any[] = [];
    for (let i = 0; i < daysInMonth; i++) {
      if (geezDay) {
        result.push([
          year,
          month,
          constants._dayNumbers[i],
          weekDayName ? constants._weekdays[monthBeginning] : monthBeginning,
        ]);
      } else result.push([year, month, i + 1, weekDayName ? constants._weekdays[monthBeginning] : monthBeginning]);
      monthBeginning = (monthBeginning + 1) % 7;
    }
    return result;
  }

  private toNumber(value: any): number {
    if (value === undefined) return NaN;
    if (value === null) return 0;
    if (typeof value === 'boolean') {
      if (value) return 1;
      else return 0;
    }
    if (typeof value === 'string') return parseInt(value, 10);
    if (typeof value === 'symbol') throw new Error('TYPE ERROR: Unexpected operand type.');
    if (typeof value === 'object') throw new Error('TYPE ERROR: Unexpected operand type.');
    return value;
  }
}
