const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

async function loadPokemonDetails() {
    if (!pokemonId) {
        console.error("Aucun ID de Pokémon trouvé dans l'URL !");
        return;
    }

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = await res.json();

        // Nom et image du Pokémon
        document.getElementById("pokemon-name").innerText = pokemon.name.toUpperCase();
        document.getElementById("pokemon-img").src = pokemon.sprites.front_default;

        // Types
        const typesDiv = document.getElementById("pokemon-types");
        typesDiv.innerHTML = ""; // Nettoyer les anciens types
        const typeColors = pokemon.types.map(({ type }) => {
            const typeColor = getTypeColor(type.name);
            const typeSpan = document.createElement("div");
            typeSpan.classList.add("types");
            typeSpan.innerText = type.name.toUpperCase();
            typeSpan.style.backgroundColor = typeColor; // Couleur de fond du type
            typesDiv.appendChild(typeSpan);
            return typeColor;
        });

        // Gérer le fond (un seul type ou deux types)
        const carDiv = document.getElementById("pokemon-detail-container");
        if (typeColors.length === 1) {
            carDiv.style.background = typeColors[0];
        } else if (typeColors.length === 2) {
            carDiv.style.background = `linear-gradient(90deg, ${typeColors[0]}, ${typeColors[1]})`;
        }

        const typeIcons = {
            grass: '<i class="fa-brands fa-pagelines"></i>',
            poison: '<i class="fa-solid fa-skull-crossbones"></i>',
            bug: '<i class="fa-solid fa-bug"></i>',
            fire: '<i class="fa-solid fa-fire"></i>',
            flying: '<i class="fa-solid fa-dove"></i>',
            normal: '<i class="fa-solid fa-star"></i>">',
            water: '<i class="fa-solid fa-droplet"></i>',
            electric: '<i class="fa-solid fa-bolt"></i>',
            ground: '<i class="fa-solid fa-archway"></i>',
            fairy: '<i class="fa-solid fa-feather"></i>',
            psychic: '<i class="fa-solid fa-eye"></i>',
            rock: '<i class="fa-solid fa-hill-rockslide"></i>',
            dragon: '<i class="fa-solid fa-dragon"></i>',
            fighting: '<i class="fa-solid fa-user-ninja"></i>'
          };
          
          // Exemple de fonction pour ajouter l'icône dans une case
          function addIconToCard(pokemonType, cardElement) {
            const iconHTML = typeIcons[pokemonType] || ''; // Récupérer l'icône ou une chaîne vide si non trouvée
            cardElement.innerHTML += iconHTML; // Ajouter l'icône à l'intérieur de la carte
          }
          
          // Exemple d'utilisation
          const pokedexCards = document.querySelectorAll('.pokemon-card'); // Sélectionne toutes les cartes
          pokedexCards.forEach(card => {
            const pokemonType = card.dataset.type; // Supposons que le type soit défini comme attribut data-type
            addIconToCard(pokemonType, card); // Ajoute l'icône correspondante
          });

        // Description
        const speciesRes = await fetch(pokemon.species.url);
        const speciesData = await speciesRes.json();
        const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
        document.getElementById("pokemon-description").innerText =
            flavorText ? flavorText.flavor_text.replace(/\n|\f/g, ' ') : "Description non disponible.";
    } catch (error) {
        console.error("Erreur lors du chargement des détails :", error);
    }
}

// Fonction pour obtenir la couleur en fonction du type
function getTypeColor(type) {
    const colors = {
        grass: 'green',
        poison: 'purple',
        bug: '#62FF00',
        fire: 'orange',
        flying: '#687ED8',
        normal: '#C1B8A0',
        water: 'blue',
        electric: 'yellow',
        ground: 'brown',
        fairy: '#FF02A7',
        psychic: '#840B86',
        rock: '#353535',
        dragon: '#978306',
        fighting:'rgb(214, 85, 11',
    };
    
    return colors[type] || 'gray'; // Couleur par défaut

}

// Charger les détails du Pokémon
loadPokemonDetails();   
// Référence à l'élément audio
const audio = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-music');

// Charger l'état de la musique
if (localStorage.getItem('musicPlaying') === 'true') {
    audio.play();
    toggleButton.textContent = "Pause";
} else {
    audio.pause();
    toggleButton.textContent = "Play";
}

// Gérer le bouton pause/play
toggleButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        toggleButton.textContent = "Pause";
        localStorage.setItem('musicPlaying', 'true'); // Sauvegarder l'état
    } else {
        audio.pause();
        toggleButton.textContent = "Play";
        localStorage.setItem('musicPlaying', 'false'); // Sauvegarder l'état
    }
});