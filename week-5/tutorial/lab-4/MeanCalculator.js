const prompt = require('prompt-sync')();

function getUserInput() {
    const listOfNumbers = prompt('Enter a list of numbers separated by commas: ');
    const numbers = listOfNumbers.split(',').map(Number);
    return numbers;
}

function calculateArithmeticMean(numbers) {
    // num is an array of numbers
    // acc is the accumulator
    // acc initially 0
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

function calculateGeometricMean(numbers) {
    // num is an array of numbers
    // acc is the accumulator
    // acc initially 1 to avoid multiplication by 0
    const product = numbers.reduce((acc, num) => acc * num, 1);
    return Math.pow(product, 1 / numbers.length);
}

function calculateHarmonicMean(numbers) {
    // num is an array of numbers
    // acc is the accumulator
    // acc initially 0
    const reciprocalSum = numbers.reduce((acc, num) => acc + 1 / num, 0);
    return numbers.length / reciprocalSum;
}

function calculateMeans(numbers) {
    const arithmeticMean = calculateArithmeticMean(numbers);
    const geometricMean = calculateGeometricMean(numbers);
    const harmonicMean = calculateHarmonicMean(numbers);

    return {
        arithmeticMean,
        geometricMean,
        harmonicMean
    };
}

function main() {
    const numbers = getUserInput();
    const means = calculateMeans(numbers);

    console.log(`Arithmetic Mean: ${means.arithmeticMean}`);
    console.log(`Geometric Mean: ${means.geometricMean}`);
    console.log(`Harmonic Mean: ${means.harmonicMean}`);
}

main();