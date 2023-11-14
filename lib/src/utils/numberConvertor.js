"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethiopicNumber = {
    1: '፩',
    2: '፪',
    3: '፫',
    4: '፬',
    5: '፭',
    6: '፮',
    7: '፯',
    8: '፰',
    9: '፱',
    10: '፲',
    20: '፳',
    30: '፴',
    40: '፵',
    50: '፶',
    60: '፷',
    70: '፸',
    80: '፹',
    90: '፺',
    100: '፻',
    10000: '፼',
};
function divide(denominator, numinator) {
    // let quetient: number = numinator / denominator;
    // let remainder: number = numinator % denominator;
    return [Math.floor(numinator / denominator), numinator % denominator];
}
function convert_1_2_10_to_ethiopic(num) {
    if (num < 1) {
        throw new Error(num + " doesn't exist in Ethiopic Numeric System.");
    }
    return ethiopicNumber[num];
}
function convert_11_2_100_to_ethiopic(num) {
    if (num === 100) {
        return ethiopicNumber[num];
    }
    else {
        var result = divide(10, num);
        return result[1] > 0
            ? "" + ethiopicNumber[result[0] * 10] + ethiopicNumber[result[1]]
            : "" + ethiopicNumber[result[0] * 10];
    }
}
function convert_101_2_1000_to_ethiopic(num) {
    var result = divide(100, num);
    if (result[1] === 0) {
        return "" + ethiopicNumber[result[0]] + ethiopicNumber[100];
    }
    var left = result[0] === 1 ? "" + ethiopicNumber[100] : "" + ethiopicNumber[result[0]] + ethiopicNumber[100];
    var right = result[1] <= 10 ? convert_1_2_10_to_ethiopic(result[1]) : convert_11_2_100_to_ethiopic(result[1]);
    return "" + left + right;
}
function ConvertToEthiopic(num) {
    if (typeof num !== 'number') {
        throw new TypeError('Please provide Integer');
    }
    if (num < 1) {
        throw new Error('Please provide number greater than 0');
    }
    if (num > 0 && num <= 10) {
        return convert_1_2_10_to_ethiopic(num);
    }
    if (num > 10 && num <= 100) {
        return convert_11_2_100_to_ethiopic(num);
    }
    if (num > 100 && num <= 1000) {
        return convert_101_2_1000_to_ethiopic(num);
    }
    if (num > 1000 && num <= 10000) {
        var result = divide(100, num);
        if (result[1] === 0) {
            return result[0] < 11
                ? "" + ethiopicNumber[result[0]] + ethiopicNumber[100]
                : "" + convert_11_2_100_to_ethiopic(result[0]) + ethiopicNumber[100];
        }
        var left = convert_11_2_100_to_ethiopic(result[0]);
        var right = result[1] < 11 ? convert_1_2_10_to_ethiopic(result[1]) : convert_11_2_100_to_ethiopic(result[1]);
        return "" + left + ethiopicNumber[100] + right;
    }
}
exports.default = ConvertToEthiopic;
