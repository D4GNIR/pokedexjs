// Nombre de pokemon à afficher
const pokemonCount = 151;
// Pokedex
var pokedex = {};

window.onload = async function () {
  // Dictionnaire des types avec leurs icônes
  const typeIcons = {
    grass: '<i class="fa-brands fa-pagelines"></i>',
    poison: '<i class="fa-solid fa-skull-crossbones"></i>',
    bug: '<i class="fa-solid fa-bug"></i>',
    fire: '<i class="fa-solid fa-fire"></i>',
    flying: '<i class="fa-solid fa-dove"></i>',
    normal: '<i class="fa-solid fa-user-ninja"></i>',
    water: '<i class="fa-solid fa-droplet"></i>',
    electric: '<i class="fa-solid fa-bolt"></i>',
    ground: '<i class="fa-solid fa-archway"></i>',
    fairy: '<i class="fa-solid fa-feather"></i>',
    psychic: '<i class="fa-solid fa-eye"></i>',
    rock: '<i class="fa-solid fa-hill-rockslide"></i>',
    dragon: '<i class="fa-solid fa-dragon"></i>',
    fighting: '<i class="fa-solid fa-user-ninja"></i>',
  };

  // Fonction pour récupérer les données des Pokémon
  async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();
    pokedex[num] = {
      name: pokemon["name"],
      img: pokemon["sprites"]["front_default"],
      type: pokemon["types"][0]["type"]["name"], // Récupère le type principal
    };
  }


  // Boucle pour créer les cartes Pokémon
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);

    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.classList.add("pokemon-card");

    let img = document.createElement("img");
    img.src = pokedex[i]["img"];
    img.alt = pokedex[i]["name"];

    let name = document.createElement("div");
    name.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();

    let icon = document.createElement("div");
    icon.innerText = pokedex[i]["type"]
    icon.classList.add("types");
    

    pokemon.appendChild(img);
    pokemon.appendChild(name);
    pokemon.appendChild(icon);

    pokemon.addEventListener("click", () => {
      window.location.href = `details.html?id=${i}`;
    });

    document.getElementById("pokemon-grid").appendChild(pokemon);
  }
};
