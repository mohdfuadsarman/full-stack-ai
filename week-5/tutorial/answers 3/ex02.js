const prompt = require('prompt-sync')();

var base = 0, exp = 0, result = 0;

base = Number(prompt('Enter required base = '));
exp = Number(prompt('Enter required exponent = '));

result = base;

for (var i = 1; i < exp; i++) 
{
    result *= base;
}

console.log(base + ' raised to the power of ' + exp + ' is ' + result);
