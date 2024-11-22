// Récupere l'id du pokemon dans l'url
const urlParams = new URLSearchParams(window.location.search);
// Récupere l'id du pokemon dans urlParams
const pokemonId = urlParams.get('id');

async function loadPokemonDetails() {
    // On récupere l'url du pokemon
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    // On récupere les données du pokemon
    let res = await fetch(url);
    let pokemon = await res.json();
    // On récupere les élément grace à leurs ID
    document.getElementById("pokemon-name").innerText = pokemon.name.toUpperCase();
    document.getElementById("pokemon-img").src = pokemon.sprites.front_default;
    
    // Ajout des types, récupération de l'élement pokemon-types du html
    const typesDiv = document.getElementById("pokemon-types");
    // Il peut y avoir plusieus type donc boucle foreach
    pokemon.types.forEach(type => {
        // Création du span
        const typeSpan = document.createElement("span");
        // On passe les types en majuscule
        typeSpan.innerText = type.type.name.toUpperCase();
        // On ajoute la class type-box et le type
        typeSpan.classList.add("type-box", type.type.name);
        // On ajoute le span au div
        typesDiv.appendChild(typeSpan);
    });

    // On récupere la description
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    // On récupere les élément grace à leurs ID
    document.getElementById("pokemon-description").innerText = 
        // On récupere la description   
        speciesData.flavor_text_entries[9].flavor_text;
}

// Si l'id du pokemon est présent
if (pokemonId) {
    // On charge les détails du pokemon
    loadPokemonDetails();
}