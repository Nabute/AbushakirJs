//

export default interface Datetime {
    year: number;
    month: number;
    monthGeez: String;
    day: number;
    dayGeez: String;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;

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