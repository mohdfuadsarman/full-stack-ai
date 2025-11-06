const prompt = require('prompt-sync')();

var num = 0, firstDigit = 0;

num = Number(prompt('Enter a positive integer = '));

if(num > 0)
{
    firstDigit = num;

    while(firstDigit > 10)
    {        
        firstDigit = firstDigit / 10;        
    }

    firstDigit = Math.trunc(firstDigit);

    console.log('First digit of ' + num + ' is ' + firstDigit);
}
else
{
    console.log('Invalid positive integer');
}