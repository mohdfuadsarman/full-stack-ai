const prompt = require('prompt-sync')();

var chicken_per_diner = 0, rice_per_diner = 0, chili_per_diner = 0, num_of_diner = 0;

chicken_per_diner = Number(prompt('Enter amount of chicken per diner = '));
rice_per_diner = Number(prompt('Enter amount of rice per diner = '));
chili_per_diner = Number(prompt('Enter amount of chili per diner = '));
num_of_diner = Number(prompt('Enter number of diner(s) = '));

var total_chicken = chicken_per_diner * num_of_diner;
var total_rice = rice_per_diner * num_of_diner;
var total_chili = chili_per_diner * num_of_diner;

console.log('Total amount of chicken is ' + total_chicken);
console.log('Total amount of rice is ' + total_rice);
console.log('Total amount of chili is ' + total_chili);
