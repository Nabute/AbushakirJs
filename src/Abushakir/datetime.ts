//
import Datetime from '../Interfaces/EDT';
import { constants } from '../utils/constants';
import { Duration } from '../utils/duration';

export default class EtDatetime implements Datetime {
    // Fields
    moment: number;
    fixed: number;

    // Parameterized Constructor
    constructor(
        year: number,
        month: number = 1,
        day: number = 1,
        hour: number = 0,
        minute: number = 0,
        second: number = 0,
        millisecond: number = 0,
        microsecond: number = 0,
    ) {
        this.fixed = this.fixedFromEthiopic(year, month, day);
        this.moment = this.dateToEpoch(year, month, day, hour, minute, second, millisecond);

        if (this.fixed == null) throw new Error('ARGUMENT ERROR:unacceptable argument.');
    }

    // constructor(...args: any[]) {
    //     if (args.length >= 2) {

    //         this.fixed = this.fixedFromEthiopic(this.toNumber(args[0]), args[1] as number, args[2] as number);
    //         this.moment = this.dateToEpoch(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);

    //         if (this.fixed == null) throw new Error('ARGUMENT ERROR:unacceptable argument.');
    //     } else if (args.length == 1) {
    //         this.fromMillisecondsSinceEpoch(args[0])
    //     }
    // }

    fromMillisecondsSinceEpoch(millisecondsSinceEpoch: number) {
        this.moment = millisecondsSinceEpoch;
        this.fixed = this.fixedFromUnix(millisecondsSinceEpoch);
        if (this.fixed == null) throw new Error('ARGUMENT ERROR:unacceptable argument.');
        if (
            Math.abs(millisecondsSinceEpoch) > constants.maxMillisecondsSinceEpoch ||
            Math.abs(millisecondsSinceEpoch) == constants.maxMillisecondsSinceEpoch
        )
            throw new Error(`Calendar out side valid range ${constants.maxMillisecondsSinceEpoch}`);
    }

    toNumber(value: any): number {
        // TODO: http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
        return 1;
    }

    now() {
        this.fixed = this.fixedFromUnix(Date.now());
        this.moment = Date.now();
    }

