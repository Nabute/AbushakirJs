//
import Datetime from "../Interfaces/EDT";
import { Duration, constants } from "../utils/Utils";

export default class EtDatetime implements Datetime {

    // Fields
    private moment: number;
    private fixed: number;


    // Constructors
    constructor(year: number, month: number = 1, day: number = 1, hour: number = 0, minute: number = 0, second: number = 0, millisecond: number = 0, microsecond: number = 0) {
        this.fixed = this.fixedFromEthiopic(year, month, day);
        this.moment = this.dateToEpoch(year, month, day, hour, minute, second, millisecond);

        if (this.fixed == null) throw new Error("ARGUMENT ERROR:unacceptable argument.");
    }


    // Getters
    public get year(): number {
        return Math.floor(((4 * (this.fixed - constants._ethiopicEpoch) + 1463) / 1461));
    }
    public get month(): number {
        return Math.floor((((this.fixed - this.fixedFromEthiopic(this.year, 1, 1)) / 30) + 1));
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
        return (this.yearFirstDay + ((this.month - 1) * 2)) % 7;
    }

    get date(): object {
        return { "year": this.year, "month": this.month, "day": this.day }
    }

    get time(): object {
        return { "h": this.hour, "m": this.minute, "s": this.second };
    }
    //Methods

    toString(): String {
        throw new Error("Method not implemented.");
    }
    toJson(): String {
        throw new Error("Method not implemented.");
    }
    toIso8601String(): String {
        throw new Error("Method not implemented.");
    }
    isBefore(other: this): boolean {
        throw new Error("Method not implemented.");
    }
    isAfter(other: this): boolean {
        throw new Error("Method not implemented.");
    }
    isAtSameMomentAs(other: this): boolean {
        throw new Error("Method not implemented.");
    }
    compareTo(other: this): number {
        throw new Error("Method not implemented.");
    }
    add(duration: any): this {
        throw new Error("Method not implemented.");
    }
    subtract(duration: any): this {
        throw new Error("Method not implemented.");
    }


    // Private methods
    private fixedFromEthiopic(year: number, month: number, day: number): number {
        return Math.floor(constants._ethiopicEpoch -
            1 +
            365 * (year - 1) +
            (year / 4) +
            30 * (month - 1) +
            day);
    }

    private fixedFromUnix(ms: number): number {
        return constants._unixEpoch + Math.floor(ms / 86400000);
    }

    private dateToEpoch(year: number, month: number, date: number, hour: number, minute: number, second: number, millisecond: number): number {
        return ((this.fixedFromEthiopic(year, month, date) - constants._unixEpoch) *
            constants.dayMilliSec) +
            (hour * constants.hourMilliSec) +
            (minute * constants.minMilliSec) +
            (second * constants.secMilliSec) +
            millisecond;
    }

    private _yearFirstDay(): number {
        var ameteAlem: number = constants.ameteFida + this.year;
        var rabeet = Math.floor(ameteAlem / 4);
        return (ameteAlem + rabeet) % 7;
    }



}