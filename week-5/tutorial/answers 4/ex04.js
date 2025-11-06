const prompt = require('prompt-sync')();

var num = 0, digit = 0, tempDigit, numOfDigit = 0, requiredNumOfDivision = 0;

num = Number(prompt('Enter a positive integer = '));
digit = Number(prompt('Enter the required digit = '));

if(num > 0 && digit > 0)
{
    tempDigit = num;
    numOfDigit = 1;

    while(tempDigit > 10)
    {        
        tempDigit = tempDigit / 10;
        numOfDigit++;
    }

    if(digit <= numOfDigit)
    {
        requiredNumOfDivision = numOfDigit - digit;
        tempDigit = num;

        for(var i = 0; i < requiredNumOfDivision; i++)
        {
            tempDigit = tempDigit / 10;
        }

        tempDigit = Math.trunc(tempDigit);

        console.log('The ' + digit + ' digit of ' + num + ' is ' + tempDigit % 10);
    }
    else
    {
        console.log('Required digit is more than the number of available digit');
    }
}
else
{
    console.log('Invalid positive integer or required digit');
}