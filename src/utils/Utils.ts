//
export interface Duration {
    //
}
class Constants {

    private static unixEpoch: number = 719163
    private static ethiopicEpoch: number = 2796
    private static dayMilliSec: number = 86400000;
    private static hourMilliSec: number = 3600000;
    private static minMilliSec: number = 60000;
    private static secMilliSec: number = 1000;
    private static maxMillisecondsSinceEpoch: number = 8640000000000000;

    private static evangelists: Array<String> = ["ዮሐንስ", "ማቴዎስ", "ማርቆስ", "ሉቃስ"];

    private static ameteFida: number = 5500;

    private static tinteAbekte: number = 11;
    private static tinteMetkih: number = 19;



    private static months: Array<String> = [
        "መስከረም",
        "ጥቅምት",
        "ኅዳር",
        "ታኅሳስ",
        "ጥር",
        "የካቲት",
        "መጋቢት",
        "ሚያዝያ",
        "ግንቦት",
        "ሰኔ",
        "ኃምሌ",
        "ነሐሴ",
        "ጷጉሜን"
    ];

    private static dayNumbers: Array<String> = [
        "፩",
        "፪",
        "፫",
        "፬",
        "፭",
        "፮",
        "፯",
        "፰",
        "፱",
        "፲",
        "፲፩",
        "፲፪",
        "፲፫",
        "፲፬",
        "፲፭",
        "፲፮",
        "፲፯",
        "፲፰",
        "፲፱",
        "፳",
        "፳፩",
        "፳፪",
        "፳፫",
        "፳፬",
        "፳፭",
        "፳፮",
        "፳፯",
        "፳፰",
        "፳፱",
        "፴"
    ];

    private static yebealTewsak = {
        "ነነዌ": 0,
        "ዓቢይ ጾም": 14,
        "ደብረ ዘይት": 41,
        "ሆሣዕና": 62,
        "ስቅለት": 67,
        "ትንሳኤ": 69,
        "ርክበ ካህናት": 93,
        "ዕርገት": 108,
        "ጰራቅሊጦስ": 118,
        "ጾመ ሐዋርያት": 119,
        "ጾመ ድህነት": 121,
    };

    private static yeeletTewsak: Array<object> = [
        { "key": "አርብ", "value": 2 },
        { "key": "ሐሙስ", "value": 3 },
        { "key": "ረቡዕ", "value": 4 },
        { "key": "ማግሰኞ", "value": 5 },
        { "key": "ሰኞ", "value": 6 },
        { "key": "እሁድ", "value": 7 },
        { "key": "ቅዳሜ", "value": 8 },
    ];

    private static weekdays: Array<String> = [
        "ሰኞ",
        "ማግሰኞ",
        "ረቡዕ",
        "ሐሙስ",
        "አርብ",
        "ቅዳሜ",
        "እሁድ",
    ];

    get _unixEpoch(): number {
        return Constants.unixEpoch;
    }

    get _ethiopicEpoch(): number {
        return Constants.ethiopicEpoch;
    }

    get _months(): Array<String> {
        return Constants.months;
    }

    get _dayNumbers(): Array<String> {
        return Constants.dayNumbers;
    }
    get hourMilliSec() {
        return Constants.hourMilliSec;
    };
    get minMilliSec(): number {
        return Constants.minMilliSec
    };
    get secMilliSec(): number {
        return Constants.secMilliSec
    }
    get dayMilliSec(): number {
        return Constants.dayMilliSec;
    }

    get maxMillisecondsSinceEpoch(): number {
        return Constants.maxMillisecondsSinceEpoch;
    }

    get evangelists(): Array<String> {
        return Constants.evangelists;
    }

    get ameteFida(): number {
        return Constants.ameteFida;
    }

    get tinteAbekte(): number {
        return Constants.tinteAbekte;
    }

    get tinteMetkih(): number {
        return Constants.tinteMetkih;
    }
}
export var constants = new Constants();
