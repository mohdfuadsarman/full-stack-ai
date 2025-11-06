const prompt = require('prompt-sync')();

var ttype = '', temp = 0, ctemp = 0;

ttype = prompt('Enter temperature comversion type (c or f) = ');

if(ttype == 'c')
{
    temp = Number(prompt('Input temperature to convert in Celsius: '));

    if(temp >= 0 && temp <= 100)
    {
        ctemp = (temp * 9 / 5 ) + 32
        ctemp = Math.round(ctemp * 100) / 100;
        console.log(temp + ' Celsius = ' + ctemp + ' Fahrenheit');
    }
    else
    {
        console.log('Invalid temperature in Celsius');
    }
}
else if(ttype == 'f')
{
    temp = Number(prompt('Input temperature to convert in Fahrenheit: '));

    if(temp >= 32 && temp <= 212)
    {
        ctemp = (temp - 32) * 5 / 9;
        ctemp = Math.round(ctemp * 100) / 100;
        console.log(temp + ' Fahrenheit = ' + ctemp + ' Celsius');
    }
    else
    {
        console.log('Invalid temperature in Fahrenheit');
    }
}
else
{
    console.log('Invalid temperature comversion type');
}
