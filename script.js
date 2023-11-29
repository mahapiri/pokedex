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
let pokemonImgs = [];
let pokemonBigImgs = [];
let typeOfElements = [];


async function init() {
    await loadPokemon();
    loadCard();

    let searchInput = document.getElementById('search');
    searchInput.addEventListener('input', search);
}


async function loadPokemon() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        let url = `https://pokeapi.co/api/v2/pokemon/${element}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        pokemonNames.push(currentPokemon['name']);
        pokemonIDs.push(currentPokemon['id']);
        pokemonHeights.push(currentPokemon['height']);
        pokemonImgs.push(currentPokemon['sprites']['other']['dream_world']['front_default']);
        pokemonBigImgs.push(currentPokemon['sprites']['other']['official-artwork']['front_default']);
        typeOfElements.push(currentPokemon['types']['0']['type']['name']);     
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
                    <img src="img/buttons/back.png" alt="Back" class="back-button invert">
                    <img src="img/buttons/love.png" alt="Love" class="love-button">
                </div>
                <div class="info-card-headline">
                    <div class="i-c-h-undersection">
                        <h1 class="card-headline">${pokemonNames[i].toUpperCase()}</h1>
                        <div>#001</div>
                    </div>
                    <div class="info-card-section">
                        <p class="info-bar">Grass</p>
                        <p class="info-bar">Poison</p>
                    </div>
                </div>
                <img src="" alt="">
            </div>
            <div class="cardBelow"></div>       
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