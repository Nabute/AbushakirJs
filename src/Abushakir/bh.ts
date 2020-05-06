//

import EtDatetime from "./datetime";
import { constants } from "../utils/constants";

interface tewsak { name: string, val: number };

export default class BahireHasab {
  private _year: number;

  constructor(year: number) {
    year < 0 ? this._year = new EtDatetime(Date.now()).year : this._year = year;
  }

  get ameteAlem(): number {
    return constants.ameteFida + this._year;
  }

  getEvangelist(returnName: boolean = false): string {
    var evangelist: number;
    evangelist = this.ameteAlem % 4;
    if (returnName) {
      return constants.evangelists[evangelist];
    }
    return evangelist.toString();
  }

  getMeskeremOne(returnName: boolean = false) {
    var rabeet: number = Math.floor(this.ameteAlem / 4);
    var result: number = (this.ameteAlem + rabeet) % 7;
    if (returnName) return constants._weekdays[result];
    return result.toString();
  }

  get wenber(): number {
    return ((this.ameteAlem % 19) - 1) < 0 ? 0 : (this.ameteAlem % 19) - 1;
  }

  get abekte(): number {
    return (this.wenber * constants.tinteAbekte) % 30;
  }

  get metkih(): number {
    return this.wenber == 0 ? 30 : (this.wenber * constants.tinteMetkih) % 30;
  }

  yebealeMetkihWer(): number {
    if (this.metkih > 14) {
      return 1;
    } else
      return 2;
  }

  get nenewe(): { month: string, date: number } {
    var meskerem1 = this.getMeskeremOne(true);
    var month = this.yebealeMetkihWer();
    var date;
    var dayTewsak: number = 0;

    for (let index = 0; index < constants._yeeletTewsak.length; index++) {
      const el: any = constants._yeeletTewsak[index];
      if (el.name == constants._weekdays[(constants._weekdays.indexOf(meskerem1) + this.metkih - 1) % 7]) dayTewsak = el.val

    }

    var monthName: string = dayTewsak + this.metkih > 30 ? 'የካቲት' : 'ጥር';
    if (month == 2) {
      // ጥቅምት
      monthName = 'የካቲት';
      var tikimt1: string = constants._weekdays[(constants._weekdays.indexOf(meskerem1) + 2) % 7];
      var metkihElet: string = constants._weekdays[(constants._weekdays.indexOf(tikimt1) + this.metkih - 1) % 7];

      for (let index = 0; index < constants._yeeletTewsak.length; index++) {
        const el: any = constants._yeeletTewsak[index];
        if (el['key'] == constants._weekdays[constants._weekdays.indexOf(metkihElet)])
          dayTewsak = el['value']
      }
    }
    date = this.metkih + dayTewsak;
    return { "month": monthName, "date": date % 30 == 0 ? 30 : date % 30 };
  }


  get allAtswamat(): Array<{ beal: string, day: Object }> {
    var mebajaHamer = this.nenewe;
    var result: Array<any> = [];

    Object.keys(constants._yebealTewsak).forEach(key => {
      result.push({ "beal": key, "day": { "month": constants._months[constants._months.indexOf(mebajaHamer.month) + Math.floor((mebajaHamer['date'] + constants._yebealTewsak[key]) / 30)], "date": (mebajaHamer['date'] + constants._yebealTewsak[key]) % 30 == 0 ? 30 : (mebajaHamer['date'] + constants._yebealTewsak[key]) % 30 } });
    });
    return result;
  }


  isMovableHoliday(holidayName: string): boolean {
    if (constants._yebealTewsak.hasOwnProperty(holidayName)) {
      return true;
    } else
      throw new Error("FEASTNAME ERROR: Holiday is not a movable one. Please provide holidays between 'ነነዌ' and ጾመ 'ድህነት'");
  }


  getSingleBealOrTsom(name: string) {
    var status: boolean = this.isMovableHoliday(name);
    if (status) {
      var mebajaHamer: Object = this.nenewe;
      var target: number = constants._yebealTewsak[name];
      var a = {
        "month": constants._months[constants._months.indexOf(mebajaHamer['month']) + Math.floor((mebajaHamer['date'] + target) / 30)],
        "date": (mebajaHamer['date'] + target) % 30 == 0 ? 30 : (mebajaHamer['date'] + target) % 30
      };
      return a;
    }
  }

}
