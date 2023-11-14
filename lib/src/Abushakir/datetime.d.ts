/**
 * EtDatetime class represents a date and time in the Ethiopian calendar.
 *
 * @remarks
 * This class provides methods to manipulate and format Ethiopian dates.
 *
 * @license MIT
 */
import Datetime from '../Interfaces/EDT';
import Duration from '../utils/duration';
declare class EtDatetime implements Datetime {
    moment: number;
    fixed: number;
    constructor(...args: any[]);
    fromMillisecondsSinceEpoch(millisecondsSinceEpoch: number): void;
    now(): void;
    get year(): number;
    get month(): number;
    get monthGeez(): string;
    get day(): number;
    get dayGeez(): string;
    get hour(): number;
    get minute(): number;
    get second(): number;
    get millisecond(): number;
    get isLeap(): boolean;
    get yearFirstDay(): number;
    get weekday(): number;
    get date(): object;
    get time(): object;
    toString(): string;
    toJson(): object;
    toIso8601String(): string;
    isBefore(other: EtDatetime): boolean;
    isAfter(other: EtDatetime): boolean;
    isAtSameMomentAs(other: EtDatetime): boolean;
    compareTo(other: EtDatetime): number;
    add(duration: Duration): EtDatetime;
    subtract(duration: Duration): EtDatetime;
    difference(other: EtDatetime): Duration;
    private fixedFromEthiopic;
    private fixedFromUnix;
    private dateToEpoch;
    private _yearFirstDay;
    private fourDigits;
    private sixDigits;
    private threeDigits;
    private twoDigits;
    private toNumber;
}
export default EtDatetime;
