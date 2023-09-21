// Import stats and info from "data.js"
import { raceInfo, classInfo, spellslv0, spellslv1 } from './data.js';

// Function to calculate random life points based on class information
function calculateLifePoints(classInfo) {
    const [min, max] = classInfo.lifeRange;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a pg
function generatePg() {
    // Get random class and race
    const classespg = Object.keys(classInfo);
    const races = Object.keys(raceInfo);
    const classpg = classespg[Math.floor(Math.random() * classespg.length)];
    const racepg = races[Math.floor(Math.random() * races.length)];
    const possibleAlignments = classInfo[classpg].alignment;

    // Random alignment 
    const randomAlignmentIndex = Math.floor(Math.random() * possibleAlignments.length);
    const randomAlignment = possibleAlignments[randomAlignmentIndex];

    switch (classpg) {
        case "Mage":
        case "Warlock":
            const zerospellsn = classInfo[classpg].spellsperday;
            const onespellsn = classInfo[classpg].spellsupperday;
            const spellspg = [];
            const upspellpg = [];
            const addedSpells = new Set();

            // Function to get a random spell checking the set addedSpells
            const getRandomSpellBase = () => {
                const spellKeys = Object.keys(spellslv0);
                let randomSpellKey;

                do {
                    randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                } while (addedSpells.has(randomSpellKey));

                addedSpells.add(randomSpellKey);
                return randomSpellKey;
            };

            const getRandomSpellUp = () => {
                const spellKeys = Object.keys(spellslv1);
                let randomSpellKey;

                do {
                    randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                } while (addedSpells.has(randomSpellKey));

                addedSpells.add(randomSpellKey);
                return randomSpellKey;
            };

            // Get lvl0 spells
            for (let i = 0; i < zerospellsn; i++) {
                const randomSpellKey = getRandomSpellBase();
                const randomSpell = spellslv0[randomSpellKey];
                spellspg.push({ name: randomSpellKey, description: randomSpell.description, group: randomSpell.group });
            }

            // Get lvl1 Spells
            for (let j = 0; j < onespellsn; j++) {
                const randomSpellKey = getRandomSpellUp();
                const randomSpell = spellslv1[randomSpellKey];
                upspellpg.push({ name: randomSpellKey, description: randomSpell.description, group: randomSpell.group });
            }

            const spellsContainer = document.getElementById("spellsContainer");
            spellsContainer.innerHTML = ""; // Clear previous content

            // Create separate containers with different headers and ul for level 0 and level 1 spells
            const lvl0Container = document.createElement("div");
            const lvl1Container = document.createElement("div");
            const lvl0Header = document.createElement("h3");
            lvl0Header.textContent = "Incantesimi lvl 0";
            const lvl1Header = document.createElement("h3");
            lvl1Header.textContent = "Incantesimi lvl 1";
            const lvl0List = document.createElement("ul");
            const lvl1List = document.createElement("ul");

            // Foreach to add each spell as li element
            spellspg.forEach((spell) => {
                const spellItem = document.createElement("li");

                // Display the spell name, description, and group
                spellItem.textContent = `Name: ${spell.name}, Description: ${spell.description}, Group: ${spell.group}`;

                lvl0List.appendChild(spellItem);
            });

            upspellpg.forEach((spell) => {
                const spellItem = document.createElement("li");

                // Display the spell name, description, and group
                spellItem.textContent = `Name: ${spell.name}, Description: ${spell.description}, Group: ${spell.group}`;

                lvl1List.appendChild(spellItem);
            });

            lvl0Container.appendChild(lvl0Header);
            lvl0Container.appendChild(lvl0List);
            lvl1Container.appendChild(lvl1Header);
            lvl1Container.appendChild(lvl1List);
            spellsContainer.appendChild(lvl0Container);
            spellsContainer.appendChild(lvl1Container);
            break;
    }

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
