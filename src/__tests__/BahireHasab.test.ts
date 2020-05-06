import BahireHasab from "../Abushakir/bh";

describe('Testing Bahire Hasab...', () => {
  var someYear: BahireHasab = new BahireHasab(2011);

  test('Testing Abekte', () => {
    expect(someYear.abekte).toBe(25);
  });

  test('Testing Metkih...', () => {
    expect(someYear.metkih).toBe(5);
  });

  test('Testing Nenewe...', () => {
    expect(someYear.nenewe).toEqual({ 'month': 'የካቲት', 'date': 11 });
  });

  test('Testing getSingleBealOrTsom for "ነነዌ"...', () => {
    expect(someYear.getSingleBealOrTsom("ነነዌ")).toEqual({ 'month': 'የካቲት', 'date': 11 });
  });

  test('Testing getSingleBealOrTsom for "ዓቢይ ጾም"...', () => {
    expect(someYear.getSingleBealOrTsom("ዓቢይ ጾም")).toEqual({ 'month': 'የካቲት', 'date': 25 });
  });

  test('Testing getSingleBealOrTsom for "ደብረ ዘይት"...', () => {
    expect(someYear.getSingleBealOrTsom("ደብረ ዘይት")).toEqual({ 'month': 'መጋቢት', 'date': 22 });
  });

  test('Testing getSingleBealOrTsom for "ሆሣዕና"...', () => {
    expect(someYear.getSingleBealOrTsom("ሆሣዕና")).toEqual({ 'month': 'ሚያዝያ', 'date': 13 });
  });

  test('Testing getSingleBealOrTsom for "ስቅለት"...', () => {
    expect(someYear.getSingleBealOrTsom("ስቅለት")).toEqual({ 'month': 'ሚያዝያ', 'date': 18 });
  });

  test('Testing getSingleBealOrTsom for "ትንሳኤ"...', () => {
    expect(someYear.getSingleBealOrTsom("ትንሳኤ")).toEqual({ 'month': 'ሚያዝያ', 'date': 20 });
  });

  test('Testing getSingleBealOrTsom for "ርክበ ካህናት"...', () => {
    expect(someYear.getSingleBealOrTsom("ርክበ ካህናት")).toEqual({ 'month': 'ግንቦት', 'date': 14 });
  });

  test('Testing getSingleBealOrTsom for "ዕርገት"...', () => {
    expect(someYear.getSingleBealOrTsom("ዕርገት")).toEqual({ 'month': 'ግንቦት', 'date': 29 });
  });

  test('Testing getSingleBealOrTsom for "ጰራቅሊጦስ"...', () => {
    expect(someYear.getSingleBealOrTsom("ጰራቅሊጦስ")).toEqual({ 'month': 'ሰኔ', 'date': 9 });
  });

  test('Testing getSingleBealOrTsom for "ጾመ ሐዋርያት"...', () => {
    expect(someYear.getSingleBealOrTsom("ጾመ ሐዋርያት")).toEqual({ 'month': 'ሰኔ', 'date': 10 });
  });

  test('Testing getSingleBealOrTsom for "ጾመ ድህነት"...', () => {
    expect(someYear.getSingleBealOrTsom("ጾመ ድህነት")).toEqual({ 'month': 'ሰኔ', 'date': 12 });
  });


});