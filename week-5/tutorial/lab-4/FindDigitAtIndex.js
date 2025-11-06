const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    const index = prompt('Please enter an index: ');
    return { number: parseInt(number), index: parseInt(index) };
}

function findDigitAtIndex(number, index) {
    let digitArray = [];
    let i = 0;
    do {
        digitArray[i] = number % 10;
        number = Math.floor(number / 10);
        i++;
    } while (number > 0);

    digitArray = digitArray.reverse(); // Reverse the array to get the correct order

    const length = digitArray.length;
    if (index <= 0 || index > length) {
        return -1; // Invalid index
    }
    return digitArray[index - 1]; // Return the digit at the specified index

}

function main() {
    const { number, index } = getUserInput();
    const digit = findDigitAtIndex(number, index);
    if (digit === -1) {
        console.log(`Invalid index: ${index}. The number has only ${number.toString().length} digits.`);
        return;
    }
    if (isNaN(digit)) {
        console.log('Invalid input. Please enter valid numbers.');
        return;
    }
    if (digit < 0) {
        console.log(`The number ${number} has no digit at index ${index}.`);
        return;
    }
    console.log(`The digit at index ${index} in the number ${number} is: ${digit}`);
}

main();
