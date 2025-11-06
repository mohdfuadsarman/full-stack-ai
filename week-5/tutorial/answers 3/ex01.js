const prompt = require('prompt-sync')();

var num = 0;

num = Number(prompt('Enter required number = '));

for(var i = 1; i < 11; i++)
{
    console.log(num + ' * ' + i + ' = ' + i * num);
}
