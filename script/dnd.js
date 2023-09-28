let clicks = 0;
const button = document.getElementById("clicker");

// Function to calculate random life points based on class information
function calculateLifePoints(classInfo) {
    const [min, max] = classInfo.lifeRange;
    return Math.floor(Math.random() * (max - min ) + 1) + min;
}

// Function to get age of the pg from class age min value to max
function getRandomAge(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get elderly level of pg --- 
function getElderlyLevel(race, age) {
    const raceInfoEntry = raceInfo[race];
  
   if (age < (raceInfoEntry.minAge + (raceInfoEntry.maxAge - raceInfoEntry.minAge) / 5)) {
        return "Giovane";
    } else if (age < (raceInfoEntry.minAge + 2 * (raceInfoEntry.maxAge - raceInfoEntry.minAge) / 5)) {
        return "Mezza età";
    } else if (age < (raceInfoEntry.minAge + 3 * (raceInfoEntry.maxAge - raceInfoEntry.minAge) / 5)) {
        return "Anziano";
    } else {
        return "Venerabile";
    }
  }

// Function to generate a pg
function generatePg() {

    //buttons 
    const buttonStats = document.getElementById("stats_dice");

    // Name and gender
    const sexPg = Math.floor(Math.random() * 2);
    if (sexPg === 0) {
        names = femaleNames;
    } else {
        names = maleNames;
    }
    const randomName = names[Math.floor(Math.random() * names.length)];

    // Get random class and race
    const classespg = Object.keys(classInfo);
    const races = Object.keys(raceInfo);
    const classpg = classespg[Math.floor(Math.random() * classespg.length)];
    const racepg = races[Math.floor(Math.random() * races.length)];
    const possibleAlignments = classInfo[classpg].alignment;

    // Random alignment 
    const randomAlignmentIndex = Math.floor(Math.random() * possibleAlignments.length);
    const randomAlignment = possibleAlignments[randomAlignmentIndex];
    const raceModifier = raceInfo[racepg].modifiers || {};

    // Age based on class 
    const ageMin = raceInfo[racepg].minAge;
    const ageMax = raceInfo[racepg].maxAge;
    const agePg = getRandomAge(ageMin, ageMax);
    const elderly = getElderlyLevel(racepg, agePg);

    // Iniziativa
    const iniziativa = Math.floor(Math.random() * 20) + 1;

    // Initialize the Stats modifiers
    const raceModifierForForza = raceModifier['forza'] || 0; 
    const raceModifierForInt = raceModifier['int'] || 0;     
    const raceModifierForCarisma = raceModifier['carisma'] || 0;
    const raceModifierForDestrezza = raceModifier['dest'] || 0;
    const raceModifierForCost = raceModifier['cost'] || 0;

    // Stats PG
    const forza = generatePoints();
    const int = generatePoints();
    const dest = generatePoints();
    const carisma = generatePoints();
    const sagg = generatePoints();
    const cost = generatePoints();

    buttonStats.addEventListener("click", () => {
        const forza = generatePoints();
        const int = generatePoints();
        const dest = generatePoints();
        const carisma = generatePoints();
        const sagg = generatePoints();
        const cost = generatePoints();

        var checkbox = document.getElementById("pf_checker");

        if(checkbox.checked){
            document.getElementById("life").textContent = calculateLifePoints(classInfo[classpg]);
        }

        document.getElementById("cost").innerHTML = cost;
        document.getElementById("carisma").innerHTML =  carisma;
        document.getElementById("destrezza").innerHTML = dest;
        document.getElementById("sagg").textContent = sagg;
        document.getElementById("int").innerHTML = int;
        document.getElementById("forza").innerHTML = forza;
    });
    
    switch (classpg) {
        case "Bardo":
            const bardspellsn = classInfo[classpg].spellsperday;
            const bardspellspg = [];
            const addedBardSpells = new Set();

            const getRandomBardSpell = () => {
                const spellKeys = Object.keys(bardspells);
                let randomSpellKey;

                do {
                    randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)]
                } while (addedBardSpells.has(randomSpellKey));

                addedBardSpells.add(randomSpellKey);
                return randomSpellKey;
            }

            for (let i = 0; i<bardspellsn; i++) {
                const randomBardSpellKey = getRandomBardSpell();
                const randomSpell = bardspells[randomBardSpellKey];
                bardspellspg.push({ name: randomBardSpellKey, description: randomSpell.description})
            }

            const bardSpellsContainer = document.getElementById("spellsContainer");
            bardSpellsContainer.innerHTML = "";
            
            const bardlvl0Container = document.createElement("div");
            const bardlvl0Header = document.createElement("h3");
            bardlvl0Header.textContent = "Incantesimi lvl 0"
            const bardlvl0List = document.createElement("ul")

            bardspellspg.forEach((spell) => {
                const spellItem = document.createElement("li");
        
                // Display the spell name, description, and group
                spellItem.innerHTML = `<b>${spell.name}</b>: ${spell.description}`;

                bardlvl0List.appendChild(spellItem);
            })

            bardlvl0Container.appendChild(bardlvl0Header);
            bardlvl0Container.appendChild(bardlvl0List);
            bardSpellsContainer.appendChild(bardlvl0Container);
            break;
        case "Druido":
            const druidzerospells = classInfo[classpg].spellsperday;
            const druidonespells = classInfo[classpg].spellsupperday;
            const druidspellpg = [];
            const druidspell1pg = [];
            const addedDruidSpells = new Set();
        
            const getRandomDruidSpell = () => {
                const spellKeys = Object.keys(druidSpells0);
                let randomSpellKey;
        
                do {
                    randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                } while (addedDruidSpells.has(randomSpellKey));
        
                addedDruidSpells.add(randomSpellKey);
                return randomSpellKey;
            };

            const getRandomDruidSpellUp = () => {
                const spellKeys = Object.keys(druidSpells1);
                let randomSpellKey;
        
                do {
                    randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
                } while (addedDruidSpells.has(randomSpellKey));
        
                addedDruidSpells.add(randomSpellKey);
                return randomSpellKey;
            }
        
            for (let i = 0; i < druidzerospells; i++) {
                const randomSpellKey = getRandomDruidSpell();
                const randomSpell = druidSpells0[randomSpellKey];
                druidspellpg.push({ name: randomSpellKey, description: randomSpell.description });
            }

            // Get lvl1 Spells
            for (let j = 0; j < druidonespells; j++) {
                const randomSpellKey = getRandomDruidSpellUp();
                const randomSpell = druidSpells1[randomSpellKey];
                druidspell1pg.push({ name: randomSpellKey, description: randomSpell.description});
            }
        
            const druidSpellsContainer = document.getElementById("spellsContainer");
            druidSpellsContainer.innerHTML = "";
        
            // Create separate containers with different headers and ul for level 0 and level 1 spells
            const druidlvl0Container = document.createElement("div");
            const druidlvl1Container = document.createElement("div");
            const druidlvl0Header = document.createElement("h3");
            druidlvl0Header.textContent = "Incantesimi lvl 0";
            const druidlvl1Header = document.createElement("h3");
            druidlvl1Header.textContent = "Incantesimi lvl 1";
            const druidlvl0List = document.createElement("ul");
            const druidlvl1List = document.createElement("ul");
        
            // Foreach to add each spell as li element
            druidspellpg.forEach((spell) => {
                const spellItem = document.createElement("li");
        
                // Display the spell name, description, and group
                spellItem.innerHTML = `<b>${spell.name}</b>: ${spell.description}`;
        
                druidlvl0List.appendChild(spellItem);
            });

            druidspell1pg.forEach((spell) => {
                const spellItem = document.createElement("li");
            
                // Display the spell name and description
                spellItem.innerHTML = `<b>${spell.name}</b>: ${spell.description}`;
            
                druidlvl1List.appendChild(spellItem);
            });

            druidlvl0Container.appendChild(druidlvl0Header);
            druidlvl0Container.appendChild(druidlvl0List);
            druidlvl1Container.appendChild(druidlvl1Header);
            druidlvl1Container.appendChild(druidlvl1List);
            druidSpellsContainer.appendChild(druidlvl0Container);
            druidSpellsContainer.appendChild(druidlvl1Container);
            break;
        
        case "Mago":
        case "Stregone":
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

            case "Paladino":
                const druidSpells = document.getElementById("spellsContainer");
                druidSpells.innerHTML = "Non sono previsti incantesimi al lvl 1";
                break; 
            case "Guerriero":
            case "Ladro":
            case "Barbaro":
                const genericSpell = document.getElementById("spellsContainer");
                genericSpell.innerHTML = "Questa classe non ha incantesimi";
                break; 

            

    }

    // Show race modifier assigning bonus or malus, it will be displayed in the span of each stat (if present)

    function updateModifier(attribute, modifier) {
        const modifSpan = document.getElementById(`modif_${attribute}`);
        if (modifSpan) {
            modifSpan.innerHTML = ((modifier == 0) ? "" : (modifier > 0 ? "<span class='plus'> +" + modifier + "</span>" : "<span class='minus'> "+modifier+"</span>"));
        }
    }

    // Apply each modifier if present in the DOM
    updateModifier('forza', raceModifierForForza); 
    updateModifier('int', raceModifierForInt);     
    updateModifier('carisma', raceModifierForCarisma); 
    updateModifier('dest', raceModifierForDestrezza);
    updateModifier('cost', raceModifierForCost);

    // Assign sorted stats
    document.getElementById("cost").innerHTML = cost;
    document.getElementById("carisma").innerHTML =  carisma;
    document.getElementById("destrezza").innerHTML = dest;
    document.getElementById("sagg").textContent = sagg;
    document.getElementById("int").innerHTML = int;
    document.getElementById("forza").innerHTML = forza;

    document.getElementById("namePg").textContent = randomName;
    document.getElementById("sexPg").innerHTML = ((sexPg > 0) ? "<i class='fa-solid fa-mars'></i>" : "<i class='fa-solid fa-venus'></i>");

    document.getElementById("age").textContent = " "+agePg + " anni";
    document.getElementById("elderly").textContent = elderly;



    // Class Armor
    document.getElementById("cla").innerHTML = "10" + ((raceModifier.dest == 0) ? "" : (raceModifier.dest > 0 ? "<span class='plus'> +" +raceModifier.dest + "</span>" : "<span class='minus'> "+ raceModifier.dest+"</span>")) + ((raceInfo[racepg].speed === "6m") ? "<span class='plus'> +1 </span>" : "");
    document.getElementById("moddestrezza").innerHTML = ((raceModifier.dest == 0) ? "0" : (raceModifier.dest > 0 ? "<span class='plus'> +" +raceModifier.dest + "</span>" : "<span class='minus'> "+ raceModifier.dest+"</span>"))
    document.getElementById("moddtaglia").innerHTML = ((raceInfo[racepg].speed === "6m") ? "<span class='plus'> +1 </span>" : "0");

    // Show speed based on class 
    document.getElementById("speedPg").textContent = raceInfo[racepg].speed;

    // Set the initiative 
    document.getElementById("iniziativa").innerHTML = iniziativa + ((raceModifier.dest == 0) ? "" : (raceModifier.dest > 0 ? "<span class='plus'> +" +raceModifier.dest + "</span>" : "<span class='minus'> "+ raceModifier.dest+"</span>"));
    // Set the chosen alignment in the HTML
    document.getElementById("alignment").textContent = randomAlignment;

    // Set the class and race in the HTML
    document.getElementById("classPg").textContent = classpg;
    document.getElementById("race").textContent = racepg;

    // Set the life points based on class
    document.getElementById("life").textContent = calculateLifePoints(classInfo[classpg]);
}


