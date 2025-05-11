// Task 2: Control Flow

// Declare a function that checks if a number is even
// This function takes a number as an argument and returns true if the number is even, otherwise false
function isEven(num) {
    // Check if the number is divisible by 2
    // If the division has no remainder, it is divisible by 2 and hence even, this will return true
    // If the division has a remainder, it is not divisible by 2 and hence odd, this will return false
    return num % 2 === 0;
}

// Declare a function that checks if a number is even or odd
// This function takes a number as an argument and uses the isEven() function to determine if it is even or odd
function checkNumber(num) {
    // Check if the number is even using the isEven function
    if (isEven(num)) {
        // If it is even, print Even
        console.log("Even");
    } else {
        // If it is not even, print Odd
        console.log("Odd");
    }
}

checkNumber(10); // Output: Even
checkNumber(7); // Output: Odd
checkNumber(999999999999999); // Output: Odd
checkNumber(-4); // Output: Even
