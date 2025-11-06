const prompt = require('prompt-sync')();

function getUserInput() {
    const userInput = prompt("Please enter a number: ");
    return parseInt(userInput, 10);
}

function getLastDigit(number) {
    if (isNaN(number)) {
        console.log("Invalid input. Please enter a valid number.");
        return null;
    }
    return number % 10;
}

function main() {
    const number = getUserInput();
    const lastDigit = getLastDigit(number);

    if (lastDigit !== null) {
        console.log(`The last digit of ${number} is ${lastDigit}.`);
    }
}

main();
