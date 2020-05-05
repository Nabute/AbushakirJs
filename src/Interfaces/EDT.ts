//

import EtDatetime from '../Abushakir/datetime';
import { Duration } from '../utils/duration';

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
  toJson(): Object;
  toIso8601String(): String;
  //
  isBefore(other: EtDatetime): boolean;
  isAfter(other: EtDatetime): boolean;
  isAtSameMomentAs(other: EtDatetime): boolean;
  compareTo(other: EtDatetime): number;
  add(duration: Duration): EtDatetime;
  subtract(duration: Duration): EtDatetime;
}
