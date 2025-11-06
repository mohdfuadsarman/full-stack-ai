const prompt = require('prompt-sync')();

var ctype = '', amount = 0, camount = 0;

amount = prompt('Enter amount to convert in SGD = ');

camount = amount / 1.31;
console.log('SGD $' + amount + ' = USD $' + camount);