    // Getters
    public get year(): number {
        return Math.floor((4 * (this.fixed - constants._ethiopicEpoch) + 1463) / 1461);
    }
    public get month(): number {
        return Math.floor((this.fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30 + 1);
    }
    public get monthGeez(): String {
        return constants._months[(this.month - 1) % 13];
    }
    public get day(): number {
        return this.fixed + 1 - this.fixedFromEthiopic(this.year, this.month, 1);
    }
    public get dayGeez(): String {
        return constants._dayNumbers[(this.day - 1) % 30];
    }
    public get hour(): number {
        return Math.floor(this.moment / constants.hourMilliSec) % 24;
    }
    public get minute(): number {
        return Math.floor(this.moment / constants.minMilliSec) % 60;
    }
    public get second(): number {
        return Math.floor((this.moment / constants.secMilliSec) % 60);
    }
    public get millisecond(): number {
        return this.moment % 1000;
    }

    public get isLeap(): boolean {
        return this.year % 4 == 3;
    }

    get yearFirstDay(): number {
        return this._yearFirstDay();
    }

    get weekday(): number {
        return (this.yearFirstDay + (this.month - 1) * 2) % 7;
    }

    get date(): object {
        return { year: this.year, month: this.month, day: this.day };
    }

    get time(): object {
        return { h: this.hour, m: this.minute, s: this.second };
    }

    //Methods

    toString(): String {
        var y: String = this.fourDigits(this.year);
        var m: String = this.twoDigits(this.month);
        var d: String = this.twoDigits(this.day);
        var h: String = this.twoDigits(this.hour);
        var min: String = this.twoDigits(this.minute);
        var sec: String = this.twoDigits(this.second);
        var ms: String = this.threeDigits(this.millisecond);
        return `${y}-${m}-${d} ${h}:${min}:${sec}.${ms}`;
    }
    toJson(): Object {
        return {
            year: this.fourDigits(this.year),
            month: this.twoDigits(this.month),
            date: this.twoDigits(this.day),
            hour: this.twoDigits(this.hour),
            min: this.twoDigits(this.minute),
            sec: this.twoDigits(this.second),
            ms: this.threeDigits(this.millisecond),
        };
    }
    toIso8601String(): String {
        var y: String = this.year >= -9999 && this.year <= 9999 ? this.fourDigits(this.year) : this.sixDigits(this.year);
        var m: String = this.twoDigits(this.month);
        var d: String = this.twoDigits(this.day);
        var h: String = this.twoDigits(this.hour);
        var min: String = this.twoDigits(this.minute);
        var sec: String = this.twoDigits(this.second);
        var ms: String = this.threeDigits(this.millisecond);
        return `${y}-${m}-${d}T${h}:${min}:${sec}.${ms}`;
    }
    isBefore(other: EtDatetime): boolean {
        return this.fixed < other.fixed && this.moment < other.moment;
    }
    isAfter(other: EtDatetime): boolean {
        return this.fixed > other.fixed && this.moment > other.moment;
    }
    isAtSameMomentAs(other: EtDatetime): boolean {
        return this.fixed == other.fixed && this.moment == other.moment;
    }
    compareTo(other: EtDatetime): number {
        if (this.isBefore(other)) return -1;
        else if (this.isAtSameMomentAs(other)) return 0;
        else return 1;
    }
    add(duration: any): EtDatetime {
        throw new Error('Method not implemented.');
    }
    subtract(duration: any): EtDatetime {
        throw new Error('Method not implemented.');
    }

    // Private methods
    private fixedFromEthiopic(year: number, month: number, day: number): number {
        return Math.floor(constants._ethiopicEpoch - 1 + 365 * (year - 1) + year / 4 + 30 * (month - 1) + day);
    }

    private fixedFromUnix(ms: number): number {
        return constants._unixEpoch + Math.floor(ms / 86400000);
    }

    private dateToEpoch(
        year: number,
        month: number,
        date: number,
        hour: number,
        minute: number,
        second: number,
        millisecond: number,
    ): number {
        return (
            (this.fixedFromEthiopic(year, month, date) - constants._unixEpoch) * constants.dayMilliSec +
            hour * constants.hourMilliSec +
            minute * constants.minMilliSec +
            second * constants.secMilliSec +
            millisecond
        );
    }

    private _yearFirstDay(): number {
        var ameteAlem: number = constants.ameteFida + this.year;
        var rabeet = Math.floor(ameteAlem / 4);
        return (ameteAlem + rabeet) % 7;
    }

    private fourDigits(n: number): String {
        var absN: number = Math.abs(n);
        var sign: String = n < 0 ? '-' : '';
        if (absN >= 1000) return `${n}`;
        if (absN >= 100) return `${sign}0${absN}`;
        if (absN >= 10) return `${sign}00${absN}`;
        return `${sign}000${absN}`;
    }

    private sixDigits(n: number): String {
        if (n < -9999 || n > 9999) throw new Error('Year out of scope');
        var absN: number = Math.abs(n);
        var sign: String = n < 0 ? '-' : '+';
        if (absN >= 100000) return `${sign}${absN}`;
        return `${sign}0${absN}`;
    }

    private threeDigits(n: number): String {
        if (n >= 100) return `${n}`;
        if (n >= 10) return `0${n}`;
        return `00${n}`;
    }

    private twoDigits(n: number): String {
        if (n >= 10) return `${n}`;
        return `0${n}`;
    }

    // private _parseFormat: RegExp = RegExp(r'^([+-]?\d{4,6})-?(\d\d)-?(\d\d)' // Day part.
    //       r'(?:[ T](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d+))?)?)?$' // Time part.
    //       r'( ?[zZ]| ?([-+])(\d\d)(?::?(\d\d))?)?)?$');
}

