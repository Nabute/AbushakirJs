

const ethiopic_number: any = {
    1: "፩", 2: "፪", 3: "፫", 4: "፬", 5: "፭", 6: "፮", 7: "፯", 8: "፰",
    9: "፱", 10: "፲", 20: "፳", 30: "፴", 40: "፵", 50: "፶", 60: "፷", 70: "፸",
    80: "፹", 90: "፺", 100: "፻", 10000: "፼"
};


function divide(denominator: number, numinator: number): Array<number> {
    // let quetient: number = numinator / denominator;
    // let remainder: number = numinator % denominator;

    return [numinator / denominator, numinator % denominator]
}

function convert_1_2_10_to_ethiopic(num: number): string {
    if (num < 1) {
        throw `${num} doesn't exist in Ethiopic Numeric System.`;
    }
    return ethiopic_number[num];
}

function convert_11_2_100_to_ethiopic(num: number) {
    if (num == 100) {
        return ethiopic_number[num]
    }
    else {
        let result = divide(10, num)
        return result[1] > 0 ? `${ethiopic_number[result[0] * 10]}${ethiopic_number[result[1]]}` : `${ethiopic_number[result[0] * 10]}`
    }
}

function convert_101_2_1000_to_ethiopic(num: number) {
    let result = divide(100, num)
    if (result[1] == 0) {
        return '{ethiopic_number[q]}{ethiopic_number[100]}'
    }
    let left: string;
    result[1] <= 10 ? left = convert_1_2_10_to_ethiopic(result[0]) : left = convert_11_2_100_to_ethiopic(result[0])

    let right: string;
    result[1] <= 10 ? right = convert_1_2_10_to_ethiopic(result[1]) : right = convert_11_2_100_to_ethiopic(result[1])

    return `${left}${right}`
}


function convert_to_ethiopic(num: number) {

    if (typeof num !== "number") {
        throw ("Please provide Integer")
    }

    if (num < 1) {
        throw ("Please provide number greater than 0")
    }

    if (num > 0 && num <= 10) {
        return convert_1_2_10_to_ethiopic(num)
    }

    if (num > 10 && num <= 100) {
        return convert_11_2_100_to_ethiopic(num)
    }

    if (num > 100 && num <= 1000) {
        return convert_101_2_1000_to_ethiopic(num)
    }

    if (num > 1000 && num <= 10000) {
        let result = divide(100, num)
        if (result[1] == 0) {
            return result[0] < 11 ? `${ethiopic_number[result[0]]}${ethiopic_number[100]}` : `${convert_11_2_100_to_ethiopic(result[0])}${ethiopic_number[100]}`
        }
        let left = convert_11_2_100_to_ethiopic(result[0])
        let right = result[1] < 11 ? convert_1_2_10_to_ethiopic(result[1]) : convert_11_2_100_to_ethiopic(result[1])

        return `${left}${ethiopic_number[100]}${right}`
    }

}


export default convert_to_ethiopic