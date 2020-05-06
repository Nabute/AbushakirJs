//
interface DurationNamedParams {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  microseconds?: number;
}

class Duration {
  private microsecondsPerMillisecond: number = 1;
  private millisecondsPerSecond: number = 1000;
  private secondsPerMinute: number = 60;
  private minutesPerHour: number = 60;
  private hoursPerDay: number = 24;

  private microsecondsPerSecond: number = this.microsecondsPerMillisecond * this.millisecondsPerSecond;
  private microsecondsPerMinute: number = this.microsecondsPerSecond * this.secondsPerMinute;
  private microsecondsPerHour: number = this.microsecondsPerMinute * this.minutesPerHour;
  private microsecondsPerDay: number = this.microsecondsPerHour * this.hoursPerDay;

  private millisecondsPerMinute: number = this.millisecondsPerSecond * this.secondsPerMinute;
  private millisecondsPerHour: number = this.millisecondsPerMinute * this.minutesPerHour;
  private millisecondsPerDay: number = this.millisecondsPerHour * this.hoursPerDay;

  private secondsPerHour: number = this.secondsPerMinute * this.minutesPerHour;
  private secondsPerDay: number = this.secondsPerHour * this.hoursPerDay;

  private minutesPerDay: number = this.minutesPerHour * this.hoursPerDay;

  static _duration: number;

  constructor(...args: any[]) {
    if (args.length > 0 && args.length < 7) {
      this.setMicroseconds(
        this.microsecondsPerDay * this.toNumber(args[0]) +
          this.microsecondsPerHour * this.toNumber(args[1]) +
          this.microsecondsPerMinute * this.toNumber(args[2]) +
          this.microsecondsPerSecond * this.toNumber(args[3]) +
          this.microsecondsPerMillisecond * this.toNumber(args[4]) +
          this.toNumber(args[5]),
      );
    } else throw new Error('ARGUMENT ERROR: Invalid argument.');
  }

  setMicroseconds(microseconds: number) {
    Duration._duration = Math.floor(microseconds);
  }

  get millisecondDuration(): number {
    return Duration._duration;
  }

  public get inDays(): number {
    return Math.abs(Duration._duration / this.microsecondsPerDay);
  }

  public get inHours(): number {
    return Math.abs(Duration._duration / this.microsecondsPerHour);
  }

  public get inMinutes(): number {
    return Math.abs(Duration._duration / this.microsecondsPerMinute);
  }

  public get inSeconds(): number {
    return Math.abs(Duration._duration / this.microsecondsPerSecond);
  }

  public get inMilliseconds(): number {
    return Math.abs(Duration._duration / this.microsecondsPerMillisecond);
  }

  public get inMicroseconds(): number {
    return Duration._duration;
  }

  public get isNegative(): boolean {
    return Duration._duration < 0;
  }

  // operations
  abs(): Duration {
    return new Duration(Math.abs(Duration._duration));
  }

  add(other: Duration): Duration {
    return new Duration(Duration._duration + other.millisecondDuration);
  }

  subtract(other: Duration): Duration {
    return new Duration(Duration._duration - other.millisecondDuration);
  }

  multiply(factor: number): Duration {
    return new Duration(Math.round(Duration._duration * factor));
  }

  divide(quotient: number): Duration {
    if (quotient === 0) throw new Error('INTEGERDIVISIONBYZERO: Integer can not be divided by zero.');
    return new Duration(Math.floor(Duration._duration / quotient));
  }

  gt(other: Duration): boolean {
    return Duration._duration > other.millisecondDuration;
  }

  gte(other: Duration): boolean {
    return Duration._duration >= other.millisecondDuration;
  }

  lt(other: Duration): boolean {
    return Duration._duration < other.millisecondDuration;
  }

  lte(other: Duration): boolean {
    return Duration._duration <= other.millisecondDuration;
  }

  equal(other: Duration): boolean {
    return Duration._duration === other.inMicroseconds;
  }

  compareTo(other: Duration): number {
    if (this.lt(other)) return -1;
    else if (this.equal(other)) return 0;
    else return 1;
  }

  tostring(): string {
    if (this.isNegative) return `-${this}`;

    const min: string = this.twoDigits(this.inMinutes % this.minutesPerHour);
    const sec: string = this.twoDigits(this.inSeconds % this.secondsPerMinute);
    const micSec: string = this.sixDigits(this.inMicroseconds % this.microsecondsPerSecond);

    return `${this.inHours}:${min}:${sec}.${micSec}`;
  }

  private toNumber(value: any): number {
    if (value === undefined) return NaN;
    if (value === null) return 0;
    if (typeof value === 'boolean') {
      if (value) return 1;
      else return 0;
    }
    if (typeof value === 'string') return parseInt(value, 10);
    if (typeof value === 'symbol') throw new Error('TYPE ERROR: Unexpected operand type.');
    if (typeof value === 'object') throw new Error('TYPE ERROR: Unexpected operand type.');
    return value;
  }

  private sixDigits(n: number): string {
    if (n >= 100000) return `${n}`;
    if (n >= 10000) return `0${n}`;
    if (n >= 1000) return `00${n}`;
    if (n >= 100) return `000${n}`;
    if (n >= 10) return `0000${n}`;
    return `00000${n}`;
  }

  private twoDigits(n: number): string {
    if (n >= 10) return `${n}`;
    return `0${n}`;
  }
}

export default Duration;
