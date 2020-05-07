// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.


import EtDatetime from '../Abushakir/datetime';
import Duration from '../utils/duration';

export default interface Datetime {
  year: number;
  month: number;
  monthGeez: string;
  day: number;
  dayGeez: string;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;

  // Methods
  toString(): string;
  toJson(): object;
  toIso8601String(): string;
  isBefore(other: EtDatetime): boolean;
  isAfter(other: EtDatetime): boolean;
  isAtSameMomentAs(other: EtDatetime): boolean;
  compareTo(other: EtDatetime): number;
  add(duration: Duration): EtDatetime;
  subtract(duration: Duration): EtDatetime;
}
