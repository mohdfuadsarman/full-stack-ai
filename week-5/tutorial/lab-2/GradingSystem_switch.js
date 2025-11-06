const prompt = require('prompt-sync')();

const Grade_A = 90;
const Grade_B = 80;
const Grade_C = 70;
const Grade_D = 60;

function getUserInput() {
    const score = prompt('Enter your score: ');
    return parseInt(score, 10);
}

function calculateGrade(score) {
    switch (true) {
        case score >= Grade_A:
            return 'A';
        case score >= Grade_B:
            return 'B';
        case score >= Grade_C:
            return 'C';
        case score >= Grade_D:
            return 'D';
        default:
            return 'F';
    }
}

function main() {
    const score = getUserInput();
    if (isNaN(score) || score < 0 || score > 100) {
        console.log('Invalid input. Please enter a score between 0 and 100.');
        return;
    }

    const grade = calculateGrade(score);
    console.log(`Your grade is: ${grade}`);
}

main();
