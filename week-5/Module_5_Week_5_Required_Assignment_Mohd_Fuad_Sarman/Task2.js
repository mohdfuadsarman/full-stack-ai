// Task 2: Conditional Statements in JavaScript

const prompt = require('prompt-sync')();

function getUserInput() {
    const userInput = prompt("Please enter a number: ");
    if (isNaN(userInput)) {
        console.log("Invalid input. Please enter a valid number.");
        return getUserInput(); // Recursively ask for input again
    }
    return Number(userInput);
}

function isPositiveNegativeZero(num) {
    if (num > 0) {
        return "The number is positive.";
    } else if (num < 0) {
        return "The number is negative.";
    } else {
        return "The number is zero.";
    }
}

function main() {
    const userInput = getUserInput();
    const result = isPositiveNegativeZero(userInput);
    console.log(result);
}

main();
