const prompt = require('prompt-sync')();

var score = 0, grade = '';

score = prompt('Enter score as an integer between 0 and 100 = ');

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else if (score >= 60) {
    grade = 'D';
} else {
    grade = 'F';
}

console.log('The grade for a score of ' + score + ' is ' + grade);