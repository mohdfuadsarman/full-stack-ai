const prompt = require('prompt-sync')();

var num = 0, i = 0, isPerfectSquare = false;

num = Number(prompt('Enter required number = '));

if (num >= 0)
{
    while (i * i <= num)
    {
        if (num == (i * i))
        {
            isPerfectSquare = true;
            break;
        }

        i++;
    }   
}

if (isPerfectSquare == true)
{
    console.log(num + ' is a perfect square');
}
else
{
    console.log(num + ' is NOT a perfect square');
}
