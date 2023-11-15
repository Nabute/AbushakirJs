interface Tewsak {
    name: string;
    val: number;
}
declare class Constants {
    private unixEpoch;
    private ethiopicEpoch;
    private _dayMilliSec;
    private _hourMilliSec;
    private _minMilliSec;
    private _secMilliSec;
    private _maxMillisecondsSinceEpoch;
    private _evangelists;
    private _ameteFida;
    private _tinteAbekte;
    private _tinteMetkih;
    private months;
    private dayNumbers;
    private yebealTewsak;
    private yeeletTewsak;
    private weekdays;
    get _unixEpoch(): number;
    get _ethiopicEpoch(): number;
    get _months(): string[];
    get _dayNumbers(): string[];
    get _weekdays(): string[];
    get hourMilliSec(): number;
    get minMilliSec(): number;
    get secMilliSec(): number;
    get dayMilliSec(): number;
    get maxMillisecondsSinceEpoch(): number;
    get evangelists(): string[];
    get ameteFida(): number;
    get tinteAbekte(): number;
    get tinteMetkih(): number;
    get _yeeletTewsak(): Tewsak[];
    get _yebealTewsak(): {
        [index: string]: number;
    };
}
export declare const constants: Constants;
export {};
