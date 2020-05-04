import EtDatetime from "../Abushakir/datetime";

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
        expect(someDate.dayGeez).toBe("፯");
    });
})

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
})