const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    return Number(number);
}

function collatzConjecture(n) {
    if (n <= 0) {
        console.log("Please enter a positive integer.");
        return;
    }

    let steps = 0;
    let arr = [];
    arr.push(n);
    console.log(`Starting with ${n}`);

    while (n !== 1) {
        // Check if n is even or odd
        if (n % 2 === 0) {
            // If even, divide by 2
            n = n / 2;
        } else {
            // If odd, multiply by 3 and add 1
            n = 3 * n + 1;
        }
        arr.push(n);
        steps++;
        console.log(`Step ${steps}: ${n}`);
    }

    console.log(`Total steps: ${steps}`);
    console.log(`Sequence: ${arr.join(', ')}`);
}

function main() {
    const number = getUserInput();
    collatzConjecture(number);
}

main();