function generatePoints() {
    const dices = [];
    for (let i = 0; i < 4; i++) {
      // Generate a random number between 1 and 6 (4d6)
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      dices.push(randomNumber);
    }
    // Sort the results in descending order
    dices.sort((a, b) => b - a);
    // Sum the three highest numbers (index 0, 1, and 2 leaving the lowest value)
    const stat = dices[0] + dices[1] + dices[2];
    return stat;
  }
  
// Increment the click count
function incrementClickCount() {
    clicks++;
    document.getElementById("clickCount").textContent = clicks;
}

// Add a click event listener to the button
button.addEventListener("click", () => {
    // Generate character sheet and increment click count
    generatePg();
    incrementClickCount();
});



// Objects 

const raceInfo = {
    "Umano": { 
        modifiers: {
            label: "Nessun modificatore",
            cost: 0, 
            carisma: 0, 
            dest: 0, 
            sagg: 0, 
            forza: 0, 
            int: 0,
        },
        speed: "9m",
        minAge: 15,
        maxAge: 90,
        sex: {
            male: {
                weight: 85,
                height: 1.8,
            },
            female: {
                weight: 70,
                height: 1.6
            }
        }
    },
    "Nano": { 
        modifiers: {
            label: "+2 Costituzione, -2 Carisma",
            cost: 2, 
            carisma: -2, 
            dest: 0, 
            sagg: 0, 
            forza: 0, 
            int: 0,
        },
        speed: "6m",
        minAge: 40,
        maxAge: 350,
        sex: {
            male: {
                weight: 60,
                height: 1.2,
            },
            female: {
                weight: 55,
                height: 1.1
            }
        }
     },
    "Elfo": { 
        modifiers: {
            label: "+2 Destrezza, -2 Costituzione",
            cost: 0, 
            carisma: 0, 
            dest: 2, 
            sagg: 0, 
            forza: 0, 
            int: -2,
        },
        speed: "9m",
        minAge: 111,
        maxAge: 750,
        sex: {
            male: {
                weight: 75,
                height: 1.8,
            },
            female: {
                weight: 65,
                height: 1.7
            }
        }
    },
    "Gnomo": { 
        modifiers: {
            label: "+2 Costituzione, -2 Carisma",
            cost: 2, 
            carisma: -2, 
            dest: 0, 
            sagg: 0, 
            forza: 0, 
            int: 0,
        },
        speed: "6m",
        minAge: 20,
        maxAge: 400,
        sex: {
            male: {
                weight: 40,
                height: 1.0,
            },
            female: {
                weight: 35,
                height: 0.9
            }
        }
    },
    "Mezzelfo": { 
        modifiers: {
            label: "Nessun modificatore",
            cost: 0, 
            carisma: 0, 
            dest: 0, 
            sagg: 0, 
            forza: 0, 
            int: 0,
        },
        speed: "9m",
        minAge: 15,
        maxAge: 180,
        sex: {
            male: {
                weight: 80,
                height: 1.9,
            },
            female: {
                weight: 70,
                height: 1.7
            }
        }
    },
    "Mezzorco": { 
        modifiers: {
            label: "+2 Forza, -2 Intelligenza",
            cost: 0, 
            carisma: 0, 
            dest: 0, 
            sagg: 0, 
            forza: 2, 
            int: -2,
        },
        speed: "9m",
        minAge: 14,
        maxAge: 75,
        sex: {
            male: {
                weight: 90,
                height: 1.7,
            },
            female: {
                weight: 80,
                height: 1.6
            }
        }
     },
    "Halfling": { 
        modifiers: {
            label: "+2 Destrezza, -2 Forza",
            cost: 0, 
            carisma: 0, 
            dest: 2, 
            sagg: 0, 
            forza: -2, 
            int: 0,
        },
        speed: "6m",
        minAge: 20,
        maxAge: 250,
        sex: {
            male: {
                weight: 30,
                height: 0.9,
            },
            female: {
                weight: 25,
                height: 0.8
            }
        }
     },
};



