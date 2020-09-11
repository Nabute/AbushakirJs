export default class BahireHasab {
    private _year;
    constructor(year: number);
    get ameteAlem(): number;
    getEvangelist(returnName?: boolean): string;
    getMeskeremOne(returnName?: boolean): string;
    get wenber(): number;
    get abekte(): number;
    get metkih(): number;
    yebealeMetkihWer(): number;
    get nenewe(): {
        month: string;
        date: number;
    };
    get allAtswamat(): {
        beal: string;
        day: object;
    }[];
    isMovableHoliday(holidayName: string): boolean;
    getSingleBealOrTsom(name: string): {
        month: string;
        date: number;
    } | undefined;
}
