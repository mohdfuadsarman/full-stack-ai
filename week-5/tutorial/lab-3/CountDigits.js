const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    return Number(number);
}

function countDigits(num) {
    let count = 0;
    if (num === 0) {
        return 1; // Special case for 0
    }
    if (num < 0) {
        num = -num; // Make it positive
    }
    while (num > 0) {
        num = Math.floor(num / 10);
        count++;
    }
    return count;
}

function main() {
    const number = getUserInput();
    const digitCount = countDigits(number);
    console.log(`The number of digits in ${number} is: ${digitCount}`);
}

main();