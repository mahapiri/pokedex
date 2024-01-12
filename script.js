// let pokemonArray = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

let pokemonArray = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];


let cardBg = {
    'fire': 'red',
    'grass': 'green',
    'water': 'blue',
    'electric': 'yellow',
    'bug': 'orange',
    'normal': 'grey',
    'poison': 'lila',
    'ground': 'brown',
    'fairy': 'pink',
    'fighting': 'darkred',
    'psychic': 'mint',
    'rock': 'lightgrey',
    'ghost': 'white',
    'ice': 'lightblue',
    'dragon': 'darkyellow'
};


let pokemonNames = [];
let pokemonIDs = [];
let pokemonHeights = []; 
let pokemonWeights = [];
let pokemonImgs = [];
let pokemonBigImgs = [];
let typeOfElements = [];
let pokemonSpecies = [];
let pokemonEggGroups = [];
let pokemonHabitat = [];
let attackName1 = [];
let attackValue1 = [];
let attackName2 = [];
let attackValue2 = [];
let attackName3 = [];
let attackValue3 = [];
let attackName4 = [];
let attackValue4 = [];
let attackName5 = [];
let attackValue5 = [];

let likes = [];

let currentPokemon;


async function init() {
    await loadPokemon();
    await loadPokemonInfos();
    await loadPokemonBaseStats();
    loadCard();

    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', search);
}


async function loadPokemon() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemonNames.push(currentPokemon['species']['name']);
        pokemonIDs.push(currentPokemon['id']);
        pokemonHeights.push(currentPokemon['height']);
        pokemonWeights.push(currentPokemon['weight']);
        pokemonImgs.push(currentPokemon['sprites']['other']['dream_world']['front_default']);
        pokemonBigImgs.push(currentPokemon['sprites']['other']['official-artwork']['front_default']);
        typeOfElements.push(currentPokemon['types']['0']['type']['name']);
    }
}


async function loadPokemonInfos() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        let url = `https://pokeapi.co/api/v2/pokemon-species/${element}`;
        let response = await fetch(url);
        let currentPokemonSpecies = await response.json();
        pokemonSpecies.push(currentPokemonSpecies['genera']['7']['genus']);
        pokemonEggGroups.push(currentPokemonSpecies['egg_groups']['0']['name']);
        pokemonHabitat.push(currentPokemonSpecies['habitat']['name']);
    }
}


async function loadPokemonBaseStats() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
        let response = await fetch(url);
        let currentPokemonStats = await response.json();

        processStats(currentPokemonStats, i);
    }
}


function processStats(stats, index) {
    pushStatInfo(stats, index, 0, attackName1, attackValue1);
    pushStatInfo(stats, index, 1, attackName1, attackValue2);
    pushStatInfo(stats, index, 2, attackName1, attackValue3);
    pushStatInfo(stats, index, 3, attackName1, attackValue4);
    pushStatInfo(stats, index, 4, attackName1, attackValue5);
}


function pushStatInfo(stats, index, statIndex, nameArray, valueArray) {
    let statName = stats['stats'][statIndex]['stat']['name'];
    let statValue = stats['stats'][statIndex]['base_stat'];

    nameArray.push(statName);
    valueArray.push(statValue);
}


function loadCard() {
    let content = document.getElementById('card-section');
    for (let i = 0; i < pokemonArray.length; i++) {
        content.innerHTML += generateCardHTML(i);
        changeCardBg(i);   
    }    
}


function generateCardHTML(i) {
    let elementImg = generateCardElementImg(i);
    return /*html*/`
         <div class="card" id="card${i}" onclick="loadInfoCard(${i})">
            <div class="card-bg"></div>
                <div class="card-index">
                    <h3 class="card-headline">${pokemonNames[i].toUpperCase()}</h3>
                    <h4>#${pokemonIDs[i]}</h4>
                </div>
            ${elementImg}  
        </div>  
    `;
}


function generateCardElementImg(i) {
    return /*html*/`
        <div class="card-undersection">
            <div class="info-section">
                <p class="info-bar" id="element${i}">${typeOfElements[i]}</p>
                <p class="info-bar"></p>
            </div>
            <div class="card-undersection-img"><img src="${pokemonImgs[i]}" alt=""></div>
        </div>
    `;
}


function changeCardBg(i) {
    let element = document.getElementById(`element${i}`);
    let type = element.innerHTML.trim().toLowerCase();
    let card = document.getElementById(`card${i}`);
    if (cardBg.hasOwnProperty(type)) {
        card.classList.add(cardBg[type]);
    } 
}


