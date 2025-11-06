function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

let form1 = document.querySelector('#form1');

form1.addEventListener("submit", (e) => {
    e.preventDefault();

    handleInput();
  });

function handleInput() {
    const num1 = parseInt(document.querySelector('#num1').value, 10);
    const num2 = parseInt(document.querySelector('#num2').value, 10);

    if (isNaN(num1) || isNaN(num2)) {
        document.querySelector('#result').textContent = 'Please enter valid numbers.';
        return;
    }

    printSum(num1, num2);
}

function printSum(a, b) {
    const sum = add(a, b);
    const resultElement = document.querySelector('#result');
    resultElement.textContent = `The sum of ${a} and ${b} is ${sum}`;
}