const classInfo = {
    "Stregone": { 
        lifeRange: [1, 4], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 5,
        spellsupperday: 3,
    },
    "Mago": { 
        lifeRange: [1, 4], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 3,
        spellsupperday: 1,
    },
    "Bardo": { 
        lifeRange: [1, 6], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 2,
        spellsupperday: 0,
    },
    "Ladro": { 
        lifeRange: [1, 6], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 0,
        spellsupperday: 0,
    },
    "Druido": { 
        lifeRange: [1, 8], 
        alignment: ["Neutrale Buono", "Legale Neutrale", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio"],
        spellsperday: 3,
        spellsupperday: 1,
    },
    "Guerriero": { 
        lifeRange: [1, 10], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 0,
        spellsupperday: 0,
    },
    "Paladino": { 
        lifeRange: [1, 10], 
        alignment: ["Legale buono"],
        spellsperday: 0,
        spellsupperday: 0,
    },
    "Barbaro": { 
        lifeRange: [1, 12], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 0,
        spellsupperday: 0,
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

const druidSpells0 = {
    "Conoscere direzioni": {
        description: "L'incantatore riesce ad individuare il Nord"
    },
    "Creare acqua": {
        description: "Crea 7.4L per lvl di acqua pura"
    },
    "Cura ferite minori": {
        description: "Cura 1 danno"
    },
    "Guida":{
        description: "+1 a un tiro per colpire, tiro salvezza o una prova di abilità"
    },
    "Individuazione del magico": {
        description: "Individua incantesimi e oggetti magici nel raggio di 18mt"
    },
    "Individuazione del veleno": {
        description: "Individua il veleno in una creatura o in un oggetto"
    },
    "Lampo": {
        description: "Abbaglia una creatura (penalità di -1 ai tiri per colpire)"
    },
    "Lettura del magico": {
        description: "Per leggere pergamene e libri degli incantesimi"
    },
    "Luce": {
        description: "L'oggetto risplende come una torcia"
    },
    "Purificare cibo e bevande": {
        description: "Purifica 27 decimetri cubi per lvl di cibo o acqua"
    },
    "Resistenza": {
        description: "Il soggetto ottiene bonus di +1 ai tiri salvezza"
    },
    "Riparare": {
        description: "Effettua riparazioni minori su un oggetto"
    },
    "Virtù": {
        description: "Il soggetto ottiene 1pf temporaneo"
    }
}

const druidSpells1 = {
    "Bacche benefiche": {
        description: "2d4 bacche, ognuna cura 1 Life Point (Max 8 Life Points in 24 ore)"
    },
    "Calmare animali": {
        description: "Calma (2d4 + lvl) DV di animali"
    },
    "Charme su animali": {
        description: "Rende un animale amichevole nei confronti dell'incantatore"
    },
    "Contrastare Elementi":{
        description: "A proprio agio in un ambiente freddo o caldo"
    },
    "Cura ferite leggere": {
        description: "Cura 1d8 danni + 1 danno per livello (max 5)"
    },
    "Evoca alleato naturale I": {
        description: "Richiama una creatura che combatte"
    },
    "Foschia occultante": {
        description: "La nebbia avvolge l'incantatore"
    },
    "Individuazione di animali o vegetali": {
        description: "Individua specie animali o vegetali"
    },
    "Individuazioni di calappi e trabocchetti": {
        description: "Rivela trappole naturali o  primitive"
    },
    "Intralciare": {
        description: "Le piante avviluppano chiunque in un raggio di 12m"
    },
    "Luminescenza": {
        description: "Delinea oggetti con un alone di luce, cancella <i>sfocatura</i>, <i>occultamento</i> o simili"
    },
    "Nascondersi agli animali": {
        description: "Gli animali non riescono a percepire un soggetto per lvl"
    },
    "Parlare con gli animali": {
        description: "L'incantatore può comunicare con gli animali"
    },
    "Passare senza tracce": {
        description: "Un soggetto per livello non lascia tracce dietro di se"
    },
    "Passo veloce": {
        description: "Aumenta la velocità dell'incantatore di 3m"
    },
    "Pietra magica": {
        description: "Tre pietre diventano proiettili +1 e infliggono 1d6+1 danni"
    },
    "Produrre fiamma": {
        description: "1d6 danni +1 danno per lvl, a contatto o lanciata"
    },
    "Randello incantato": {
        description: "Un randello o un bastone ferrato diventano un'arma +1 per 1 minuto per lvl"
    },
    "Saltare": {
        description: "Il soggetto ottiene un bonus alle prove di <i>saltare</i>"
    },
    "Zanna naturale": {
        description: "Un arma naturale del soggetto ottiene +1 di bonus ai tiri per colpire e per i danni"
    }
}

const bardspells = {
    "Aprire/chiudere": {
        description: "Apre o chiude oggetti piccoli o leggeri"
    },
    "Conoscere direzioni": {
        description: "L'incantatore riesce ad individuare il Nord"
    },
    "Evoca strumento": {
        description: "Evoca uno strumento a scelta dell'incantatore"
    },
    "Frastornare": {
        description: "Una creatura umanoide con 4 Life points o meno perde la possima azione"
    },
    "Lettura del magico": {
        description: "Per leggere pergamene e libri degli incantesimi"
    },
    "Luce": {
        description: "L'oggetto risplende come una torcia"
    },
    "Individuazione del magico": {
        description: "Individua incantesimi o oggetti magici nel raggio di 18m"
    },
    "Lampo": {
        description: "Abbaglia una creatura (-1 ai tiri per colpire)"
    },
    "Luci danzanti": {
        description: "Crea torce illusorie e altre luci"
    },
    "Mano magica": {
        description: "Telecinesi fino a 2.5KG"
    },
    "Messaggio": {
        description: "Conversazione sussurrata a distanza"
    },
    "Ninna nanna": {
        description: "Rende il soggetto assonnato; -5 alle prove di Ascoltare e Osservare, -2 ai tiri salvezza sulla volontà contro sonno"
    },
    "Prestidigitazione": {
        description: "Effettua trucchi minori"
    },
    "Resistenza": {
        description: "Il soggetto ottiene bonus di +1 ai tiri salvezza"
    },
    "Riparare": {
        description: "Effettua riparazioni minori"
    },
    "Suono fantasma": {
        description: "Suoni illusori"
    }
}


const femaleNames = ["Alice", "Eve","Grace", "Hannah", "Ivy"];
const maleNames = ["Aron"];