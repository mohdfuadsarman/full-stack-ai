const prompt = require('prompt-sync')();

var limit = 0, x = 0, sum = 0;

limit = Number(prompt('Enter limit = '));
x = Number(prompt('Enter x = '));

for (let i = x; i <= limit; i += x) 
{
    sum += i;
}

console.log('Sum of multiples of ' + x + ' up to ' + limit + ' is ' + sum);
