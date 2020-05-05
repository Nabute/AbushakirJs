//
interface durationNamedParams {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
  microseconds?: number;
}

export class Duration {
  private microsecondsPerMillisecond: number = 1000;
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

  // var zero: Duration = new Duration(seconds: 0);

  constructor({ days, hours, minutes, seconds, milliseconds, microseconds }: durationNamedParams) {
    if (
      days !== undefined &&
      hours !== undefined &&
      minutes !== undefined &&
      seconds !== undefined &&
      milliseconds !== undefined &&
      microseconds !== undefined
    )
      throw new Error('ARGUMENT ERROR: One of the params must be provided.');

    var temp: number = 0;

    if (days !== undefined) {
      temp += Math.abs(this.microsecondsPerDay * days);
    }
    if (hours !== undefined) {
      temp += Math.abs(this.microsecondsPerHour * hours);
    }
    if (minutes !== undefined) {
      temp += Math.abs(this.microsecondsPerMinute * minutes);
    }
    if (seconds !== undefined) {
      temp += Math.abs(this.microsecondsPerSecond * seconds);
    }
    if (milliseconds !== undefined) {
      temp += Math.abs(this.microsecondsPerMillisecond * milliseconds);
    }
    if (microseconds !== undefined) {
      temp += Math.abs(microseconds);
    }

    this.setMicroseconds(temp);
  }

  setMicroseconds(microseconds: number) {
    Duration._duration = microseconds;
  }

  get millisecondDuration(): number {
    return Duration._duration;
  }

  //
  // }

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

  // operations
  // add(other: Duration): Duration {
  //     return Duration.setMicroseconds = Duration._duration + other.millisecondDuration;
  // }
}
