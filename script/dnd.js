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

  // Generate coins for pg based on class
function generateCoins(characterClass, diceCount) {
    const coinTypes = ["gold", "silver", "copper"];
  
    const coins = {};
  
    if (diceCount !== undefined) {
      for (const coin of coinTypes) {
        const totalCoins = (Math.floor(Math.random() * 4 * diceCount) + 1) * 10;
        coins[coin] = totalCoins;
        updateCoinDisplay(coins);
      }
    } else {
      console.log("Character class not found.");
    }
  
    return coins;
  }

  // Function to assure only 1 unique spell 
  function getRandomUniqueSpell(spellList, addedSpells) {
    const spellKeys = Object.keys(spellList);
    let randomSpellKey;

    do {
        randomSpellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
    } while (addedSpells.has(randomSpellKey));

    addedSpells.add(randomSpellKey);
    return randomSpellKey;
}

// Function to generate spells handling each class differently
function generateSpells(classpg, classInfo) {
    const spellsContainer = document.getElementById("spellsContainer");
    spellsContainer.innerHTML = "";

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
            bardlvl0Header.innerHTML = "<i class='fa-solid fa-wand-sparkles'></i> Incantesimi lvl 0"
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
            document.getElementById("newSpells").style.display = "block";
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
            druidlvl0Header.innerHTML = "<i class='fa-solid fa-wand-sparkles'></i> Incantesimi lvl 0"
            const druidlvl1Header = document.createElement("h3");
            druidlvl1Header.innerHTML = "<i class='fa-solid fa-wand-sparkles'></i> Incantesimi lvl 1"
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
            document.getElementById("newSpells").style.display = "block";
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
            lvl0Header.innerHTML = "<i class='fa-solid fa-wand-sparkles'></i> Incantesimi lvl 0"
            const lvl1Header = document.createElement("h3");
            lvl1Header.innerHTML = "<i class='fa-solid fa-wand-sparkles'></i> Incantesimi lvl 1"
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
            document.getElementById("newSpells").style.display = "block";
            break;
            case "Paladino":
                const paladinSpell = document.getElementById("spellsContainer");
                paladinSpell.innerHTML = "Non sono previsti incantesimi al lvl 1";
                document.getElementById("newSpells").style.display = "none";
                break; 
            case "Guerriero":
            case "Ladro":
            case "Barbaro":
                const genericSpell = document.getElementById("spellsContainer");
                genericSpell.innerHTML = "Questa classe non ha incantesimi";
                document.getElementById("newSpells").style.display = "none";
                break;  

    }

}
  // Update coins to DOM

  function updateCoinDisplay(coins) {
    for (const coin in coins) {
      if (coins.hasOwnProperty(coin)) {
        const coinValue = coins[coin];
        const coinElement = document.getElementById(coin);
        if (coinElement) {
          coinElement.textContent = coinValue;
        }
      }
    }
  }

// Get pg 3 random traits 
  function getRandomTraits(traits) {
    const count = 3;
    const randomTraits = [];
    const usedIndexes = [];
  
    while (randomTraits.length < count) {
      const randomIndex = Math.floor(Math.random() * traits.length); 
  
      if (!usedIndexes.includes(randomIndex)) {
        randomTraits.push(traits[randomIndex]);
        usedIndexes.push(randomIndex);
      }
    }
    return randomTraits.join(", ");
  }

  // Body pg carateristics 
function calculateRandomHeightAndWeight(race, sex) {
    const raceData = raceInfo[race];
  
    if (!raceData) {
      return "Invalid race";
    }
  
    const sexData = raceData.sex[sex];
  
    if (!sexData) {
      return "Invalid sex";
    }
  
    const averageWeight = sexData.weight;
    const averageHeight = sexData.height;
  
    // Define the range for weight and height adjustments
    const weightRange = 30; // kg
    const heightRange = 0.3; // meters
  
    // Generate random weight and height within the specified range
    const randomWeight = averageWeight + (Math.random() - 0.5) * 2 * weightRange;
    const randomHeight = averageHeight + (Math.random() - 0.5) * 2 * heightRange;

    document.getElementById("weight").innerHTML = randomWeight.toFixed(2) + "kg";
    document.getElementById("height").innerHTML = randomHeight.toFixed(2) + "mt";
  
  }

// Calculate stats value to got the actual modifier based on the chosen number for that stat 
  function calculateModifier(stat) {
    if (typeof stat !== 'number' || isNaN(stat)) {
      throw new Error('Invalid input: stat must be a number');
    }
    // Calculate the modifier
    const modifier = Math.floor((stat - 10) / 2);
    return modifier;
  }

  // Get random Gods for pg
  function displayRandomGod() {
    const godNames = Object.keys(gods);
    const randomGodName = godNames[Math.floor(Math.random() * godNames.length)];
    const randomGod = gods[randomGodName];
    
    const godElement = document.getElementById("god");
    godElement.innerHTML = `
      <div class='symbol'><img src='${randomGod.symbol}' id='godsymb'></div>
      <div class='god_desc'>
        <p class='god'>${randomGodName}<span class='domains'> - ${randomGod.domains}</span></p>
        <p><i class="fa-solid fa-scale-balanced"></i> ${randomGod.alignment}</p>
        <p>${randomGod.description}</p>
        <p>${randomGod.armor}</p>
      </div>
      <p></p>
      <button id='changegod'>Cambia Divinità</button>
    `;

    document.getElementById("godsymb").style = "height: 100%;";
    const changegod = document.getElementById("changegod");
    if (changegod) {
      changegod.addEventListener("click", displayRandomGod);
    }
  }

