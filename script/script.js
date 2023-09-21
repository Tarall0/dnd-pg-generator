const raceInfo = {
    "Human": { modifier: "Nessuno" },
    "Dwarf": { modifier: "+2 Costituzione, -2 Carisma" },
    "Elf": { modifier: "+2 Destrezza, -2 Costituzione" },
    "Gnome": { modifier: "+2 Costituzione, -2 Carisma" },
    "Half-Elf": { modifier: "Nessuno" },
    "Half-Orc": { modifier: "+2 Forza, -2 Intelligenza" },
    "Halfling": { modifier: "+2 Destrezza, -2 Forza" },
};

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

const spellslv1 = {
    "Allarme": {
        description: "Sorveglia un'area per 2 ore/livello.",
        group: "Abiurazione",
    },
    "Allarme Invisibile": {
        description: "Come Allarme, ma reagisce solo alle creature Invisibili",
        group:"Abiurazione",
    },
    "Barriera stordente": {
        description: "Un campo magico conferisce bonus +1 alla CA e ai Tiri Salvezza e Stordisce una creatura attaccante",
        group: "Abiurazione",
    },
    "Contrastare elementi": {
        description: "A proprio agio in un ambiente freddo o caldo.	",
        group: "Abiurazione",
    },
    "Blocca porte": {
        description: "Tiene chiusa una porta",
        group: "Abiurazione",
    },
    "Scudo": {
        description: "Un disco invisibile fornisce +4 alla CA e blocca Dardi Incantati.",
        group: "Abiurazione"
    },
    "Charme su persone": {
        description: "Rende una persona amichevole.",
        group: "Ammaliamento"
    },
    "Ipnosi": {
        description: "Affascina 2d4 DV di creature",
        group: "Ammaliamento",
    },
    "Sonno": {
        description: "Fa cadere 4 DV di creature in un sonno magico.",
        group: "Ammaliamento",
    },
    "Colpo accurato": {
        description: "Bonus +20 al proprio successivo Tiro per Colpire.",
        group: "Divinazione",
    },
    "Comprensione dei Linguaggi": {
        description: "Si comprendono tutti i linguaggi scritti e parlati.",
        group: "Divinazione",
    },
    "Identificare": {
        description: "Determina le proprietà di un Oggetto Magico.",
        group: "Divinazione",
    },
    "Individuazione delle Porte Segrete": {
        description: "Rivela porte nascoste entro 18 m.",
        group: "Divinazione",
    },
    "Armatura magica": {
        description: "Fornisce al soggetto Bonus di Armatura +4.",
        group: "Evocazione",
    },
    "Cavalcatura": {
        description: "Evoca un cavallo da galoppo per 2 ore/livello.",
        group: "Evocazione",
    },
    "Evoca Mostri I": {
        description: "Richiama una creatura Extraplanare al proprio comando.",
        group: "Evocazione",
    },
    "Foschia Occultante": {
        description: "Si è avvolti dalla nebbia.",
        group: "Evocazione",
    },
    "Servitore Inosservato": {
        description: "Forza invisibile al proprio comando",
        group: "Evocazione",
    },
    "Unto": {
        description: "Rende scivoloso un quadrato con un lato di 3m o un oggetto",
        group: "Evocazione",
    },
    "Aura Magica": {
        description: "Altera l'aura magica di un oggetto",
        group: "Illusione",
    },
    "Camuffare Se Stesso": {
        description: "Modifica dell'aspetto",
        group: "Illusione",
    },
    "Spruzzo colorato": {
        description: "Rende Privi di Sensi, Acceca e/o Stordisce creature deboli.",
        group: "Illusione",
    },
    "Ventriloqui": {
        description: "La voce risuona lontana per 1 minuto/livello.",
        group: "Illusione",
    },
    "Dardo Incantato": {
        description: "1d4+1 danni; +1 dardo ogni 2 livelli oltre il 1° (max 5).",
        group: "Invocazione",
    },
    "Disco Fluttuante": {
        description: "Crea un disco orizzontale del diametro di 90 cm che porta fino a 50 kg/livello.",
        group: "Invocazione",
    },
    "Mani Brucianti": {
        description: "1d4 danni da fuoco/livello (max 5d4).",
        group: "Invocazione",
    },
    "Stretta Folgorante": {
        description: "A contatto infligge 1d6 danni da elettricità/livello (max 5d6).",
        group: "Invocazione",
    },
    "Incuti Paura": {
        description: "Una creatura con 5 DV o meno fugge per 1d4 round.",
        group: "Necromanzia",
    },
    "Raggio di Indebolimento": {
        description: "Raggio che infligge 1d6 di penalità a Forza, +1 ogni 2 livelli.",
        group: "Necromanzia",
    },
    "Tocco Gelido": {
        description: "1 tocco/livello infligge 1d6 danni e la possibilità di 1 danno a Forza.",
        group: "Necromanzia",
    },
    "Animare Corde": {
        description: "Permette a una corda di muoversi a comando.",
        group: "Trasmutazione",
    },
    "Arma Magica": {
        description: "L'arma ottiene bonus +1.",
        group: "Trasmutazione",
    },
    "Caduta Morbida": {
        description: "Oggetti o creature cadono lentamente.",
        group: "Trasmutazione",
    },
    "Ritirata Rapida": {
        description: "La propria velocità aumenta di 9 m.",
        group: "Trasmutazione",
    },
};

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

            // Function to get a unique random spell 
            const getRandomSpellBase = () => {
                const spellKeys = Object.keys(spellslv0);
                let randomSpellKey;

                do {
                    randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                } while (addedSpells.has(randomSpellKey));

                addedSpells.add(randomSpellKey);
                return randomSpellKey;
            };

            // Same function to get a unique random spell but lvl1
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
            spellsContainer.innerHTML = ""; 

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
                spellItem.innerHTML = `<b>${spell.name}</b>: ${spell.description} | <i> ${spell.group}</i>`;

                lvl0List.appendChild(spellItem);
            });

            upspellpg.forEach((spell) => {
                const spellItem = document.createElement("li");

                // Display the spell name, description, and group
                spellItem.innerHTML = `<b>${spell.name}</b>: ${spell.description} | <i> ${spell.group}</i>`;

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

