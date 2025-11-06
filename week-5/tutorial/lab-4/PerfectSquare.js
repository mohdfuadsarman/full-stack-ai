const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    return Number(number);
}

function isSquare(num) {
    if (num < 0) {
        return false;
    }

    let left = 0;
    let right = num;

    // Binary search for perfect square
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let square = mid * mid;

        if (square === num) {
            return true;
        } else if (square < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

function main() {
    const number = getUserInput();
    if (isSquare(number)) {
        console.log(`${number} is a perfect square.`);
    } else {
        console.log(`${number} is not a perfect square.`);
    }
}

main();