import Duration from '../src/utils/duration';

describe('Duration', () => {
  describe('Constructor', () => {
    it('constructs from named parameters', () => {
      const d = new Duration({ hours: 1, minutes: 30 });
      expect(d.inMinutes).toBe(90);
    });

    it('constructs from positional parameters', () => {
      const d = new Duration(1, 2, 30); // 1d 2h 30m
      expect(d.inMinutes).toBeCloseTo((1 * 24 * 60) + (2 * 60) + 30);
    });

    it('constructs from raw microseconds', () => {
      const d = new Duration(1_000_000);
      expect(d.inMicroseconds).toBe(1_000_000);
    });

    it('throws on invalid constructor input', () => {
      // @ts-ignore
      expect(() => new Duration('bad')).toThrow();
      // @ts-ignore
      expect(() => new Duration({ foo: 1 })).not.toThrow(); // unknown field ignored
    });
  });

  describe('Getters', () => {
    const d = new Duration({ days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1, microseconds: 1 });

    it('computes inDays', () => {
      expect(d.inDays).toBeCloseTo(1 + 1 / 24 + 1 / 1440 + 1 / 86400 + 1 / 86400000 + 1 / 86400000000);
    });

    it('computes inHours', () => {
      expect(d.inHours).toBeCloseTo(25.0169, 3);
    });

    it('computes inMinutes', () => {
      expect(d.inMinutes).toBeCloseTo(1501.014, 2);
    });

    it('computes inSeconds', () => {
      expect(d.inSeconds).toBeGreaterThan(90000);
    });

    it('computes inMilliseconds', () => {
      expect(d.inMilliseconds).toBeGreaterThan(90_000_000);
    });

    it('computes inMicroseconds', () => {
      expect(d.inMicroseconds).toBeGreaterThan(90_000_000_000);
    });

    it('detects negative durations', () => {
      const negative = new Duration(-1000);
      expect(negative.isNegative).toBe(true);
    });
  });

  describe('Math operations', () => {
    const d1 = new Duration(1_000_000); // 1 sec
    const d2 = new Duration(500_000);   // 0.5 sec

    it('adds durations', () => {
      expect(d1.add(d2).inMicroseconds).toBe(1_500_000);
    });

    it('subtracts durations', () => {
      expect(d1.subtract(d2).inMicroseconds).toBe(500_000);
    });

    it('multiplies durations', () => {
      expect(d1.multiply(2).inMicroseconds).toBe(2_000_000);
    });

    it('divides durations', () => {
      expect(d1.divide(2).inMicroseconds).toBe(500_000);
    });

    it('throws on division by zero', () => {
      expect(() => d1.divide(0)).toThrow();
    });

    it('returns absolute duration', () => {
      const neg = new Duration(-1_000_000);
      expect(neg.abs().inMicroseconds).toBe(1_000_000);
    });
  });

  describe('Comparisons', () => {
    const d1 = new Duration(1_000_000);
    const d2 = new Duration(2_000_000);

    it('gt / gte', () => {
      expect(d2.gt(d1)).toBe(true);
      expect(d2.gte(d1)).toBe(true);
      expect(d2.gte(d2)).toBe(true);
    });

    it('lt / lte', () => {
      expect(d1.lt(d2)).toBe(true);
      expect(d1.lte(d2)).toBe(true);
      expect(d1.lte(d1)).toBe(true);
    });

    it('equal', () => {
      expect(d1.equal(new Duration(1_000_000))).toBe(true);
      expect(d1.equal(d2)).toBe(false);
    });

    it('compareTo', () => {
      expect(d1.compareTo(d2)).toBe(-1);
      expect(d2.compareTo(d1)).toBe(1);
      expect(d1.compareTo(new Duration(1_000_000))).toBe(0);
    });
  });

  describe('Serialization', () => {
    const d = new Duration({ hours: 1, minutes: 1, seconds: 1, microseconds: 123456 });

    it('toString returns formatted string', () => {
        const d = new Duration({ hours: 1, minutes: 3, seconds: 4, microseconds: 456 });
        expect(d.toString()).toBe('01:03:04.000456');
    });      

    it('toJSON returns same as toString', () => {
      expect(d.toJSON()).toBe(d.toString());
    });

    it('valueOf returns raw microseconds', () => {
      expect(d.valueOf()).toBe(d.inMicroseconds);
    });

    it('Symbol.toStringTag returns "Duration"', () => {
      expect(Object.prototype.toString.call(d)).toBe('[object Duration]');
    });
  });

  // describe('Input coercion', () => {
    // it('coerces numeric strings to numbers', () => {
    //   const d = new Duration('123');
    //   expect(d.inMicroseconds).toBe(123);
    // });
  
    // it('returns 0 for non-numeric strings', () => {
    //   const d = new Duration('abc');
    //   expect(d.inMicroseconds).toBe(0);
    // });
  
    // it('throws on symbol input', () => {
    //   expect(() => new Duration(Symbol('x') as any)).toThrow('ARGUMENT ERROR: Invalid constructor usage.');
    // });
  
    // it('throws on object input', () => {
    //   expect(() => new Duration({} as any)).toThrow('ARGUMENT ERROR: Invalid constructor usage.');
    // });
  
    // it('throws on array input', () => {
    //   expect(() => new Duration([1, 2] as any)).toThrow('ARGUMENT ERROR: Invalid constructor usage.');
    // });
  // });  
});
