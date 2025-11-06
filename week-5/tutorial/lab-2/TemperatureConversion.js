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
        boilingTemp: 100,
        freezingTemp: 0,
    },
    f: {
        farenheit: null,
        celsius: function () {
            return (this.farenheit - 32) * 5 / 9;
        },
        kelvin: function () {
            return (this.farenheit - 32) * 5 / 9 + 273.15;
        },
        boilingTemp: 212,
        freezingTemp: 32,
    },
    k: {
        kelvin: null,
        celsius: function () {
            return this.kelvin - 273.15;
        },
        farenheit: function () {
            return (this.kelvin - 273.15) * 9 / 5 + 32;
        },
        boilingTemp: 373.15,
        freezingTemp: 273.15,
    }
}

function getUserInput() {
    const temp = prompt("Enter the temperature: ");
    const originalUnit = prompt("Enter the original unit (C/F/K): ").toLowerCase();
    const convertedUnit = prompt("Enter the converted unit (C/F/K): ").toLowerCase();
    if (!['c', 'f', 'k'].includes(originalUnit) || !['c', 'f', 'k'].includes(convertedUnit)) {
        throw new Error("Invalid unit. Please enter C, F, or K.");
    }
    if (isNaN(temp)) {
        throw new Error("Invalid temperature. Please enter a valid number.");
    }
    return { temp: parseFloat(temp), originalUnit, convertedUnit };
}

function convertTemperature(temp, originalUnit) {
    if (originalUnit === 'c') {
        temperature.c.celsius = temp;
        return {
            celsius: temp,
            farenheit: temperature.c.farenheit(),
            kelvin: temperature.c.kelvin()
        };
    } else if (originalUnit === 'f') {
        temperature.f.farenheit = temp;
        return {
            celsius: temperature.f.celsius(),
            farenheit: temp,
            kelvin: temperature.f.kelvin()
        };
    } else if (originalUnit === 'k') {
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

function roundToTwoDecimalPlaces(num) {
    return Math.round(num * 100) / 100;
}

function isBolingOrFreezing(temp, unit) {
    if (unit === 'c') {
        return { boiling: temp >= temperature.c.boilingTemp, freezing: temp <= temperature.c.freezingTemp };
    } else if (unit === 'f') {
        return { boiling: temp >= temperature.f.boilingTemp, freezing: temp <= temperature.f.freezingTemp };
    } else if (unit === 'k') {
        return { boiling: temp >= temperature.k.boilingTemp, freezing: temp <= temperature.k.freezingTemp };
    }
    return false;
}

function main() {
    try {
        const { temp, originalUnit, convertedUnit } = getUserInput();
        const { boiling, freezing } = isBolingOrFreezing(temp, originalUnit);
        if (boiling) {
            console.log("The temperature is boiling.");
        } else if (freezing) {
            console.log("The temperature is freezing.");
        } else {
            console.log("The temperature is neither boiling nor freezing.");
        }
        const convertedTemp = convertTemperature(temp, originalUnit);
        console.log(`Converted temperatures:`);
        if (convertedUnit === 'c') {
            console.log(`Celsius: ${roundToTwoDecimalPlaces(convertedTemp.celsius)}`);
        }
        if (convertedUnit === 'f') {
            console.log(`Farenheit: ${roundToTwoDecimalPlaces(convertedTemp.farenheit)}`);
        }
        if (convertedUnit === 'k') {
            console.log(`Kelvin: ${roundToTwoDecimalPlaces(convertedTemp.kelvin)}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}
main();