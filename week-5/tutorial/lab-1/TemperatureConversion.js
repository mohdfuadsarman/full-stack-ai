const prompt = require('prompt-sync')();

const temperature = {
    c: {
        celsius: null,
        farenheit: function () {
            return (this.celsius * 9 / 5) + 32;
        },
        kelvin: function () {
            return this.celsius + 273.15;
        },
    },
    f: {
        farenheit: null,
        celsius: function () {
            return (this.farenheit - 32) * 5 / 9;
        },
        kelvin: function () {
            return (this.farenheit - 32) * 5 / 9 + 273.15;
        },
    },
    k: {
        kelvin: null,
        celsius: function () {
            return this.kelvin - 273.15;
        },
        farenheit: function () {
            return (this.kelvin - 273.15) * 9 / 5 + 32;
        },
    }
}

function getUserInput() {
    const temp = prompt("Enter the temperature: ");
    const unit = prompt("Enter the unit (C/F/K): ").toLowerCase();
    return { temp: parseFloat(temp), unit };
}

function convertTemperature(temp, unit) {
    if (unit === 'c') {
        temperature.c.celsius = temp;
        return {
            celsius: temp,
            farenheit: temperature.c.farenheit(),
            kelvin: temperature.c.kelvin()
        };
    } else if (unit === 'f') {
        temperature.f.farenheit = temp;
        return {
            celsius: temperature.f.celsius(),
            farenheit: temp,
            kelvin: temperature.f.kelvin()
        };
    } else if (unit === 'k') {
        temperature.k.kelvin = temp;
        return {
            celsius: temperature.k.celsius(),
            farenheit: temperature.k.farenheit(),
            kelvin: temp
        };
    } else {
        throw new Error("Invalid unit. Please enter C, F, or K.");
    }
}

function roundToOneDecimalPlaces(num) {
    return Math.round(num * 10) / 10;
}

function main() {
    try {
        const { temp, unit } = getUserInput();
        const convertedTemp = convertTemperature(temp, unit);
        console.log(`Converted temperatures:`);
        console.log(`Celsius: ${roundToOneDecimalPlaces(convertedTemp.celsius)}`);
        console.log(`Farenheit: ${roundToOneDecimalPlaces(convertedTemp.farenheit)}`);
        console.log(`Kelvin: ${roundToOneDecimalPlaces(convertedTemp.kelvin)}`);
    } catch (error) {
        console.error(error.message);
    }
}
main();