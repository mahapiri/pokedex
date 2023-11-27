let pokemonArray = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];


let pokemonNames = [];
let pokemonIDs = [];
let pokemonHeights = []; 
let pokemonImgs = [];
let pokemonBigImgs = [];
let typeOfElements = [];


async function init() {
    await loadPokemon();
    loadCard();
}


async function loadPokemon() {
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        let url = 'https://pokeapi.co/api/v2/pokemon/' + element;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let pokemonName = currentPokemon['name'];
        pokemonNames.push(pokemonName);
        let pokemonID = currentPokemon['id'];
        pokemonIDs.push(pokemonID);
        let pokemonHeight = currentPokemon['height'];
        pokemonHeights.push(pokemonHeight);
        let pokemonImg = currentPokemon['sprites']['other']['dream_world']['front_default'];
        pokemonImgs.push(pokemonImg);
        let pokemonBigImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        pokemonBigImgs.push(pokemonBigImg);
        let typeOfElement = currentPokemon['types']['0']['type']['name'];
        typeOfElements.push(typeOfElement);     
    }
}


function loadCard() {
    let content = document.getElementById('card-section');
    for (let i = 0; i < pokemonArray.length; i++) {
        const element = pokemonArray[i];
        content.innerHTML += /*html*/`
        <div class="card">
            <div class="card-bg"></div>
                <div class="card-index">
                    <h3 class="card-headline">${pokemonNames[i].toUpperCase()}</h3>
                    <h4>#00${pokemonIDs[i]}</h4>
                </div>
                <div class="card-undersection">
                    <div class="info-section">
                        <p class="info-bar">${typeOfElements[i]}</p>
                        <p class="info-bar"></p>
                    </div>
                    <div class="card-undersection-img"><img src="${pokemonImgs[i]}" alt=""></div>
                </div>
        </div>  
    `;
        
    }
    
}