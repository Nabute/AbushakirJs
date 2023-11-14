declare class Duration {
    private microsecondsPerMillisecond;
    private millisecondsPerSecond;
    private secondsPerMinute;
    private minutesPerHour;
    private hoursPerDay;
    private microsecondsPerSecond;
    private microsecondsPerMinute;
    private microsecondsPerHour;
    private microsecondsPerDay;
    private millisecondsPerMinute;
    private millisecondsPerHour;
    private millisecondsPerDay;
    private secondsPerHour;
    private secondsPerDay;
    private minutesPerDay;
    static _duration: number;
    constructor(...args: any[]);
    setMicroseconds(microseconds: number): void;
    get millisecondDuration(): number;
    get inDays(): number;
    get inHours(): number;
    get inMinutes(): number;
    get inSeconds(): number;
    get inMilliseconds(): number;
    get inMicroseconds(): number;
    get isNegative(): boolean;
    abs(): Duration;
    add(other: Duration): Duration;
    subtract(other: Duration): Duration;
    multiply(factor: number): Duration;
    divide(quotient: number): Duration;
    gt(other: Duration): boolean;
    gte(other: Duration): boolean;
    lt(other: Duration): boolean;
    lte(other: Duration): boolean;
    equal(other: Duration): boolean;
    compareTo(other: Duration): number;
    tostring(): string;
    private toNumber;
    private sixDigits;
    private twoDigits;
}
export default Duration;
