const prompt = require('prompt-sync')();

var temp = 0, ctemp = 0;

temp = Number(prompt('Input temperature to convert in Celsius: '));
ctemp = (temp - 32) * 5 / 9;
ctemp = Math.round(ctemp * 10) / 10;
console.log(temp +  ' Fahrenheit = ' + ctemp + ' Celsius');
