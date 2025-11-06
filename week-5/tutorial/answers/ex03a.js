const prompt = require('prompt-sync')();

var ctype = '', amount = 0, camount = 0;

amount = prompt('Enter amount to convert in USD = ');

camount = amount * 1.31;
camount = Math.round(camount * 100) / 100;
console.log('USD $' + amount + ' = SDG $' + camount);
