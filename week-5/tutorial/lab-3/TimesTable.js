const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    return parseInt(number, 10);
}

function generateTimesTable(number) {
    const timesTable = [];
    for (let i = 1; i <= 10; i++) {
        timesTable.push(number * i);
    }
    return timesTable;
}

function main() {
    const number = getUserInput();
    if (isNaN(number)) {
        console.log('Invalid input. Please enter a valid number.');
        return;
    }

    const timesTable = generateTimesTable(number);
    console.log(`Times table for ${number}:`);
    console.log(timesTable.join(', '));
}

main();