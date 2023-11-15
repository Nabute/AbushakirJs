import { Calendar } from '../Interfaces/Calendar';
/**
 * Ethiopian Calendar implementation.
 */
export default class ETC implements Calendar {
    private _date;
    /**
     * Creates an instance of the Ethiopian Calendar.
     * @param args - Year, month, and day values (up to 3 arguments).
     * @throws {Error} - If the number of arguments is not between 1 and 3.
     */
    constructor(...args: any[]);
    /**
     * Gets the year of the Ethiopian Calendar.
     */
    get year(): number;
    /**
     * Gets the month of the Ethiopian Calendar.
     */
    get month(): number;
    /**
     * Gets the day of the Ethiopian Calendar.
     */
    get day(): number;
    /**
     * Gets the month name in the Ethiopian Calendar.
     */
    get monthName(): string;
    /**
     * Gets an array of all months in the Ethiopian Calendar.
     */
    get allMonths(): string[];
    /**
     * Gets an array of day numbers in the Ethiopian Calendar.
     */
    get dayNumbers(): string[];
    /**
     * Gets an array of weekday names in the Ethiopian Calendar.
     */
    get weekdays(): string[];
    /**
     * Gets the next month in the Ethiopian Calendar.
     */
    get nextMonth(): ETC;
    /**
     * Gets the previous month in the Ethiopian Calendar.
     */
    get prevMonth(): ETC;
    /**
     * Gets the next year in the Ethiopian Calendar.
     */
    get nextYear(): ETC;
    /**
     * Gets the previous year in the Ethiopian Calendar.
     */
    get prevYear(): ETC;
    /**
     * Gets an array of days in the current month.
     * @param geezDay - If true, includes the Geez day numbers.
     * @param weekDayName - If true, includes the weekday names.
     * @returns An array of days in the current month.
     */
    monthDays(geezDay?: boolean, weekDayName?: boolean): any[];
    /**
     * Gets an array of days in the entire year.
     * @param geezDay - If true, includes the Geez day numbers.
     * @param weekDayName - If true, includes the weekday names.
     * @returns An array of days in the entire year.
     */
    yearDays(geezDay?: boolean, weekDayName?: boolean): any[];
    /**
     * Sets the date to the current system date.
     */
    today(): void;
    private _monthRange;
    private _monthDays;
    private toNumber;
}
