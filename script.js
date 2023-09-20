// Define an object to store race information
const raceInfo = {
    "Human": { modifier: "Nessuno" },
    "Dwarf": { modifier: "+2 Costituzione, -2 Carisma" },
    "Elf": { modifier: "+2 Destrezza, -2 Costituzione" },
    "Gnome": { modifier: "+2 Costituzione, -2 Carisma" },
    "Half-Elf": { modifier: "Nessuno" },
    "Half-Orc": { modifier: "+2 Forza, -2 Intelligenza" },
    "Halfling": { modifier: "+2 Destrezza, -2 Forza" },
};

// Define an object to store class information
const classInfo = {
    "Warlock": { lifeRange: [1, 4], alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"] },
    "Mage": { lifeRange: [1, 4], alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"] },
    "Bard": { lifeRange: [1, 6], alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"] },
    "Thief": { lifeRange: [1, 6], alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"]},
    "Druid": { lifeRange: [1, 8], alignment: ["Neutrale Buono", "Legale Neutrale", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio"] },
    "Warrior": { lifeRange: [1, 10], alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"]},
    "Paladin": { lifeRange: [1, 10], alignment: ["Legale buono"] },
    "Barbarian": { lifeRange: [1, 12], alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"]},
};

// Function to calculate random life points based on class information
function calculateLifePoints(classInfo) {
    const [min, max] = classInfo.lifeRange;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a character sheet
function generatePg() {
    // Get random class and race
    const classespg = Object.keys(classInfo);
    const races = Object.keys(raceInfo);
    const classpg = classespg[Math.floor(Math.random() * classespg.length)];
    const racepg = races[Math.floor(Math.random() * races.length)];
    const possibleAlignments = classInfo[classpg].alignment;

    // Randomly choose an alignment
    const randomAlignmentIndex = Math.floor(Math.random() * possibleAlignments.length);
    const randomAlignment = possibleAlignments[randomAlignmentIndex];

    // Set the chosen alignment in the HTML
    document.getElementById("alignment").textContent = randomAlignment;

    // Set the class and race in the HTML
    document.getElementById("classPg").textContent = classpg;
    document.getElementById("race").textContent = racepg;

    // Set the race modifier based on race
    document.getElementById("modifier").textContent = raceInfo[racepg].modifier;

    // Set the life points based on class
    document.getElementById("life").textContent = calculateLifePoints(classInfo[classpg]);
}

// Increment the click count
function incrementClickCount() {
    clicks++;
    document.getElementById("clickCount").textContent = clicks;
}

let clicks = 0;
const button = document.getElementById("clicker");

// Add a click event listener to the button
 button.addEventListener("click", () => {
    // Generate character sheet and increment click count
    generatePg();
    incrementClickCount();
});

