// Copyright 2012 (2020 GC) Nabute. All rights reserved.
// Use of this source code is governed by MIT license, which can be found
// in the LICENSE file.

interface Calendar {
  year: number;
  month: number;
  day: number;
  monthName: string;
  allMonths: string[];
  dayNumbers: string[];
  weekdays: string[];

  // Methods
  monthDays(): any[];
  yearDays(): any[];
}

export { Calendar };
