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
    "Warlock": { 
        lifeRange: [1, 4], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Mage": { 
        lifeRange: [1, 4], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 3,
        spellsupperday: 1,
    },
    "Bard": { 
        lifeRange: [1, 6], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Thief": { 
        lifeRange: [1, 6], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Druid": { 
        lifeRange: [1, 8], 
        alignment: ["Neutrale Buono", "Legale Neutrale", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Warrior": { 
        lifeRange: [1, 10], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Paladin": { 
        lifeRange: [1, 10], 
        alignment: ["Legale buono"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Barbarian": { 
        lifeRange: [1, 12], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
};

const spellslv0 = {
    "Resistenza": {
        description: "Il soggetto ottiene bonus di +1 ai tiri salvezza",
        group: "Abiurazione",
    },
    "Frastornare": {
        description: "Una creatura umanoide con 4 Life Points o meno perde l'azione successiva",
        group:"Ammaliamento",
    },
    "Individuazione del magico": {
        description: "Individua incantesimi e oggetti magici nel raggio di 18m",
        group: "Divinazione",
    },
    "Fiotto acido": {
        description: "Sfera che infligge 1d3 danni da acido",
        group: "Evocazione",
    },
    "Suono fantasma": {
        description: "Suoni illusori",
        group: "Illusione",
    },
    "Lampo": {
        description: "Abbaglia una creatura (-1 ai tiri per colpire)",
        group: "Invocazione",
    },
    "Luce": {
        description: "L'oggetto risplende come una torcia",
        group: "Invocazione",
    },
    "Luci danzanti": {
        description: "Crea torce illusorie o altre luci",
        group: "Invocazione",
    },
    "Raggio di gelo": {
        description: "Raggio che infligge 1d3 danni da freddo",
        group: "Invocazione",
    },
    "Tocco di affaticamento": {
        description: "Attacco di contatto, rende affaticato il bersaglio",
        group: "Necromanzia",
    },
    "Aprire/Chiudere": {
        description: "Apre o chiude oggetti piccoli e leggeri",
        group: "Trasmutazione",
    },
    "Mano magica": {
        description: "Telecinesi fino a 2,5KG",
        group: "Trasmutazione",
    },
    "Messaggio": {
        description: "Conversazione sussurrata a distanza",
        group: "Trasmutazione",
    },
    "Riparare": {
        description: "Effettua riparazioni minori su un oggetto",
        group: "Trasmutazione",
    },
    "Prestidigitazione": {
        description: "Effettua trucchi minori",
        group: "Universale",
    },
    "Sigillo arcano": {
        description: "Trascrive una runa personale (visibile o invisibile)",
        group: "Universale",
    },
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

    switch (classpg) {
        case "Mage":
        case "Warlock":
            const zerospellsn = classInfo[classpg].spellsperday;
            const onespellsn = classInfo[classpg].spellsupperday;
            const spellspg = [];
            const upspellpg = [];
    
            for (let i = 0; i < zerospellsn; i++) {
                const spellKeys = Object.keys(spellslv0);
                const randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                const randomSpell = spellslv0[randomSpellKey];
                spellspg.push({ name: randomSpellKey, description: randomSpell.description, group: randomSpell.group });
            }
    
            for (let j = 0; j < onespellsn; j++) {
                const spellKeys = Object.keys(spellslv0);
                const randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                const randomSpell = spellslv0[randomSpellKey];
                upspellpg.push({ name: randomSpellKey, description: randomSpell.description, group: randomSpell.group });
            }
    
            // Clear any previous spells displayed in the DOM
            const spellsContainer = document.getElementById("spellsContainer");
            spellsContainer.innerHTML = ""; // Clear previous content
    
            // Create separate containers for level 0 and level 1 spells
            const lvl0Container = document.createElement("div");
            const lvl1Container = document.createElement("div");
    
            // Create headers for the lists
            const lvl0Header = document.createElement("h3");
            lvl0Header.textContent = "Incantesimi lvl 0";
            const lvl1Header = document.createElement("h3");
            lvl1Header.textContent = "Incantesimi lvl 1";
    
            // Create a new list (ul) element to display the spells
            const lvl0List = document.createElement("ul");
            const lvl1List = document.createElement("ul");
    
            // Iterate through the selected spells and create list items (li) for each spell
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
    
            // Append the lists to their respective containers
            lvl0Container.appendChild(lvl0Header);
            lvl0Container.appendChild(lvl0List);
            lvl1Container.appendChild(lvl1Header);
            lvl1Container.appendChild(lvl1List);
    
            // Append the containers to the spells container in the DOM
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

