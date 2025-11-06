const prompt = require('prompt-sync')();

function getUserInput() {
    const word = prompt('Please enter a word: ');
    return word;
}

function isPalindrome(word) {
    const length = word.length;
    const stop = Math.trunc(length / 2);

    for (let i = 0; i < stop; i++) {
        if (word[i] !== word[length - i - 1]) {
            return false; // Not a palindrome
        }
    }
    return true; // Is a palindrome
}

function main() {
    const word = getUserInput();
    if (isPalindrome(word.toLowerCase())) {
        console.log(`${word} is a palindrome.`);
    } else {
        console.log(`${word} is not a palindrome.`);
    }
}

main();
