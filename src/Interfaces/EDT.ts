//

export default interface Datetime {
    getYear(): number;
    getMonth(): number;
    getMonthGeez(): number;
    getDay(): number;
    getDayGeez(): String;
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
    getMillisecond(): number;

    // Methods
    toString(): String;
    toJson(): String;
    toIso8601String(): String;
    //
    isBefore(other: this): boolean;
    isAfter(other: this): boolean;
    isAtSameMomentAs(other: this): boolean;
    compareTo(other: this): number;
    add(duration: Utility.Duration): this;
    subtract(duration: Utility.Duration): this;
}