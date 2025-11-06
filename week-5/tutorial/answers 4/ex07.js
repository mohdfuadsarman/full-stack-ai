const prompt = require('prompt-sync')();

var  word = '', stop = 0, isPalindrome = true;

word = prompt('Enter the required word to check for palindrome = ');

if(word != null && word.length > 0)
{
    word = word.toLowerCase();
    stop = Math.trunc(word.length / 2);

    for(var i = 0; i < stop; i++)
    {
        if(word[i] != word[word.length - i - 1])
        {
            isPalindrome = false;
            break;
        }
    }

    if(isPalindrome == true)
    {
        console.log(word + ' is a palindrome');
    }
    else
    {
        console.log(word + ' is NOT a palindrome');
    }
}
else
{
    console.log('No word was entered')
}