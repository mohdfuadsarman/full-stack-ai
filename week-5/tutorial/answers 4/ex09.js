const prompt = require('prompt-sync')();

function arithmeticMean(nums)
{
    var summation = 0;

    for(const num of nums)
    {
        summation += num
    }

    return summation / nums.length;
}

function geometricMean(nums)
{
    var product = 1;

    for(const num of nums)
    {
        product *= num
    }

    return product ** (1 / nums.length);
}

function harmonicMean(nums)
{
    var reciprocalSummation = 0;

    for(const num of nums)
    {
        reciprocalSummation += (1 / num)
    }

    return nums.length / reciprocalSummation;
}

function round(num)
{
    return Math.round(num * 1000) / 1000;
}

var nums = [], num = 0;

while (true)
{
    num = Number(prompt('Enter an integer number: '));

    if(!isNaN(num))
    {
        nums.push(num);
    }
    else
    {
        console.log('Invalid integer number');
        break;
    }
}

console.log(nums);

console.log('Arithmetic mean is ' + round(arithmeticMean(nums)));
console.log('Geometric mean is ' + round(geometricMean(nums)));
console.log('Harmonic mean is ' + round(harmonicMean(nums)));  