function createBackpack() {
    const backPack = document.getElementById("backpack");
    backPack.innerHTML = `
        <h3>Seleziona un'arma semplice</h3>
        <div class="select_armor">
                <label>
                    <input type="checkbox" name="meleeWeapons" value="pugnale"> Pugnale
                </label>
                <label>
                    <input type="checkbox" name="meleeWeapons" value="falcetto"> Falcetto
                </label>
                <label>
                    <input type="checkbox" name="meleeWeapons" value="randello"> Randello
                </label>
                <label>
                    <input type="checkbox" name="meleeWeapons" value="mazzaleggera"> Mazza Leggera
                </label>
                <label>
                    <input type="checkbox" name="meleeWeapons" value="lanciacorta"> Lancia Corta
                </label>
                <label>
                    <input type="checkbox" name="meleeWeapons" value="pugnaledamischia"> Pugnale da Mischia
                </label>
            </div>
        <div class="buttons"><button id="meleeArmor">Continua</button></div>
    `;

    const meleeForm = document.getElementById('meleeForm');

    document.getElementById('meleeArmor').addEventListener('click', function () {
        // Handle weapon selection here
        const checkboxes = document.querySelectorAll('input[name="meleeWeapons"]:checked');
        const selectedMeleeWeapons = [];

        if (checkboxes.length > 2) {
            alert("Puoi selezionare al massimo due armi per corpo a corpo.");
            return;
        }

        checkboxes.forEach(function (checkbox) {
            const itemName = checkbox.value;
            if (armi[itemName]) {
                selectedMeleeWeapons.push(armi[itemName]);
            }
        });

        // Update the backpack content 
        backPack.innerHTML = "<h3>Armi Semplici (Corpo a Corpo)</h3>";
        selectedMeleeWeapons.forEach(function (item) {
            // Create and append DOM elements for selected weapons
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");
            itemElement.innerHTML = `
                <span class="item_name">${item.name}</span>
                <span class="worth"><i class="fa-solid fa-coins gold"></i> ${item.cost}</span>
                <p class="category">${item.category}</p>
                    <ul>
                        <li>Danno: ${item.damage}</li>
                        <li>Range: ${item.range}</li>
                        <li>Critico: ${item.critic}</li>
                        <li>Peso: ${item.weight}</li>
                        <li><i>${item.type}</i></li>
                    </ul>
            `;
            backPack.appendChild(itemElement);
        });
    // After handling melee weapons, you can proceed with the distance weapons section:
    backPack.innerHTML += `
    <div id="rangedForm">
        <h3>Seleziona un'arma a distanza</h3>
            <div class="select_armor">
                <label>
                    <input type="checkbox" name="rangedWeapons" value="arco"> Arco
                </label>
                <label>
                    <input type="checkbox" name="rangedWeapons" value="balestraleggera"> Balestra Leggera
                 </label>
            </div>
         <div class="buttons"><button id="rangedArmor">Continua</button></div>
    </div>
`;



document.getElementById('rangedArmor').addEventListener('click', function () {
    // Handle distance weapon selection here
    const checkboxes = document.querySelectorAll('input[name="rangedWeapons"]:checked');
    const selectedRangedWeapons = [];
    const rangedForm = document.getElementById('rangedForm');

    if (checkboxes.length > 1) {
        alert("Puoi selezionare al massimo 1 arma a distanza.");
        return;
    } else {
        rangedForm.style.display="none";
    }

    checkboxes.forEach(function (checkbox) {
        const itemName = checkbox.value;
        if (armi[itemName]) {
            selectedRangedWeapons.push(armi[itemName]);
        }
    });

    // Update the backpack content for selected distance weapons
    backPack.innerHTML += "<h3>Armi Semplici (A Distanza)</h3>";
    selectedRangedWeapons.forEach(function (item) {
        // Create and append DOM elements for selected weapons
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
        <span class="item_name">${item.name}</span>
        <span class="worth"><i class="fa-solid fa-coins gold"></i> ${item.cost}</span>
        <p class="category">${item.category}</p>
            <ul>
                <li>Danno: ${item.damage}</li>
                <li>Range: ${item.range}</li>
                <li>Critico: ${item.critic}</li>
                <li>Peso: ${item.weight}</li>
                <li><i>${item.type}</i></li>
            </ul>
        `;
        backPack.appendChild(itemElement);
    });
 
    backPack.innerHTML += `
       <div id="startingArmor">
       <h3>Seleziona un'armatura leggera</h3>
            <div class="select_armor">
                <label>
                    <input type="radio" name="armorbasic" value="noarmor"> Senza armatura
                </label>
                <label>
                    <input type="radio" name="armorbasic" value="imbottita"> Armatura Imbottita
                </label>
                <label>
                    <input type="radio" name="armorbasic" value="cuoio"> Armatura di Cuoio
                </label>
                <label>
                    <input type="radio" name="armorbasic" value="cuoioborchiato"> Armatura di Cuoio Borchiato
                </label>
            </div>
        <div class="buttons"><button id="starting_armor">Continua</button></div>
        </div>
    `;


    document.getElementById("starting_armor").addEventListener("click", function () {
        // Handle armor selection
        const selectedArmor = document.querySelector('input[name="armorbasic"]:checked');
        const armors = [];
        const startingArmorForm = document.getElementById('startingArmor');


        if (!selectedArmor) {
            alert("Devi selezionare un'armatura.");
            return;
        }
        else {
            startingArmorForm.style.display="none";
        }
        const armorName = selectedArmor.value;
        if(armature[armorName]){
            armors.push(armature[armorName]);
        }

        // Update the backpack content fo armor
        backPack.innerHTML += "<h3>Armature Leggere</h3>";
        const armorElement = document.createElement("div");
        armorElement.classList.add("item");
        armorElement.innerHTML = `
        <span class="item_name">${armature[armorName].name}</span>
        <p class="worth"><i class="fa-solid fa-coins gold"></i> ${armature[armorName].prezzo}</p>
        <ul>
            <li>Bonus: ${armature[armorName].bonus}</li>
            <li>Peso: ${armature[armorName].peso}</li>
        </ul>
        `;
        backPack.appendChild(armorElement);
    });
});
});
}


// Call the createBackpack function to set up the initial form
createBackpack();


// Function to generate values for pg stats (method 4d6 removed the lowest value, 6 times)
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

  // Update the modifier inserting the value in each attribute 
  function updateModifier(attribute, modifier) {
    const modifSpan = document.getElementById(`modif_${attribute}`);
    if (modifSpan) {
        modifSpan.innerHTML = ((modifier == 0) ? "" : (modifier > 0 ? "<span class='plus'> +" + modifier + "</span>" : "<span class='minus'> "+modifier+"</span>"));
    }
}

// Function to generate a pg
function generatePg() { 

    // Display content
    document.getElementById("display_generated").style.display="block";
    // Name and gender
    const sexPg = Math.floor(Math.random() * 2);
    let sexLable;
    if (sexPg === 0) {
        names = femaleNames;
        sexLable = "female";
    } else {
        names = maleNames;
        sexLable = "male";
    }
    const randomName = names[Math.floor(Math.random() * names.length)] +  " " + SecondNames[Math.floor(Math.random() * SecondNames.length)];
    document.getElementById("namePg").textContent = randomName;
    document.getElementById("sexPg").innerHTML = ((sexPg > 0) ? "<i class='fa-solid fa-mars'></i>" : "<i class='fa-solid fa-venus'></i>");

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

    // PErsonality
    const personality = small_personality[Math.floor(Math.random() * small_personality.length)];
    const negPersonality = small_negative[Math.floor(Math.random() * small_negative.length)];
    const randomTraits = getRandomTraits(traits);

    const rerollPers = document.getElementById("resetPersonality");

    rerollPers.addEventListener("click", () => {
        const personality = small_personality[Math.floor(Math.random() * small_personality.length)];
        const negPersonality = small_negative[Math.floor(Math.random() * small_negative.length)];
        const randomTraits = getRandomTraits(traits);

        document.getElementById("personality").innerHTML = "<p>"+personality+"</p><p>"+negPersonality+"</p>";
        document.getElementById("traits").innerHTML = randomTraits;
    })

    // Pg god
    displayRandomGod();

    // Body weight and height 
    calculateRandomHeightAndWeight(racepg, sexLable);

    // Initial coins 
    const diceCount = classInfo[classpg].coinsDices;
    generateCoins(classpg, diceCount);

    //backpack 
    createBackpack();

    // Spells 
    generateSpells(classpg, classInfo);
    const newSpells = document.getElementById("newSpells")
    if(newSpells){
        newSpells.addEventListener("click", () => {
            generateSpells(classpg, classInfo);
            console.log("Clicked")
        })
    }
    
    
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

    // Reroll stats
    const buttonStats = document.getElementById("stats_dice");
    buttonStats.addEventListener("click", () => {
        const forza = generatePoints();
        const int = generatePoints();
        const dest = generatePoints();
        const carisma = generatePoints();
        const sagg = generatePoints();
        const cost = generatePoints();

        // Reroll stats and life dice if selected
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

    // Apply stats once managed
    const applyStats = document.getElementById("apply_stats");
    applyStats.addEventListener("click", () => {
        const forzaValue = parseInt(document.getElementById("forza").innerHTML);
        const forza = forzaValue + raceModifierForForza;
        const intValue = parseInt(document.getElementById("int").innerHTML)
        const int = intValue + raceModifierForInt;
        const destValue = parseInt(document.getElementById("destrezza").innerHTML);
        const dest = destValue + raceModifierForDestrezza;
        const carismaValue = parseInt(document.getElementById("carisma").innerHTML);
        const carisma = carismaValue + raceModifierForCarisma;
        const saggValue = parseInt(document.getElementById("sagg").innerHTML)
        const sagg = saggValue;
        const costValue = parseInt(document.getElementById("cost").innerHTML);
        const cost = costValue + raceModifierForCost;

        const forzaModifier = calculateModifier(forza);
        const intModifier = calculateModifier(int);
        const destModifier = calculateModifier(dest);
        const carismaModifier = calculateModifier(carisma);
        const saggModifier = calculateModifier(sagg);
        const costModifier = calculateModifier(cost);

        // Update values with modifier
        document.getElementById("forza_applied").innerHTML = (forzaModifier > 0 ? "+" +forzaModifier : forzaModifier);
        document.getElementById("int_applied").innerHTML = (intModifier > 0 ? "+" +intModifier : intModifier);
        document.getElementById("destrezza_applied").innerHTML = (destModifier > 0 ? "+" +destModifier : destModifier);
        document.getElementById("carisma_applied").innerHTML = (carismaModifier > 0 ? "+" +carismaModifier : carismaModifier);
        document.getElementById("sagg_applied").innerHTML = (saggModifier > 0 ? "+" +saggModifier : saggModifier);
        document.getElementById("cost_applied").innerHTML = (costModifier > 0 ? "+" +costModifier : costModifier);
        document.getElementById("moddestrezza").innerHTML = ((destModifier == 0) ? "+0" : (destModifier > 0 ? "<span class='plus'> +"+destModifier + "</span>" : "<span class='minus'> "+ destModifier+"</span>"))
        document.getElementById("cla").innerHTML = "10" + ((raceInfo[racepg].speed === "6m") ? "<span class='plus'> +1 </span>"  : "") + ((destModifier == 0) ? "0" : (destModifier > 0 ? "<span class='plus'> +"+destModifier + "</span>" : "<span class='minus'> "+ destModifier+"</span>"));
        document.getElementById("iniziativa").innerHTML = iniziativa + ((destModifier == 0) ? "+0" : (destModifier > 0 ? "<span class='plus'> +" +destModifier + "</span>" : "<span class='minus'> "+ destModifier+"</span>"));
    })
    
    // Insert each class modifier if present 
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
    // Set the chosen alignment
    document.getElementById("alignment").textContent = randomAlignment;

    // Set the class and race in the HTML
    document.getElementById("classPg").textContent = classpg;
    document.getElementById("race").textContent = racepg;

    // Set the life points based on class
    document.getElementById("life").textContent = calculateLifePoints(classInfo[classpg]);

   
    //
    
    document.getElementById("personality").innerHTML = "<p>"+personality+"</p><p>"+negPersonality+"</p>";

    document.getElementById("traits").innerHTML = randomTraits;

    document.getElementById("eyes").innerHTML = eyes_colors[Math.floor(Math.random() * eyes_colors.length)];
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
            cost: -2, 
            carisma: 0, 
            dest: 2, 
            sagg: 0, 
            forza: 0, 
            int: 0,
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
        coinsDices: 3,
    },
    "Mago": { 
        lifeRange: [1, 4], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 3,
        spellsupperday: 1,
        coinsDices: 4,
    },
    "Bardo": { 
        lifeRange: [1, 6], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 2,
        spellsupperday: 0,
        coinsDices: 5,
    },
    "Ladro": { 
        lifeRange: [1, 6], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 0,
        spellsupperday: 0,
        coinsDices: 4,
    },
    "Druido": { 
        lifeRange: [1, 8], 
        alignment: ["Neutrale Buono", "Legale Neutrale", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio"],
        spellsperday: 3,
        spellsupperday: 1,
        coinsDices: 2,
    },
    "Guerriero": { 
        lifeRange: [1, 10], 
        alignment: ["Legale Buono", "Legale Neutrale", "Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 0,
        spellsupperday: 0,
        coinsDices: 5,
    },
    "Paladino": { 
        lifeRange: [1, 10], 
        alignment: ["Legale buono"],
        spellsperday: 0,
        spellsupperday: 0,
        coinsDices: 5,
    },
    "Barbaro": { 
        lifeRange: [1, 12], 
        alignment: ["Neutrale Buono", "Caotico Buono", "Neutrale", "Caotico Neutrale", "Neutrale Malvagio", "Caotico Malvagio"],
        spellsperday: 0,
        spellsupperday: 0,
        coinsDices: 2,
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

const gods = {
    "Boccob":{
        description: "Dio della magia. I suoi titoli includono <b>L'Indifferente</b>, <b>Il Signore di Ogni Magia</b> e <b>L'Arcimago delle Divinità</b>. Boccob è una divinità distante che non ha alcuna ambizione particolare nel mondo dei mortali",
        alignment: "Neutrale",
        domains: "Dio della Conoscenza, dell'Inganno e della Magia.",
        armor: "La sua arma preferita è il bastone ferrato",
        symbol: "./images/gods/boccob.png"
    },
    "Correllon Larethian": {
        description: "Il dio degli elfi Correllon Larethian è conosciuto come <b>Il Creatore degli Elfi</b>, <b>Il Protettore</b>, <b>Il Protettore e conservatore della Vita</b>, <b>Il Signore di Tutti gli Elfi</b>. Il creatore patrono della razza elfica e governa tutto ciò che gli elfi apprezzano maggiormente: la magia, la musica, l'arte, l'artigianato, la poesia e l'arte della guerra. Venerato da elfi, mezzelfi e bardi.",
        alignment: "Caotico neutrale",
        domains: "Dio del Bene, Caos, Guerra e Protezione",
        armor: "La sua arma preferita è la spada lunga",
        symbol: "./images/gods/correllon.png",
    },
    "Ehlonna": {
        description: "La dea delle terre boschive. Il titolo con cui viene più spesso nominata è <b>Ehlonna delle Foreste</b>. Ehlonna veglia su tutti coloro che vivono nelle foreste, amano le terre boschive o che vi trascorrono la loro esistenza. Questi la raffigurano a volte come un'elfa, a volte come un'umana. Particolarmente vicina agli elfi, gnomi, mezzelfi e halfling. Venerata anche da druidi e ranger.",
        alignment: "Neutrale buono",
        domains: "Dea degli Animali, del Bene, del Sole e del Vegetale",
        armor: "La sua arma preferita è la spada lunga",
        symbol: "./images/gods/ehlonna.png",
    },
    "Erythnul": {
        description: "Il dio del massacro. Il suo titolo è <b>Il Molteplice</b>. Erythnul gode del panico e del massacro che diffonde. Nelle terre civilizzate i suoi fedeli formano piccoli culti criminali in suo onore. Nelle terre selvagge, viene adorato apertamente.",
        alignment: "Caotico Malvagio",
        domains: "Dio del Caos, Guerra, dell'Inganno e del Male",
        armor: "La sua arma preferita è una morning star con una testa di pietra",
        symbol: "./images/gods/erythnul.png",
    },
    "Fharlanghn": {
        description: "Il dio delle strade. Il suo titolo è <b>L'Abiuratore dell'Orizzonte</b>. Lo venerano principalmente i bardi, gli avventurieri erranti e i mercanti.",
        alignment: "Neutrale",
        domains: "Dio della Fortuna, Protezione, del Viaggio",
        armor: "La sua arma preferita è il bastone ferrato",
        symbol: "./images/gods/fharlanghn-symbol.png",
    },
    "Garl Glittergold": {
        description: "Il dio delgli gnomi. Conosciuto come <b>Il'Burlone</b>, <b>L'Attento Protettore</b>, <b>La Gemma Senza Prezzo</b> e <b>L'Arguto</b>. Fu Garl Glittergold a scoprire gli gnomi e a introdurli nel mondo, e da allora è sempre stato il loro protettore. Veglia sull'umorismo, l'arguzia la lavorazione delle gemme e la creazione di gioielli.",
        alignment: "Neutrale buono",
        domains: "Dio del Bene, l'Inganno, Protezione",
        armor: "La sua arma preferita è l'ascia da battaglia.",
        symbol: "./images/gods/glittergold.png",
    },
    "Heironeous": {
        description: "Il dio del valore. Ha il titolo di <b>Invincibile</b>. Promuove la giustizzia, il valore, la cavalleria e l'onore. Adorato da monaci, guerrieri e paladini. Il suo più acerrimo nemico è il fratellastro Hextor",
        alignment: "Legale buono",
        domains: "Dio del Bene, la Guerra, la Legge",
        armor: "La sua arma preferita è la spada lunga.",
        symbol: "./images/gods/heironeous-symbol.png",
    },
    "Hextor": {
        description: "Il dio della Tirannia. Chiamato <b>Campione del Male</b>, <b>Araldo degli Inferi</b>, <b>Flagello della Battaglia</b>. Hextor è il dio a sei braccia della guerra, del conflitto e della distruzione. Tra i suoi feneli annovera guerrieri e monaci malvagi. Incita i suoi fedeli a commettere atti malvagi e in particolar modo a muovere contro i fedeli del fratellastro Heroneous, ovunque si trovino.",
        alignment: "Legale Malvagio",
        domains: "Dio del Male, Distruzione, Legge, Guerra",
        armor: "La sua arma preferita è il mazzafrusto.",
        symbol: "./images/gods/hextor.png",
    },
    "Kord": {
        description: "Il dio della Forza. Conosciuto come <b>Il Lottatore</b>. Kord protegge gli atleti, specialmente i lottatori a mani nude, e tra i suoi fedeli vi sono guerrieri buoni, barbari e ladri.",
        alignment: "Caotico Buono",
        domains: "Dio del Bene, Caos, Fortuna, Forza",
        armor: "La sua arma preferita è lo spadone.",
        symbol: "./images/gods/kord.png",
    },
    "Moradin": {
        description: "Il dio dei nani. Viene chiamato <b>Lo Spirito Forgiatore</b>, <b>Il Padre dei Nani</b>, <b>Il Padre di Tutti</b>, e <b>Il Creatore</b>. Moradin creò i primi nani forgiandoli dal metallo e dalle gemme, dando loro il soffio della vita. Protegge le arti e le scienze dei nani: laborazione del ferro e dei metalli, ingegneria e guerra.",
        alignment: "Legale Buono",
        domains: "Dio del Bene, Legge, Protezione, Terra",
        armor: "La sua arma preferita è il martello da guerra.",
        symbol: "./images/gods/moradin.png",
    },
    "Nerull": {
        description: "Il dio della Morte. Viene chiamato <b>Il Mietitore</b>, <b>Il Nemico di Ogni Bene</b>, <b>Colui che odia la Vita</b>, <b>Il Cupo Re</b> e <b>Il Mietitore della carne</b>. Nerull governa su coloro che provocano i mali peggiori in nome del profitto o del divertimento. Tra i suoi fedeli annovera necromanti malvagi e ladri, che lo raffigurano come una figura semischeletrica e incappucciata.",
        alignment: "Neutrale Malvagio",
        domains: "Dio del Male, Inganno, Morte",
        armor: "La sua arma preferita è la falce.",
        symbol: "./images/gods/nerull.png",
    },
    "Obad-Hai": {
        description: "Il dio della Natura. Conosciuto come <b>Lo Shalm</b>. Obad-Hai governa sulla natura e sulle terre selvagge ed è amico di tutti coloro che vivono in armonia con il mondo della natura. Qualche volta è venerato da barbari ranger e druidi. Dal momento che Obad-Hai aderisce strettamente alla neutralità, si trova a rivaleggiare spesso con Ehlonna. Obad-Hai suona spesso uno Shalm.",
        alignment: "Neutrale",
        domains: "Dio dell'Acqua, dell'Aria, del Fuoco, della Terra e del mondo Animale e Vegetale",
        armor: "La sua arma preferita è il bastone ferrato.",
        symbol: "./images/gods/obadhai.png",
    },
    "Olidammara": {
        description: "Il dio dei ladri. Viene chiamato <b>Il Ladro Ridente</b>. Ama il vino, le donne e le canzoni. Un vagabondo, un burlone e un maestro dei travestimenti. In suo onore esistono pochi templi ma vengono invocati molti brindisi. Ladri e bardi sono, naturalmente, i suoi principali fedeli.",
        alignment: "Caotico Neutrale",
        domains: "Dio del Caos, Fortuna, Inganno",
        armor: "La sua arma preferita è lo stocco.",
        symbol: "./images/gods/olidammara.png",
    },
    "Pelor": {
        description: "Il dio del sole Pelor. Viene chiamato <b>Lo splendente</b>. Il creatore di molte cose buone, un soccorritore di coloro che si trovano in pericolo, un avversario di tutto ciò che è malvagio. La divinità più comunemente venerata tra gli umani e i suoi sacerdoti sono bene accetti ovunque si rechino. Ranger e bardi sono tra i suoi fedeli.",
        alignment: "Neutrale Buono",
        domains: "Dio del Sole, del Bene, della Forza, della Guarigione",
        armor: "La sua arma preferita è la mazza.",
        symbol: "./images/gods/pelor.png",
    },
    "St. Cuthbert": {
        description: "Il dio del castigo. Conosciuto come <b>St. Cuthbert del randello</b>. Esige vendetta e punizione su coloro che infrangono la legge, e poichè le creature malvagie violano la legge più spesso di quelle buone, St. Cuthbert predilige il bene al male, anche se di per sè non è di allineamento buono. (I suoi chierici non possono essere malvagi).",
        alignment: "Legale Neutrale",
        domains: "Dio della Distruzione, della Legge, della Forza, Protezione",
        armor: "La sua arma preferita è la mazza.",
        symbol: "./images/gods/stcuthbert.png",
    },
    "Vecna": {
        description: "Il dio dei segreti. Viene chiamato <b>Il Signore Mutilato</b>, <b>Il Sussurrato</b> e <b>Il Maestro di tutto ciò che è Segreto e Nascosto</b>. Governa su tutto ciò che non deve essere conosciuto e che la gente desidera mantenere segreto. Generalmente appare nella forma di lich privo di una mano e dell'occhio sinistro, persi nel corso di una lotta contro il suo infido luogotenente, Kas.",
        alignment: "Neutrale Malvagio",
        domains: "Dio della Conoscenza, della Magia, del Male",
        armor: "La sua arma preferita è il pugnale",
        symbol: "./images/gods/vecna.png",
    },
    "Wee Jas": {
        description: "La dea della morte e della magia. Viene chiamata <b>Dea Stregona</b>, <b>Strega di Rubino</b> e <b>Dama di Acciaio</b>, <b>Guardiana della Morte</b>. Wee Jas è una divinità pretenziosa e inquietante che esige obbedienza completa dai suoi fedeli. I suoi templi sono pochi e nascosti, ma annovera molti servitori tra maghi e stregoni potenti (specialmente necromanti).",
        alignment: "Legale Neutrale",
        domains: "Dea della Legge, della Magia, della Morte",
        armor: "La sua arma preferita è il pugnale",
        symbol: "./images/gods/weejas.png",
    },
    "Yondalla": {
        description: "La dea degli halfling. Viene chiamata <b>La Protettrice</b>, <b>La Provvidente</b> e <b>La Matriarca che Nutre</b>, <b>La Benedetta</b>. Yondalla è la creatrice e la protrettrice della razza halfling. Difende l'armonia della razza halfling e conduce una lotta accanita contro i loro nemici. I suoi fedeli sperano di condurre una vita prospera e sicura sotto la sua guida",
        alignment: "Legale buona",
        domains: "Dea della Legge, del Bene, della Protezione",
        armor: "La sua arma preferita è la spada corta",
        symbol: "./images/gods/yondalla.png",
    },

}

const eyes_colors = [  "Blu", "Verdi", "Gialli", "Rossi", "Grigi", "Neri", "Marroni"];


const traits = ["Ambizioso", "Coraggioso", "Determinato", "Avventuroso", "Pragmatico", "Intraprendente", "Empatico", "Creativo", "Paziente", "Ottimista", "Altruista", "Responsabile", "Flessibile", "Generoso", "Tenace", "Risoluto"]

const small_personality = [
    "Devo aver fatto un favore a un dio o qualcosa del genere, perché sono stranamente fortunato! Il cibo salta sempre fuori quando ho fame, le tempeste di solito si liberano quando ho bisogno di viaggiare, e spesso trovo cose utili e piccole monete proprio quando mi servono.",
    "Ho letto tutti i libri dell'enorme biblioteca di mio padre - due volte!",
    "Sono cresciuta in una grande città e mi considero molto esperta di strada. Parlo velocemente, cammino velocemente e nessuno ha la meglio su di me.",
    "Lavoravo in una cucina e amo cucinare per i miei amici e la mia famiglia.",
    "Ho un talento per la medicina. All'età di 7 anni ero il miglior guaritore e medico di campagna del mio villaggio. A 12 anni la gente veniva da lontano per chiedere il mio aiuto.",
    "Ho un accento insolito e uso costantemente slang e colloquialismi, anche in situazioni formali.",
    "Parlo con me stesso, con le piante e con gli animali con la stessa libertà con cui parlo con gli altri umanoidi. Spesso le persone pensano che io sia strano perché ho avuto un'infanzia solitaria e nessuno mi ha insegnato i 'normali' comportamenti sociali, ma non me ne preoccupo.",
    "Chiamo tutti con dei nomignoli: tesoro, capo, dolcezza, ragazzo, tesoro etc. È una cosa che ho imparato da mio nonno/padre.",
    "Sono cresciuto in una famiglia religiosa. Non pronuncerei mai il nome di una divinità invano e insisto affinché anche gli altri si astengano dal farlo.",
    "Non mi piacciono i bambini. Ma i bambini mi amano. Questo mi lascia perplesso.",
    "Sono un grande appassionato di astronomia. Passo le notti a osservare le stelle e posso identificare molte costellazioni e pianeti.",
    "Ho una collezione segreta di antiche mappe e oggetti misteriosi che ho raccolto nei miei viaggi. Li tengo nascosti in un luogo sicuro, e ogni tanto li studio per cercare indizi su tesori perduti.",
    "Sono ossessionato dalla storia della mia famiglia e porto sempre con me un albero genealogico dettagliato. So tutto sui miei antenati fino a molti secoli fa.",
    "Ho una strana ossessione per i puzzle e gli enigmi. Passo ore a risolverli e non posso resistere a un mistero da svelare.",
    "Ho un amico immaginario che mi accompagna ovunque. Lo considero il mio consulente personale e parlo spesso con lui come se fosse una creatyra reale.",
    "Ho una profonda connessione con gli animali e spesso mi ritrovo a soccorrere e prendere cura di animali feriti o abbandonati che incontro per strada."
]

const small_negative = [
    "Nonostante la mia bontà d'animo, ho un problemino con l'alcol. Quando entro in una taverna mi lascio trasportare da alcol e ciò che la città ha da offrire (uomini o donne, quello che preferisci)",
    "Non sono una cattiva persona, ma ho imparato ad essere egoista per sopravvivere ai pericoli del mondo",
    "Ho un grande potere dentro di me, ma devo imparare a controllarlo",
    "Mi piace stare al centro dell'attenzione... un po' troppo. ",
    "Una po' una testa calda, una volta ho scatenato una rissa perchè un uomo mi stava fissando... peccato fosse cieco!",
    "Diffido di maghi e stregoni, ho subito un incidente da piccol* che mi ha segnato in questo.",
    "Non sempre riesco a dire la cosa giusta da dire... questo mi può mettere nei guai.",
    "Nascondo un segreto, oscuro forse e da tanto tempo. Questo mi rende restio a fidarmi e ad interagire con gli altri.",
    "Sono affetto da paranoia. Non mi fido di nessuno e credo che ci sia sempre qualcuno che sta cercando di farmi del male.",
    "Ho una dipendenza da gioco d'azzardo. Non posso resistere a scommettere su qualsiasi cosa, anche quando so che potrebbe portarmi a problemi finanziari.",
    "Sono ossessionato dalla vendetta. Qualcuno ha fatto del male a una persona cara a me, e ho giurato di far pagare chiunque sia responsabile.",
    "Sono un perfezionista ossessivo. Non riesco a vedere oltre i dettagli e cerco costantemente di migliorare le cose, anche quando è inutile.",
    "Ho un temperamento esplosivo. Le piccole provocazioni possono far scatenare in me una rabbia incontrollabile.",
    "Ho commesso un crimine grave in passato e ora sono in fuga dalle autorità. Vivo costantemente nell'ombra per evitare di essere catturato.",
    "Sono geloso e possessivo nei confronti delle persone che amo. Questo crea tensioni nelle mie relazioni e mi fa agire in modi irrazionali.",
]

const femaleNames = [
    "Alice",
    "Eve",
    "Grace",
    "Hannah",
    "Ivy",
    "Aria",
    "Elara",
    "Seraphina",
    "Luna",
    "Fiona",
    "Isolde",
    "Morgana",
    "Eowyn",
    "Lyanna",
    "Athena",
    "Elowen",
    "Selene",
    "Arwen",
    "Thalia"
  ];

const maleNames = [
    "Basun",
    "Nhuhlum",
    "Grunkern",
    "Darkel",
    "Glizaf",
    "Ir",
    "Emmen",
    "Dihvaor-Zon",
    "Rordolvec",
    "Zeizar",
    "Rumen",
    "Theodore",
    "Gabriel",
    "Oliver",
    "Samuel",
    "Liam",
    "Felix",
    "Alexander",
]


const SecondNames = [
    "Snakewoods",
    "Sezuvrakt",
    "Necthut",
    "Velmentu",
    "Vonovi",
    "Mysts",
    "Pandaul",
    "Rapidcast",
    "Void",
    "Blackthorn",
    "Shadowbane",
    "Ironheart",
    "Bloodraven",
    "Frostblade",
    "Stormwind",
    "Nighshade",
    "Steelhammer",
    "Thunderstrike",
    "Fireforge"
]


const armi = {
    "pugnale": {
        name: "Pugnale",
        cost: "2",
        damage: "1d4",
        critic: "19-20/x2",
        range: " 3m ",
        weight: "0.5Kg",
        type: "Perforante, Tagliente",
        category: "Armi da mischia leggere",
    },
    "falcetto": {
        name: "Falcetto",
        cost: "6",
        damage: "1d6",
        critic: "x2",
        range: " - ",
        weight: "1Kg",
        type: "Tagliente",
        category: "Armi da mischia leggere",
    },
    "guantodarmechiodato": {
        name: "Guanto d’arme chiodato",
        cost: "5",
        damage: "1d4",
        critic: "x2",
        range: "-",
        weight: "0.5Kg",
        type: "Perforante",
        category: "Armi da mischia leggere",
    },
    "mazzaleggera": {
        name: "Mazza Leggera",
        cost: "5",
        damage: "1d6",
        critic: "x2",
        range: " - ",
        weight: "2Kg",
        type: "Contundente",
        category: "Armi da mischia leggere",
    }, 
    "pugnaledamischia": {
        name: "Pugnale da Mischia",
        cost: "2",
        damage: "1d4",
        critic: "x3",
        range: " - ",
        weight: "0.5Kg",
        type: "Perforante",
        category: "Armi da mischia leggere",
    },
    "lanciacorta": {
        name: "Lancia Corta",
        cost: "1",
        damage: "1d6",
        critic: "x2",
        range: " 6m ",
        weight: "1.5Kg",
        type: "Perforante",
        category: "Armi da mischia a mano",
    },
    "mazzapesante": {
        name: "Mazza Pesante",
        cost: "12",
        damage: "1d8",
        critic: "x2",
        range: " - ",
        weight: "4Kg",
        type: "Contundente",
        category: "Armi da mischia a mano",
    },
    "morningstar": {
        name: "Morning Star",
        cost: "8",
        damage: "1d8",
        critic: "x2",
        range: " - ",
        weight: "4Kg",
        type: "Perforante, Contundente",
        category: "Armi da mischia a mano",
    },
    "randello": {
        name: "Randello",
        cost: " - ",
        damage: "1d6",
        critic: "x2",
        range: " 3m ",
        weight: "1.5Kg",
        type: "Contundente",
        category: "Armi da mischia a mano",
    },
    "arco": {
        name: "Arco",
        cost: " 25 ",
        damage: "1d6",
        critic: "x2",
        range: " 24/96m ",
        weight: "1Kg",
        type: "Perforante",
        category: "Armi a distanza semplici",
    },
    "dardo": {
        name: "Dardo (x10)",
        cost: " 50 ",
        damage: "1d4",
        critic: "x2",
        range: " 6/18m ",
        weight: "0,125Kg",
        type: "Perforante",
        category: "Armi a distanza semplici",
    },
    "balestraleggera": {
        name: "Balestra Leggera",
        cost: " 25 ",
        damage: "1d8",
        critic: "x2",
        range: " 24/96m ",
        weight: "2.5Kg",
        type: "Perforante",
        category: "Armi a distanza semplici",
    },
};

const armature = {
    "nessuna":{
        name: "Nessuna armatura",
        bonus: "Nessun bonus",
        peso: "0kg",
        prezzo: "0",
        indossare: "1 minuto",
        togliere: "1 minuto"
    },
    "imbottita":{
        name: "Armatura Imbottita",
        bonus: "+1",
        peso: "4kg",
        prezzo: "5",
        indossare: "1 minuto",
        togliere: "1 minuto"
    },
    "cuoio":{
        name: "Armatura di Cuoio",
        bonus: "+1",
        peso: "5kg",
        prezzo: "10",
        indossare: "1 minuto",
        togliere: "1 minuto"
    },
    "cuoioborchiato":{
        name: "Armatura di Cuoio Borchiato",
        bonus: "+2",
        peso: "6,5kg",
        prezzo: "45",
        indossare: "1 minuto",
        togliere: "1 minuto"
    },
   
}

const scudi = {
    "scudo": {
        name: "Scudo",
        bonus: "+2",
        peso: "3kg",
        prezzo: "10",
    }
}

const initial_objects = {

}
