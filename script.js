let clicks = 0;
const button = document.getElementById("clicker");

const generatePg = () => {
    const classespg = ["Warlock", "Druid", "Warrior", "Paladin", "Unicorn"];
    const races = ["Human", "Elf", "Half-Elf", "Dwarf", "Half-Orc", "Halfling", "Gnome"];
    let life;

    const classpg = classespg[Math.floor(Math.random() * classespg.length)];
    const racepg = races[Math.floor(Math.random() * races.length)];

    document.getElementById("classPg").textContent = classpg;
    document.getElementById("race").textContent = racepg;

    // Set stats based on race of the pg as per 3.5
    switch (racepg) {
        case "Human":
            document.getElementById("modifier").textContent = "Nessuno";
            break;
        case "Dwarf":
            document.getElementById("modifier").textContent = "+2 Costituzione, -2 Carisma";
            break;
        case "Elf":
            document.getElementById("modifier").textContent = "+2 Destrezza, -2 Costituzione";
            break;
        case "Gnome":
            document.getElementById("modifier").textContent = "+2 Costituzione, -2 Carisma";
            break;
        case "Half-Elf":
            document.getElementById("modifier").textContent = "Nessuno";
            break;
        case "Half-Orc":
            document.getElementById("modifier").textContent = "+2 Forza, -2 Intelligenza";
            break;
        case "Halfling":
            document.getElementById("modifier").textContent = "+2 Destrezza, -2 Forza";
            break;
        default:
            break;
    }

    // Set stats based on class of the pg as per 3.5
    switch (classpg) {
        case "Warlock":
            life = Math.floor(Math.random() * 4) + 1;
            document.getElementById("life").textContent = life;
            break;
        default:
            break;
    }
};

const incrementClickCount = () => {
    clicks++;
    document.getElementById("clickCount").textContent = clicks;
};

button.addEventListener("click", () => {
    generatePg();
    incrementClickCount();
});
