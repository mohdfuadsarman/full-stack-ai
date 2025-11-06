// Task 4: Functions and Scope

function calculateArea(length, width) {
    // Check if length and width are numbers
    if (typeof length !== 'number' || typeof width !== 'number') {
        return "Invalid input: Length and width must be numbers.";
    }

    // Check if length and width are positive
    if (length <= 0 || width <= 0) {
        return "Invalid input: Length and width must be positive numbers.";
    }

    // Calculate area of rectangle
    const area = length * width;

    return roundToMaxTwoDecimalPlaces(area); // Round to max 2 decimal places
}

function roundToMaxTwoDecimalPlaces(num) {
    return Math.round(num * 100) / 100;
}

function main() {
    const testCases = [
        { length: 5, width: 10 }, // Expected output: 50
        { length: -5, width: 10 }, // Expected output: "Invalid input: Length and width must be positive numbers."
        { length: 7.5, width: 2 }, // Expected output: 15
        { length: 'a', width: 10 }, // Expected output: "Invalid input: Length and width must be numbers."
        { length: 5, width: 'b' }, // Expected output: "Invalid input: Length and width must be numbers."
        { length: 0, width: 10 }, // Expected output: "Invalid input: Length and width must be positive numbers."
        { length: 3.5, width: 4.2 }, // Expected output: 14.7
    ];

    testCases.forEach(testCase => {
        const { length, width } = testCase;
        const result = calculateArea(length, width);
        console.log(`calculateArea(${length}, ${width}) = ${result}`);
    }
    );
}

main();
