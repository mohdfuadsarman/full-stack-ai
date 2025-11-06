const prompt = require('prompt-sync')();

function getUserInput() {
    const number = prompt('Please enter a number: ');
    const power = prompt('Please enter the power: ');
    return { number: Number(number), power: Number(power) };
}

function calculatePower(number, power) {
    if (power === 0) {
        return 1;
    }
    if (power < 0) {
        return 1 / calculatePower(number, -power);
    }
    return number * calculatePower(number, power - 1);
}

function main() {
    const { number, power } = getUserInput();
    if (isNaN(number) || isNaN(power)) {
        console.log('Invalid input. Please enter valid numbers.');
        return;
    }
    const result = calculatePower(number, power);
    console.log(`${number} raised to the power of ${power} is: ${result}`);
}
main();