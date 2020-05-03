//
import Datetime from "../Interfaces/EDT";

export default class EtDatetime implements Datetime {
    getYear(): number {
        throw new Error("Method not implemented.");
    }
    getMonth(): number {
        throw new Error("Method not implemented.");
    }
    getMonthGeez(): number {
        throw new Error("Method not implemented.");
    }
    getDay(): number {
        throw new Error("Method not implemented.");
    }
    getDayGeez(): String {
        throw new Error("Method not implemented.");
    }
    getHour(): number {
        throw new Error("Method not implemented.");
    }
    getMinute(): number {
        throw new Error("Method not implemented.");
    }
    getSecond(): number {
        throw new Error("Method not implemented.");
    }
    getMillisecond(): number {
        throw new Error("Method not implemented.");
    }
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
    add(duration: Utility.Duration): this {
        throw new Error("Method not implemented.");
    }
    subtract(duration: Utility.Duration): this {
        throw new Error("Method not implemented.");
    }

}