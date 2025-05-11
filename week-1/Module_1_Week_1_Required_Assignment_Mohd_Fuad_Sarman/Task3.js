// Task 3: Functions

// Declare a function that takes a name as an argument and print a greeting message
// In this case, function definition helps to encapsulate the logic of greeting a user which hides the complexity of the implementation
function greetUser(name) {
    // The ${name} syntax is used to insert the value of the name variable into the string
    // This will print a string that says "Hello, [name]!" where [name] is replaced with the actual name passed to the function
    console.log(`Hello, ${name}!`);
}

// Call the function with different names and print the greeting message
greetUser("Alice"); // Output: Hello, Alice!
greetUser("Bob"); // Output: Hello, Bob!
greetUser("Charlie"); // Output: Hello, Charlie!
greetUser(""); // Output: Hello, !
