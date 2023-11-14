// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

import EtDatetime from './datetime';
import { constants } from '../utils/constants';

/**
 * Represents a class for Bahire Hasab calculations.
 */
export default class BahireHasab {
  private _year: number;

  /**
   * Initializes a new instance of the BahireHasab class.
   * @param {number} year - The Ethiopian year (negative for the current year).
   */
  constructor(year: number) {
    this._year = year < 0 ? new EtDatetime(Date.now()).year : year;
  }

  /**
   * Gets the current Ethiopian year.
   */
  get ameteAlem(): number {
    return constants.ameteFida + this._year;
  }

  /**
   * Gets the Evangelist for the current year.
   * @param {boolean} returnName - If true, returns the name; otherwise, returns the number.
   * @returns {string | number} - The Evangelist name or number.
   */
  getEvangelist(returnName: boolean = false): string | number {
    const evangelist: number = this.ameteAlem % 4;
    return returnName ? constants.evangelists[evangelist] : evangelist;
  }

  /**
   * Gets the Meskerem One for the current year.
   * @param {boolean} returnName - If true, returns the name; otherwise, returns the number.
   * @returns {string | number} - The Meskerem One name or number.
   */
  getMeskeremOne(returnName: boolean = false): string {
    const rabeet: number = Math.floor(this.ameteAlem / 4);
    const result: number = (this.ameteAlem + rabeet) % 7;
    return returnName ? constants._weekdays[result] : result.toString();
  }

  /**
   * Gets the Wenber value for the current year.
   */
  get wenber(): number {
    return Math.max(0, (this.ameteAlem % 19) - 1);
  }

  /**
   * Gets the Abeqte value for the current year.
   */
  get abekte(): number {
    return (this.wenber * constants.tinteAbekte) % 30;
  }

  /**
   * Gets the Metkih value for the current year.
   */
  get metkih(): number {
    return this.wenber === 0 ? 30 : (this.wenber * constants.tinteMetkih) % 30;
  }

  /**
   * Determines the Yebeale Metkih Wer for the current year.
   */
  yebealeMetkihWer(): number {
    return this.metkih > 14 ? 1 : 2;
  }

  /**
   * Gets the Nenewe (month and date) for the current year.
   * @returns {{ month: string; date: number }} - The Nenewe information.
   */
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

  /**
   * Gets all Atswamat for the current year.
   * @returns {{ beal: string; day: object }[]} - Array of Atswamat information.
   */
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

  /**
   * Checks if a holiday is movable.
   * @param {string} holidayName - The name of the holiday.
   * @returns {boolean} - True if movable; otherwise, false.
   * @throws {Error} - If the holiday is not movable.
   */
  isMovableHoliday(holidayName: string): boolean {
    if (constants._yebealTewsak.hasOwnProperty(holidayName)) {
      return true;
    } else {
      throw new Error(
        "FEASTNAME ERROR: Holiday or Feast is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'",
      );
    }
  }

  /**
   * Gets the date for a single Beal or Tsom.
   * @param {string} name - The name of the Beal or Tsom.
   * @returns {{ month: string; date: number } | undefined} - The date information, or undefined if not movable.
   */
  getSingleBealOrTsom(name: string): { month: string; date: number } | undefined {
    const status: boolean = this.isMovableHoliday(name);
    if (status) {
      const mebajaHamer: { month: string; date: number } = this.nenewe;
      const target: number = constants._yebealTewsak[name];
      return {
        month:
          constants._months[
            constants._months.indexOf(mebajaHamer.month) + Math.floor((mebajaHamer.date + target) / 30)
          ],
        date: (mebajaHamer.date + target) % 30 === 0 ? 30 : (mebajaHamer.date + target) % 30,
      };
    }
  }
}
