// Nombre de pokemon à afficher
const pokemonCount = 151;
// Pokedex
var pokedex = {};

window.onload = async function() {
    // Boucle pour récuperer les pokemon
    for (let i = 1; i <= pokemonCount; i++) {
        // Récupere les données du pokemon
        await getPokemon(i);
        // Création de la carte pokemon
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.classList.add("pokemon-card");
        // Récupere l'image du pokemon
        let img = document.createElement("img");
        img.src = pokedex[i]["img"];
        // Récupere le nom du pokemon
        let name = document.createElement("div");
        name.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        // Ajoute l'image et le nom au pokemon
        pokemon.appendChild(img);
        pokemon.appendChild(name);
        // Ajoute un écouteur d'événement pour le click
        pokemon.addEventListener("click", () => {
            window.location.href = `details.html?id=${i}`;
        });
        // Ajoute la carte au pokedex
        document.getElementById("pokemon-grid").appendChild(pokemon);
    }
}

// Récupere les données du pokemon
async function getPokemon(num) {
    // Récupere l'url du pokemon
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    // Récupere les données du pokemon
    let res = await fetch(url);
    let pokemon = await res.json();
    // Ajoute les données du pokemon dans le pokedex
    pokedex[num] = {
        "name": pokemon["name"],
        "img": pokemon["sprites"]["front_default"],
        
    
    };
}