const pokemonCount = 300;
var pokedex = {}; // {1 : {"name" : "bulbsaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }

window.onload = async function() {
    // Récupérer l'ID du Pokémon depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    
    if (pokemonId) {
        await getPokemon(pokemonId);
        updatePokemonDetails(pokemonId);
    }
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    // console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc};

}

function updatePokemonDetails(id) {
    document.getElementById("pokemon-img").src = pokedex[id]["img"];

    let typesDiv = document.getElementById("pokemon-types");
    typesDiv.innerHTML = '';

    let types = pokedex[id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        typesDiv.append(type);
    }

    document.getElementById("pokemon-description").innerText = pokedex[id]["desc"];
}