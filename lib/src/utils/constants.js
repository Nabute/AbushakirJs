"use strict";
// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
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
    Object.defineProperty(Constants.prototype, "_unixEpoch", {
        get: function () {
            return this.unixEpoch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "_ethiopicEpoch", {
        get: function () {
            return this.ethiopicEpoch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "_months", {
        get: function () {
            return this.months;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "_dayNumbers", {
        get: function () {
            return this.dayNumbers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "_weekdays", {
        get: function () {
            return this.weekdays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "hourMilliSec", {
        get: function () {
            return this._hourMilliSec;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "minMilliSec", {
        get: function () {
            return this._minMilliSec;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "secMilliSec", {
        get: function () {
            return this._secMilliSec;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "dayMilliSec", {
        get: function () {
            return this._dayMilliSec;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "maxMillisecondsSinceEpoch", {
        get: function () {
            return this._maxMillisecondsSinceEpoch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "evangelists", {
        get: function () {
            return this._evangelists;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "ameteFida", {
        get: function () {
            return this._ameteFida;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "tinteAbekte", {
        get: function () {
            return this._tinteAbekte;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "tinteMetkih", {
        get: function () {
            return this._tinteMetkih;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "_yeeletTewsak", {
        get: function () {
            return this.yeeletTewsak;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "_yebealTewsak", {
        get: function () {
            return this.yebealTewsak;
        },
        enumerable: true,
        configurable: true
    });
    return Constants;
}());
exports.constants = new Constants();
