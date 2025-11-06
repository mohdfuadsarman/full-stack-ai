const prompt = require('prompt-sync')();

var score = 0, grade = '';

score = prompt('Enter score as an integer between 0 and 100 = ');

switch (true) {
    case (score >= 90):
        grade = 'A';
        break;
    case (score >= 80):
        grade = 'B';
        break;
    case (score >= 70):
        grade = 'C';
        break;
    case (score >= 60):
        grade = 'D';
        break;
    default:
        grade = 'F';
}

console.log('The grade for a score of ' + score + ' is ' + grade);