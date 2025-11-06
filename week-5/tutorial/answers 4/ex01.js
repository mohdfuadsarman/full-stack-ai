const prompt = require('prompt-sync')();

var num = 0, isPerfectSquare = false;

num = Number(prompt('Enter required number = '));

if(num >= 0 && num <= 100)
{
    for(var i = 1; i < 11; i++)
    {
        if(num == (i * i))
        {
            isPerfectSquare = true;
            break;
        }
    }
    
    if(isPerfectSquare == true)
    {
        console.log(num + ' is a perfect square');
    }
    else
    {
        console.log(num + ' is NOT a perfect square');
    }
}
else
{
    console.log('Invalid number');
}