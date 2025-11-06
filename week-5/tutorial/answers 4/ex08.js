const prompt = require('prompt-sync')();

var num = Number(prompt('Enter a positive integer: '));

if (num > 0)
{
    while (num != 1)
    {
        console.log(num);

        if (num % 2 == 0)
        {
            num = num / 2;
        }
        else
        {
            num = num * 3 + 1
        }
    }

    console.log(num);
}
else
{
    console.log('ERROR!: You have entered an invalid number');
}