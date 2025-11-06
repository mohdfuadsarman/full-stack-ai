const prompt = require('prompt-sync')();

const currencyRates = {
    USD: {
        SGD: 1.3100,
    },
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (currencyRates[fromCurrency] && currencyRates[fromCurrency][toCurrency]) {
        return amount * currencyRates[fromCurrency][toCurrency];
    }
    else if (currencyRates[toCurrency] && currencyRates[toCurrency][fromCurrency]) {
        return amount / currencyRates[toCurrency][fromCurrency];
    } else {
        throw new Error(`Conversion from ${fromCurrency} to ${toCurrency} is not supported.`);
    }
}

function getUserInput() {
    const fromCurrency = prompt("Enter the currency you want to convert from (USD/SGD): ").toUpperCase();
    const toCurrency = prompt("Enter the currency you want to convert to (USD/SGD): ").toUpperCase();
    const amount = parseFloat(prompt(`Enter the amount in ${fromCurrency}: `));
    return { fromCurrency, toCurrency, amount };
}

function main() {
    try {
        const { fromCurrency, toCurrency, amount } = getUserInput();
        const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
    } catch (error) {
        console.error(error.message);
    }
}

main();