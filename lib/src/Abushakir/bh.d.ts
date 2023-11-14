/**
 * Represents a class for Bahire Hasab calculations.
 */
export default class BahireHasab {
    private _year;
    /**
     * Initializes a new instance of the BahireHasab class.
     * @param {number} year - The Ethiopian year (negative for the current year).
     */
    constructor(year: number);
    /**
     * Gets the current Ethiopian year.
     */
    get ameteAlem(): number;
    /**
     * Gets the Evangelist for the current year.
     * @param {boolean} returnName - If true, returns the name; otherwise, returns the number.
     * @returns {string | number} - The Evangelist name or number.
     */
    getEvangelist(returnName?: boolean): string | number;
    /**
     * Gets the Meskerem One for the current year.
     * @param {boolean} returnName - If true, returns the name; otherwise, returns the number.
     * @returns {string | number} - The Meskerem One name or number.
     */
    getMeskeremOne(returnName?: boolean): string;
    /**
     * Gets the Wenber value for the current year.
     */
    get wenber(): number;
    /**
     * Gets the Abeqte value for the current year.
     */
    get abekte(): number;
    /**
     * Gets the Metkih value for the current year.
     */
    get metkih(): number;
    /**
     * Determines the Yebeale Metkih Wer for the current year.
     */
    yebealeMetkihWer(): number;
    /**
     * Gets the Nenewe (month and date) for the current year.
     * @returns {{ month: string; date: number }} - The Nenewe information.
     */
    get nenewe(): {
        month: string;
        date: number;
    };
    /**
     * Gets all Atswamat for the current year.
     * @returns {{ beal: string; day: object }[]} - Array of Atswamat information.
     */
    get allAtswamat(): {
        beal: string;
        day: object;
    }[];
    /**
     * Checks if a holiday is movable.
     * @param {string} holidayName - The name of the holiday.
     * @returns {boolean} - True if movable; otherwise, false.
     * @throws {Error} - If the holiday is not movable.
     */
    isMovableHoliday(holidayName: string): boolean;
    /**
     * Gets the date for a single Beal or Tsom.
     * @param {string} name - The name of the Beal or Tsom.
     * @returns {{ month: string; date: number } | undefined} - The date information, or undefined if not movable.
     */
    getSingleBealOrTsom(name: string): {
        month: string;
        date: number;
    } | undefined;
}
