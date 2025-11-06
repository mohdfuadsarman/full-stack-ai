const prompt = require('prompt-sync')();

var num1 = 0, num2 = 0, num3 = 0, smallest = 0;

num1 = Number(prompt('Enter num1 = '));
num2 = Number(prompt('Enter num2 = '));
num3 = Number(prompt('Enter num3 = '));

if(num1 <= num2 && num1 <= num3)
{
    smallest = num1;
}
else if(num2 <= num1 && num2 <= num3)
{
    smallest = num2;
}
else
{
    smallest = num3;
}

console.log('The smallest number is ' + smallest);
