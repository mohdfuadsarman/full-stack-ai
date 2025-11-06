const prompt = require('prompt-sync')();

function getUserInput() {
    const listOdNumbers = prompt('Enter a list of numbers separated by commas: ');
    const numbers = listOdNumbers.split(',').map(Number);
    return numbers;
}

function getLargestNumber(numbers) {
    let largest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }
    return largest;
}

function getSmallestNumber(numbers) {
    let smallest = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < smallest) {
            smallest = numbers[i];
        }
    }
    return smallest;
}

function main() {
    const numbers = getUserInput();
    const largest = getLargestNumber(numbers);
    const smallest = getSmallestNumber(numbers);
    console.log(`The largest number is: ${largest}`);
    console.log(`The smallest number is: ${smallest}`);
}

main();
