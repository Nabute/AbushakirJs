interface Calendar {
  year: number;
  month: number;
  day: number;
  monthName: String;
  allMonths: Array<String>;
  dayNumbers: Array<String>;
  weekdays: Array<String>;

  // Methods
  monthDays(): Array<any>;
  yearDays(): Array<any>;
}

interface BH {
  //
}

export { Calendar, BH };
