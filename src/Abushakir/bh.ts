// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

import EtDatetime from './datetime';
import { constants } from '../utils/constants';

interface Tewsak {
  name: string;
  val: number;
}

export default class BahireHasab {
  private _year: number;

  constructor(year: number) {
    year < 0 ? (this._year = new EtDatetime(Date.now()).year) : (this._year = year);
  }

  get ameteAlem(): number {
    return constants.ameteFida + this._year;
  }

  getEvangelist(returnName: boolean = false): string {
    let evangelist: number;
    evangelist = this.ameteAlem % 4;
    if (returnName) {
      return constants.evangelists[evangelist];
    }
    return evangelist.toString();
  }

  getMeskeremOne(returnName: boolean = false) {
    const rabeet: number = Math.floor(this.ameteAlem / 4);
    const result: number = (this.ameteAlem + rabeet) % 7;
    if (returnName) return constants._weekdays[result];
    return result.toString();
  }

  get wenber(): number {
    return (this.ameteAlem % 19) - 1 < 0 ? 0 : (this.ameteAlem % 19) - 1;
  }

  get abekte(): number {
    return (this.wenber * constants.tinteAbekte) % 30;
  }

  get metkih(): number {
    return this.wenber === 0 ? 30 : (this.wenber * constants.tinteMetkih) % 30;
  }

  yebealeMetkihWer(): number {
    if (this.metkih > 14) {
      return 1;
    } else return 2;
  }

  get nenewe(): { month: string; date: number } {
    const meskerem1 = this.getMeskeremOne(true);
    const month = this.yebealeMetkihWer();
    let date;
    let dayTewsak: number = 0;

    for (const el of constants._yeeletTewsak) {
      if (el.name === constants._weekdays[(constants._weekdays.indexOf(meskerem1) + this.metkih - 1) % 7])
        dayTewsak = el.val;
    }

    let monthName: string = dayTewsak + this.metkih > 30 ? 'የካቲት' : 'ጥር';
    if (month === 2) {
      // ጥቅምት
      monthName = 'የካቲት';
      const tikimt1: string = constants._weekdays[(constants._weekdays.indexOf(meskerem1) + 2) % 7];
      const metkihElet: string = constants._weekdays[(constants._weekdays.indexOf(tikimt1) + this.metkih - 1) % 7];

      for (const al of constants._yeeletTewsak) {
        if (al.name === constants._weekdays[constants._weekdays.indexOf(metkihElet)]) dayTewsak = al.val;
      }
    }
    date = this.metkih + dayTewsak;
    return { month: monthName, date: date % 30 === 0 ? 30 : date % 30 };
  }

  get allAtswamat(): { beal: string; day: object }[] {
    const mebajaHamer: { month: string; date: number } = this.nenewe;
    const result: any[] = [];

    Object.keys(constants._yebealTewsak).forEach((key) => {
      result.push({
        beal: key,
        day: {
          month:
            constants._months[
              constants._months.indexOf(mebajaHamer.month) +
                Math.floor((mebajaHamer.date + constants._yebealTewsak[key]) / 30)
            ],
          date:
            (mebajaHamer.date + constants._yebealTewsak[key]) % 30 === 0
              ? 30
              : (mebajaHamer.date + constants._yebealTewsak[key]) % 30,
        },
      });
    });
    return result;
  }

  isMovableHoliday(holidayName: string): boolean {
    if (constants._yebealTewsak.hasOwnProperty(holidayName)) {
      return true;
    } else
      throw new Error(
        "FEASTNAME ERROR: Holiday or Feast is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'",
      );
  }

  getSingleBealOrTsom(name: string) {
    const status: boolean = this.isMovableHoliday(name);
    if (status) {
      const mebajaHamer: { month: string; date: number } = this.nenewe;
      const target: number = constants._yebealTewsak[name];
      const a = {
        month:
          constants._months[
            constants._months.indexOf(mebajaHamer.month) + Math.floor((mebajaHamer.date + target) / 30)
          ],
        date: (mebajaHamer.date + target) % 30 === 0 ? 30 : (mebajaHamer.date + target) % 30,
      };
      return a;
    }
  }
}
