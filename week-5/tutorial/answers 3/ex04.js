const prompt = require('prompt-sync')();

var n = 0, count = 0;

n = Number(prompt('Enter a positive integer = '));

while (n > 0)
{
    n = Math.floor(n / 10);
    count++;
}

console.log('Number of digits in the number is ' + count);
