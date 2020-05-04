import EtDatetime from '../Abushakir/datetime';

describe('Testing EtDatetime with Parameterized Constructor...', () => {
  var someDate: EtDatetime = new EtDatetime(2012, 7, 7);

  test('Testing Year on Parameterized Constructor', () => {
    expect(someDate.year).toBe(2012);
  });

  test('Testing Month on Parameterized Constructor', () => {
    expect(someDate.month).toBe(7);
  });

  test('Testing Day on Parameterized Constructor', () => {
    expect(someDate.day).toBe(7);
  });

  test('Testing Date on Parameterized Constructor', () => {
    expect(someDate.dayGeez).toBe('፯');
  });
});

describe('Parameterized Constructors (year only)...', () => {
  var someyear: EtDatetime = new EtDatetime(2010);

  test('Testing Year on Parameterized Constructor', () => {
    expect(someyear.year).toBe(2010);
  });

  test('Testing Month on Parameterized Constructor', () => {
    expect(someyear.month).toBe(1);
  });

  test('Testing Day on Parameterized Constructor', () => {
    expect(someyear.day).toBe(1);
  });
});

describe('Parameterized Constructors (Full argument)...', () => {
  var someyear: EtDatetime = new EtDatetime(2012, 7, 7, 15, 12, 17, 500);

  test('Testing Year on Parameterized Constructor', () => {
    expect(someyear.year).toBe(2012);
  });

  test('Testing Month on Parameterized Constructor', () => {
    expect(someyear.month).toBe(7);
  });

  test('Testing Day on Parameterized Constructor', () => {
    expect(someyear.day).toBe(7);
  });

  test('Testing Hour on Parameterized Constructor', () => {
    expect(someyear.hour).toBe(15);
  });

  test('Testing Minute on Parameterized Constructor', () => {
    expect(someyear.minute).toBe(12);
  });

  test('Testing Second on Parameterized Constructor', () => {
    expect(someyear.second).toBe(17);
  });

  test('Testing MilliSecond on Parameterized Constructor', () => {
    expect(someyear.millisecond).toBe(500);
  });

  test('Testing ToString method on Parameterized Constructor', () => {
    expect(someyear.toString()).toEqual('2012-07-07 15:12:17.500');
  });

  test('Testing ToString method on Parameterized Constructor', () => {
    expect(someyear.toJson()).toEqual({
      year: '2012',
      month: '07',
      date: '07',
      hour: '15',
      min: '12',
      sec: '17',
      ms: '500',
    });
  });

  test('Testing ToString method on Parameterized Constructor', () => {
    expect(someyear.toIso8601String()).toEqual('2012-07-07T15:12:17.500');
  });
});

describe('Comparing two DateTime INSTANTS...', () => {
  var sometime: EtDatetime = new EtDatetime(2012, 7, 7, 15, 12, 17, 500);
  var beforeSometime: EtDatetime = new EtDatetime(2012, 6, 7, 15, 12, 17, 500);
  var equalToSometime: EtDatetime = new EtDatetime(2012, 7, 7, 15, 12, 17, 500);

  test('Testing Is After on Parameterized Constructor', () => {
    expect(sometime.isAfter(beforeSometime)).toBe(true);
  });

  test('Testing Is Before on Parameterized Constructor', () => {
    expect(sometime.isBefore(beforeSometime)).toBe(false);
  });

  test('Testing Is After on Parameterized Constructor', () => {
    expect(beforeSometime.isAfter(sometime)).toBe(false);
  });

  test('Testing Is Before on Parameterized Constructor', () => {
    expect(beforeSometime.isBefore(sometime)).toBe(true);
  });

  test('Testing Day on Parameterized Constructor', () => {
    expect(sometime.isAtSameMomentAs(equalToSometime)).toBe(true);
  });

  test('Testing Day on Parameterized Constructor', () => {
    expect(beforeSometime.isAtSameMomentAs(equalToSometime)).toBe(false);
  });
});
