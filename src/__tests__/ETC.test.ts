import ETC from '../Abushakir/etc';
import { constants } from '../utils/constants';

describe('Testing Ethiopian Calendar for "ጷጉሜን" month...', () => {
  const someYear: ETC = new ETC(2011, 13, 6);

  test('Testing Year', () => {
    expect(someYear.year).toBe(2011);
  });

  test('Testing Month...', () => {
    expect(someYear.month).toBe(13);
  });

  test('Testing Day...', () => {
    expect(someYear.day).toBe(6);
  });

  test('Testing Month Name...', () => {
    expect(someYear.monthName).toBe('ጷጉሜን');
  });

  test('Testing All Months...', () => {
    expect(someYear.allMonths).toEqual(constants._months);
  });

  test('Testing Day Numbers...', () => {
    expect(someYear.dayNumbers).toEqual(constants._dayNumbers);
  });

  test('Testing Weekdays...', () => {
    expect(someYear.weekdays).toEqual(constants._weekdays);
  });
});
