const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    return Number(number);
}

function getFirstDigit(number) {
    while (number >= 10) {
        number = Math.floor(number / 10);
    }
    return number;
}

function getLastDigit(number) {
    return number % 10;
}

function main() {
    const number = getUserInput();
    if (isNaN(number) || number < 0) {
        console.log('Please enter a valid positive number.');
        return;
    }

    const firstDigit = getFirstDigit(number);
    const lastDigit = getLastDigit(number);

    console.log(`The first digit is: ${firstDigit}`);
    console.log(`The last digit is: ${lastDigit}`);
}

main();
