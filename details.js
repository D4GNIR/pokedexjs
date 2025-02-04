// Récupère l'ID du Pokémon dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

async function loadPokemonDetails() {
    // API pour récupérer les détails du Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const res = await fetch(url);
    const pokemon = await res.json();

    // Met à jour les détails dans le HTML
    document.getElementById("pokemon-name").innerText = pokemon.name.toUpperCase();
    document.getElementById("pokemon-img").src = pokemon.sprites.front_default;

    // Ajout des types
    const typesDiv = document.getElementById("pokemon-types");
    typesDiv.innerHTML = ""; // Réinitialise le contenu
    pokemon.types.forEach(({ type }) => {
        const typeSpan = document.createElement("div");
        typeSpan.classList.add("types", type.name); // Classe pour la couleur
        typeSpan.classList.add("types"); // Classe pour la couleur
        typeSpan.innerText = type.name.toUpperCase(); // Texte en majuscules
        typesDiv.appendChild(typeSpan);
    });

    // Récupère et affiche la description
    const speciesRes = await fetch(pokemon.species.url);
    const speciesData = await speciesRes.json();
    document.getElementById("pokemon-description").innerText =
        speciesData.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
}

// Charge les détails du Pokémon si l'ID est présent
if (pokemonId) {
    loadPokemonDetails();
}
pokemon.types.forEach(({ type }) => {
    const typeSpan = document.createElement("div");
    typeSpan.classList.add("types", type.name); // Ajoute les classes générales et spécifiques
    typeSpan.innerText = type.name.toUpperCase(); // Texte en majuscules
    typesDiv.appendChild(typeSpan);
});





