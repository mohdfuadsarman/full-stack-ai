const prompt = require('prompt-sync')();

function getUserInput() {
    const limit = prompt('Enter the limit for the sum of multiplies of x: ');
    const x = prompt('Enter value of x: ');
    return { limit: Number(limit), x: Number(x) };
}

function calculateSumOfMultiples(limit, x) {
    let sum = 0;
    // for (let i = 1; i < limit; i++) {
    //     if (i % x === 0) {
    //         sum += i;
    //     }
    // }
    for (let i = x; i < limit; i += x) {
        sum += i;
    }
    return sum;
}

function main() {
    const { limit, x } = getUserInput();
    if (isNaN(limit) || isNaN(x) || limit <= 0 || x <= 0) {
        console.log('Please enter valid positive numbers for limit and x.');
        return;
    }
    const sum = calculateSumOfMultiples(limit, x);
    console.log(`The sum of multiples of ${x} below ${limit} is: ${sum}`);
}

main();
