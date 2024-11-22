const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

async function loadPokemonDetails() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    let res = await fetch(url);
    let pokemon = await res.json();

    document.getElementById("pokemon-name").innerText = pokemon.name.toUpperCase();
    document.getElementById("pokemon-img").src = pokemon.sprites.front_default;
    
    // Types
    const typesDiv = document.getElementById("pokemon-types");
    pokemon.types.forEach(type => {
        const typeSpan = document.createElement("span");
        typeSpan.innerText = type.type.name.toUpperCase();
        typeSpan.classList.add("type-box", type.type.name);
        typesDiv.appendChild(typeSpan);
    });

    // Description
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    document.getElementById("pokemon-description").innerText = 
        speciesData.flavor_text_entries[9].flavor_text;
}

if (pokemonId) {
    loadPokemonDetails();
}