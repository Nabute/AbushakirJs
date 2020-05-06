//
interface tewsak { name: string, val: number };

class Constants {
  private unixEpoch: number = 719163;
  private ethiopicEpoch: number = 2796;
  private _dayMilliSec: number = 86400000;
  private _hourMilliSec: number = 3600000;
  private _minMilliSec: number = 60000;
  private _secMilliSec: number = 1000;
  private _maxMillisecondsSinceEpoch: number = 8640000000000000;

  private _evangelists: Array<string> = ['ዮሐንስ', 'ማቴዎስ', 'ማርቆስ', 'ሉቃስ'];

  private _ameteFida: number = 5500;

  private _tinteAbekte: number = 11;
  private _tinteMetkih: number = 19;

  private months: Array<string> = [
    'መስከረም',
    'ጥቅምት',
    'ኅዳር',
    'ታኅሳስ',
    'ጥር',
    'የካቲት',
    'መጋቢት',
    'ሚያዝያ',
    'ግንቦት',
    'ሰኔ',
    'ኃምሌ',
    'ነሐሴ',
    'ጷጉሜን',
  ];

  private dayNumbers: Array<string> = [
    '፩',
    '፪',
    '፫',
    '፬',
    '፭',
    '፮',
    '፯',
    '፰',
    '፱',
    '፲',
    '፲፩',
    '፲፪',
    '፲፫',
    '፲፬',
    '፲፭',
    '፲፮',
    '፲፯',
    '፲፰',
    '፲፱',
    '፳',
    '፳፩',
    '፳፪',
    '፳፫',
    '፳፬',
    '፳፭',
    '፳፮',
    '፳፯',
    '፳፰',
    '፳፱',
    '፴',
  ];

  private yebealTewsak: { [index: string]: number } = {
    "ነነዌ": 0,
    'ዓቢይ ጾም': 14,
    'ደብረ ዘይት': 41,
    "ሆሣዕና": 62,
    "ስቅለት": 67,
    "ትንሳኤ": 69,
    'ርክበ ካህናት': 93,
    "ዕርገት": 108,
    "ጰራቅሊጦስ": 118,
    'ጾመ ሐዋርያት': 119,
    'ጾመ ድህነት': 121,
  };

  private yeeletTewsak: Array<tewsak> = [
    { name: 'አርብ', val: 2 },
    { name: 'ሐሙስ', val: 3 },
    { name: 'ረቡዕ', val: 4 },
    { name: 'ማግሰኞ', val: 5 },
    { name: 'ሰኞ', val: 6 },
    { name: 'እሁድ', val: 7 },
    { name: 'ቅዳሜ', val: 8 },
  ];

  private weekdays: Array<string> = ['ሰኞ', 'ማግሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ'];

  get _unixEpoch(): number {
    return this.unixEpoch;
  }

  get _ethiopicEpoch(): number {
    return this.ethiopicEpoch;
  }

  get _months(): Array<string> {
    return this.months;
  }

  get _dayNumbers(): Array<string> {
    return this.dayNumbers;
  }
  get _weekdays(): Array<string> {
    return this.weekdays;
  }

  get hourMilliSec() {
    return this._hourMilliSec;
  }
  get minMilliSec(): number {
    return this._minMilliSec;
  }
  get secMilliSec(): number {
    return this._secMilliSec;
  }
  get dayMilliSec(): number {
    return this._dayMilliSec;
  }

  get maxMillisecondsSinceEpoch(): number {
    return this._maxMillisecondsSinceEpoch;
  }

  get evangelists(): Array<string> {
    return this._evangelists;
  }

  get ameteFida(): number {
    return this._ameteFida;
  }

  get tinteAbekte(): number {
    return this._tinteAbekte;
  }

  get tinteMetkih(): number {
    return this._tinteMetkih;
  }

  get _yeeletTewsak(): Array<Object> {
    return this.yeeletTewsak;
  }

  get _yebealTewsak(): { [index: string]: number } {
    return this.yebealTewsak;
  }
}
export var constants = new Constants();
