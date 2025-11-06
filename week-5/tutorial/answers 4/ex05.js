const prompt = require('prompt-sync')();

var rnum = 0, guess = 0, guessCount = 0, response = '';

while(true)
{
    rnum = Math.trunc(Math.random() * 100) + 1;
    guess = 0;
    guessCount = 0
    
    while(guess != rnum)
    {
        guessCount++;
        guess = Number(prompt('Enter your guess = '));

        if(guess > rnum)
        {
            console.log('Your guess is too big');
        }
        else if(guess < rnum)
        {
            console.log('Your guess is too small');
        }
    }

    console.log('You have guessed ' + rnum + ' correctly in ' + guessCount + ' attempts');

    response = prompt('Do you want to continue playing the game? (Y to continue) = ');

    if(response != 'Y')
    {
        break;
    }    
}

console.log('Goodbye!');
