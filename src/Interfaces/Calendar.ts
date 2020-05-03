interface Calendar {
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getMonthName(): String;

    // Methods
    monthDays(): Array<undefined>;
    yearDays(): Array<undefined>;

}

interface BH {
    //
}

export {
    Calendar,
    BH
}