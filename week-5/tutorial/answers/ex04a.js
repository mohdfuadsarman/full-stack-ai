const prompt = require('prompt-sync')();

var temp = 0, ctemp = 0;

temp = Number(prompt('Input temperature to convert in Celsius: '));
ctemp = (temp * 9 / 5 ) + 32;
ctemp = Math.round(ctemp * 10) / 10;
console.log(temp + ' Celsius = ' + ctemp + ' Fahrenheit');
