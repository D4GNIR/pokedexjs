const pokemonCount = 300;
var pokedex = {};

window.onload = async function() {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.classList.add("pokemon-card");
        
        let img = document.createElement("img");
        img.src = pokedex[i]["img"];
        
        let name = document.createElement("div");
        name.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        
        pokemon.appendChild(img);
        pokemon.appendChild(name);
        
        pokemon.addEventListener("click", () => {
            window.location.href = `details.html?id=${i}`;
        });
        
        document.getElementById("pokemon-grid").appendChild(pokemon);
    }
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();

    pokedex[num] = {
        "name": pokemon["name"],
        "img": pokemon["sprites"]["front_default"],
    };
}