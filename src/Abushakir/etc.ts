//
import { Calendar } from '../Interfaces/Calendar';
import EtDatetime from '../Abushakir/datetime';
import { constants } from '../utils/constants';

export default class ETC implements Calendar {
  private _date: EtDatetime;

  constructor(...args: any[]) {
    this._date = new EtDatetime(args[0], args[1], args[2]);
    // handle argument errors ( maximum of 3 arguments)
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

  get monthName(): String {
    return this._date.monthGeez;
  }

  get allMonths(): Array<String> {
    return constants._months;
  }

  get dayNumbers(): Array<String> {
    return constants._dayNumbers;
  }

  get weekdays(): Array<String> {
    return constants._weekdays;
  }

  get nextMonth(): ETC {
    return new ETC(this._date.year, this._date.month + 1);
  }

  get prevMonth(): ETC {
    return new ETC(
      this._date.month == 1 ? this._date.year - 1 : this._date.year,
      this._date.month - 1 == 0 ? 13 : this._date.month - 1,
    );
  }

  get nextYear(): ETC {
    return new ETC(this._date.year + 1, this._date.month);
  }

  get prevYear(): ETC {
    return new ETC(this._date.year - 1, this._date.month);
  }

  private _monthRange(): Array<number> {
    if (this._date.month <= 1 && this._date.month >= 13)
      throw new Error('MONTHNUMBER ERROR: Month number should be between 1 and 13.');
    return [this._date.weekday, this._date.month == 13 ? (this._date.isLeap ? 6 : 5) : 30];
  }

  private _monthDays(year: number, month: number, geezDay: boolean, weekDayName: boolean): Array<any> {
    var yr = new EtDatetime(year, month);
    var monthBeginning: number = yr.weekday;
    var daysInMonth: number = yr.month == 13 ? (yr.isLeap ? 6 : 5) : 30;
    var result: Array<any> = [];
    for (var i = 0; i < daysInMonth; i++) {
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

  monthDays(geezDay: boolean = false, weekDayName: boolean = false): Array<any> {
    var monthBeginning: number = this._monthRange()[0];
    var daysInMonth: number = this._monthRange()[1];
    var result: Array<any> = [];
    for (var i = 0; i < daysInMonth; i++) {
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

  yearDays(geezDay: boolean = false, weekDayName: boolean = false): Array<any> {
    var result: Array<any> = [];
    for (var i = 0; i < constants._months.length; i++) {
      result.push(this._monthDays(this._date.year, i + 1, geezDay, weekDayName));
    }
    return result;
  }

  today() {
    this._date = new EtDatetime(Date.now());
  }
}
