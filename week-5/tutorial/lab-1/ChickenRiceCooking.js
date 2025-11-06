const prompt = require('prompt-sync')();

function calculateChickenRiceIngredients(ingredients) {
    const chicken = ingredients.chicken * ingredients.totalDiners;
    const rice = ingredients.rice * ingredients.totalDiners;
    const chili = ingredients.chili * ingredients.totalDiners;
    console.log(`To prepare Chicken Rice for ${ingredients.totalDiners} diners, you will need:`);
    console.log(`${chicken} kg of chicken`);
    console.log(`${rice} kg of rice`);
    console.log(`${chili} kg of chili`);
    console.log("Enjoy your meal!");
}

function getUserInput() {
    console.log("Please provide the amount of Chicken Rice ingredients for 1 diner");
    const chicken = prompt("Amount of chicken in kg:");
    const rice = prompt("Amount of rice in kg:");
    const chili = prompt("Amount of chili in kg:");
    console.log(`You have provided ${chicken} kg of chicken, ${rice} kg of rice, and ${chili} kg of chili for 1 diner.`);
    const totalDiners = prompt("How many diners are you preparing for?");
    return {
        chicken: parseFloat(chicken),
        rice: parseFloat(rice),
        chili: parseFloat(chili),
        totalDiners: parseInt(totalDiners)
    };
}

function main() {
    try {
        const ingredients = getUserInput();
        calculateChickenRiceIngredients(ingredients);
    }
    catch (error) {
        console.error("An error occurred while calculating the ingredients:", error.message);
    }
}

main();


