const prompt = require('prompt-sync')();

function getUserInput() {
    const age = prompt('Guess the computer\'s age, press q to exit: ');
    return age;
}

function checkGuess(guess, actualAge, attempts) {
    if (guess < actualAge) {
        console.log('Too low! Try again.');
        return false;
    } else if (guess > actualAge) {
        console.log('Too high! Try again.');
        return false;
    } else {
        console.log('Congratulations! You guessed the correct age! You took ' + attempts + ' attempts.');
        return true;
    }
}

function playGame() {
    const actualAge = Math.floor(Math.random() * 100) + 1; // Random age between 1 and 100
    let guessedCorrectly = false;
    let userGuess = '';
    let attempts = 0;

    console.log('Welcome to the Age Guessing Game!');
    console.log('Try to guess the computer\'s age (between 1 and 100).');

    while (!guessedCorrectly) {
        userGuess = getUserInput();
        attempts++;
        if (userGuess === 'q') {
            console.log('You exited the game.');
            break;
        }
        guessedCorrectly = checkGuess(Number(userGuess), actualAge, attempts);
    }
}

playGame();