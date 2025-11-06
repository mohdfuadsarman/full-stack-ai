const prompt = require('prompt-sync')();

function getUserInput() {
    const listOfNumbers = prompt('Enter a list of numbers separated by commas: ');
    const numbers = listOfNumbers.split(',').map(Number);
    return numbers;
}

function bubbleSort(arr) {
    let swapped;
    for (let i = 0; i < arr.length - 1; i++) {
        swapped = false;
        // After each pass, the largest element is at the end of the array
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // sorting is over
        if (!swapped)
            break;
    }

    return arr;
}

function main() {
    const numbers = getUserInput();
    if (numbers.some(isNaN)) {
        console.log('Invalid input. Please enter valid numbers.');
        return;
    }
    const sortedNumbers = bubbleSort(numbers);
    console.log(`Sorted numbers: ${sortedNumbers}`);
}

main();
