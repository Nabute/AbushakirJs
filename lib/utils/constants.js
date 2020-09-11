"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
    constructor() {
        this.unixEpoch = 719163;
        this.ethiopicEpoch = 2796;
        this._dayMilliSec = 86400000;
        this._hourMilliSec = 3600000;
        this._minMilliSec = 60000;
        this._secMilliSec = 1000;
        this._maxMillisecondsSinceEpoch = 8640000000000000;
        this._evangelists = ['ዮሐንስ', 'ማቴዎስ', 'ማርቆስ', 'ሉቃስ'];
        this._ameteFida = 5500;
        this._tinteAbekte = 11;
        this._tinteMetkih = 19;
        this.months = [
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
        this.dayNumbers = [
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
        this.yebealTewsak = {
            ነነዌ: 0,
            'ዓቢይ ጾም': 14,
            'ደብረ ዘይት': 41,
            ሆሣዕና: 62,
            ስቅለት: 67,
            ትንሳኤ: 69,
            'ርክበ ካህናት': 93,
            ዕርገት: 108,
            ጰራቅሊጦስ: 118,
            'ጾመ ሐዋርያት': 119,
            'ጾመ ድህነት': 121,
        };
        this.yeeletTewsak = [
            { name: 'አርብ', val: 2 },
            { name: 'ሐሙስ', val: 3 },
            { name: 'ረቡዕ', val: 4 },
            { name: 'ማግሰኞ', val: 5 },
            { name: 'ሰኞ', val: 6 },
            { name: 'እሁድ', val: 7 },
            { name: 'ቅዳሜ', val: 8 },
        ];
        this.weekdays = ['ሰኞ', 'ማግሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ', 'እሁድ'];
    }
    get _unixEpoch() {
        return this.unixEpoch;
    }
    get _ethiopicEpoch() {
        return this.ethiopicEpoch;
    }
    get _months() {
        return this.months;
    }
    get _dayNumbers() {
        return this.dayNumbers;
    }
    get _weekdays() {
        return this.weekdays;
    }
    get hourMilliSec() {
        return this._hourMilliSec;
    }
    get minMilliSec() {
        return this._minMilliSec;
    }
    get secMilliSec() {
        return this._secMilliSec;
    }
    get dayMilliSec() {
        return this._dayMilliSec;
    }
    get maxMillisecondsSinceEpoch() {
        return this._maxMillisecondsSinceEpoch;
    }
    get evangelists() {
        return this._evangelists;
    }
    get ameteFida() {
        return this._ameteFida;
    }
    get tinteAbekte() {
        return this._tinteAbekte;
    }
    get tinteMetkih() {
        return this._tinteMetkih;
    }
    get _yeeletTewsak() {
        return this.yeeletTewsak;
    }
    get _yebealTewsak() {
        return this.yebealTewsak;
    }
}
exports.constants = new Constants();