function search() {
    let input = document.getElementById('search');
    let filter = input.value.toUpperCase();

    for (let i = 0; i < pokemonArray.length; i++) {
        let card = document.getElementById(`card${i}`);
        let name = pokemonNames[i].toUpperCase();
        if (name.indexOf(filter) > -1) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    }
}


function loadInfoCard(index) {
    let infoCard = document.getElementById('info-card');
    let pokedex = document.getElementById('card-section');
    let header = document.getElementById('header');
    infoCard.classList.remove('none');
    pokedex.classList.add('none');
    header.classList.add('none');
    infoCard.innerHTML = generateInfoCardHTML(index);
    changeInfoCardBg(index);
}


function generateInfoCardHTML(i) {
    return generateInfoCardHeader(i) + generateInfoCardBelow(i);
}


function generateInfoCardHeader(i) {
    let headerText = generateInfoCardHeaderText(i);
    let headerImg = generateInfoCardHeaderImg(i);
    return /*html*/`
        <div class="header cardAbove" id="cardAbove${i}">
             ${headerText} ${headerImg}
        </div>
    `;
}


function generateInfoCardHeaderText(i) {
    return /*html*/`
        <div>
            <img src="img/buttons/back.png" alt="Back" class="back-button invert" onclick="backHome()">
        </div>
        <div class="info-card-headline">
            <div class="i-c-h-undersection">
            <h1 class="card-headline infocard-headline">${pokemonNames[i].toUpperCase()}</h1>
            <div>#${pokemonIDs[i]}</div>
        </div>
        <div class="info-card-section">
            <p class="info-bar mg-270">${typeOfElements[i]}</p>
        </div>
    `;
}


function generateInfoCardHeaderImg(i) {
    return /*html*/`
        <div class="bigImg-section">
            <img src="${pokemonBigImgs[i]}" alt="" class="bigImg">  
        </div>
    `;
}


function generateInfoCardBelow(i) {
    return /*html*/`
        <div class="cardBelow">
            <div class="infocard-below-headline">
                <a href="#" onclick="openAbout(${i})" id="about">About</a>
                <a href="#" class="bold" onclick="openBaseStats(${i})" id="basestats">Base Stats</a>
            </div>
            <div id= "infoBox${i}" class="chart-style">
                <canvas id="myChart${i}"></canvas>
            </div>
        </div>
    `;
}


function changeInfoCardBg(i) {
    let element = document.getElementById(`element${i}`);
    let type = element.innerHTML.trim().toLowerCase();
    let card = document.getElementById(`cardAbove${i}`);
    if (cardBg.hasOwnProperty(type)) {
        card.classList.add(cardBg[type]);
    };
    chartPokemon(i);
}


function openAbout(i) {
    loadInfoCard(i);
    let info = document.getElementById(`infoBox${i}`);
    let about = document.getElementById('about');
    let basestats = document.getElementById('basestats');
    basestats.classList.toggle('bold');
    about.classList.toggle('bold');
    info.innerHTML = generateAboutHTML(i);
}


function generateAboutHTML(i) {
    let speciesRow = generateTableRow('Species', pokemonSpecies[i], '');
    let heightRow = generateTableRow('Height', pokemonHeights[i], 'cm');
    let weightRow = generateTableRow('Weight', pokemonWeights[i], 'grams');
    let breedingHTML = generatedBreedingHTML(pokemonEggGroups[i]);
    return /*html*/`
        <table class="infocard-about">
            <tbody>
                ${speciesRow}
                ${heightRow}
                ${weightRow}
                ${breedingHTML}
            </tbody>
        </table> 
    `;  
}


function generateTableRow(label, value, unit) {
    return /*html*/`
        <tr class="mg-8">
            <td class="gray">${label}</td>
            <td>${value} ${unit}</td>
        </tr>
    `;
}


function generatedBreedingHTML(eggGroups) {
    return /*html*/`
        <tr class="mg-16">
            <th colspan="2">Breeding</th>
        </tr>
        ${generateTableRow('Egg Groups', eggGroups, '')}
    `;
}


function openBaseStats(i) {
    let about = document.getElementById('about');
    about.classList.toggle('bold');
    let basestats = document.getElementById('basestats');
    basestats.classList.toggle('bold');
    loadInfoCard(i);
}


function backHome() {
    location.href = "index.html";
}