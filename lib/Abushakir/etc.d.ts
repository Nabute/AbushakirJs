import { Calendar } from '../Interfaces/Calendar';
export default class ETC implements Calendar {
    private _date;
    constructor(...args: any[]);
    get year(): number;
    get month(): number;
    get day(): number;
    get monthName(): string;
    get allMonths(): string[];
    get dayNumbers(): string[];
    get weekdays(): string[];
    get nextMonth(): ETC;
    get prevMonth(): ETC;
    get nextYear(): ETC;
    get prevYear(): ETC;
    monthDays(geezDay?: boolean, weekDayName?: boolean): any[];
    yearDays(geezDay?: boolean, weekDayName?: boolean): any[];
    today(): void;
    private _monthRange;
    private _monthDays;
    private toNumber;
}
