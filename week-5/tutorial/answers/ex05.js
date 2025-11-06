const prompt = require('prompt-sync')();

var num = 0, lastDigit = 0;

num = Number(prompt('Enter number = '));
lastDigit = num % 10;

console.log('Last digit is ' + lastDigit);
