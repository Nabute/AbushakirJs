interface Calendar {
    year: number;
    month: number;
    day: number;
    monthName: string;
    allMonths: string[];
    dayNumbers: string[];
    weekdays: string[];
    monthDays(): any[];
    yearDays(): any[];
}
export { Calendar };
