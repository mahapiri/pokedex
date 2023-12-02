let pokemonArray = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

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
let typeTwo = [];
let pokemonSpecies = []; // Was für ein Pokemon Art
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
        // pokemonNames.push(currentPokemon['species']);   / Englische Pokemon Namen
        pokemonIDs.push(currentPokemon['id']);
        pokemonHeights.push(currentPokemon['height']);
        pokemonWeights.push[currentPokemon['weight']];
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
        pokemonNames.push(currentPokemonSpecies['names']['5']['name']);
        pokemonSpecies.push(currentPokemonSpecies['genera']['4']['genus']);
        pokemonEggGroups.push(currentPokemonSpecies['egg_groups']['0']['monster']);
        pokemonHabitat.push(currentPokemonSpecies['habitat']['name']);
    }
}

async function loadPokemonBaseStats() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
        let response = await fetch(url);
        let currentPokemonStats = await response.json();
        attackName1.push(currentPokemonStats['stats']['0']['stat']['name']);
        attackValue1.push(currentPokemonStats['stats']['0']['base_stat']);
        attackName2.push(currentPokemonStats['stats']['1']['stat']['name']);
        attackValue2.push(currentPokemonStats['stats']['1']['base_stat']);
        attackName3.push(currentPokemonStats['stats']['2']['stat']['name']);
        attackValue3.push(currentPokemonStats['stats']['2']['base_stat']);
        attackName4.push(currentPokemonStats['stats']['3']['stat']['name']);
        attackValue4.push(currentPokemonStats['stats']['3']['base_stat']);
        attackName5.push(currentPokemonStats['stats']['4']['stat']['name']);
        attackValue5.push(currentPokemonStats['stats']['5']['base_stat']);
    }
}


async function loadTypeTwo() {
    let newItem = currentPokemon['types']['1']['type']['name'];

    try {
        await fetch (newItem);
        typeTwo.indexOf(newItem) === -1 ? typeTwo.push(newItem): console.log('Fertig');
    } catch (e) {
        console.log('Fehler')
    }
}


function generateCardHTML(i) {
    return /*html*/`
         <div class="card" id="card${i}" onclick="loadInfoCard(${i})">
            <div class="card-bg"></div>
                <div class="card-index">
                    <h3 class="card-headline">${pokemonNames[i].toUpperCase()}</h3>
                    <h4>#${pokemonIDs[i]}</h4>
                </div>
                <div class="card-undersection">
                    <div class="info-section">
                        <p class="info-bar" id="element${i}">${typeOfElements[i]}</p>
                        <p class="info-bar"></p>
                    </div>
                    <div class="card-undersection-img"><img src="${pokemonImgs[i]}" alt=""></div>
                </div>
        </div>  
    `;
}

function loadCard() {
    let content = document.getElementById('card-section');
    for (let i = 0; i < pokemonArray.length; i++) {
        content.innerHTML += generateCardHTML(i);
        changeCardBg(i);   
    }    
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
    return /*html*/`
            <div class="header cardAbove" id="cardAbove${i}">
                <div>
                    <img src="img/buttons/back.png" alt="Back" class="back-button invert" onclick="">
                    <img src="img/buttons/love.png" alt="Love" class="love-button">
                </div>
                <div class="info-card-headline">
                    <div class="i-c-h-undersection">
                        <h1 class="card-headline">${pokemonNames[i].toUpperCase()}</h1>
                        <div>#${pokemonIDs[i]}</div>
                    </div>
                    <div class="info-card-section">
                        <p class="info-bar">${typeOfElements[i]}</p>
                        <p class="info-bar">cool</p>
                    </div>
                </div>
                <div class="bigImg-section">
                    <img src="${pokemonBigImgs[i]}" alt="" class="bigImg">  
                </div>
            </div>
            <div class="cardBelow">
                <div>
                    <a href="">About</a>
                    <a href="">Base Stats</a>
                </div>
                <tbody>
                    <tr>
                        <td>Species</td>
                        <td>${pokemonSpecies[i]}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>${pokemonHeights[i]}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${pokemonWeights[i]}</td>
                    </tr>
                </tbody>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Breeding</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Egg Groups</td>
                            <td>${pokemonEggGroups[i]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>       
    `;
}


function changeInfoCardBg(i) {
    let element = document.getElementById(`element${i}`);
    let type = element.innerHTML.trim().toLowerCase();
    let card = document.getElementById(`cardAbove${i}`);
    if (cardBg.hasOwnProperty(type)) {
        card.classList.add(cardBg[type]);
    } 
}