let offset = 0;
let limit = 1010; 

    async function fetchPokemonByGeneration(generation) {
        if (generation === 0) {
            offset = 0;
            limit = 1010;
          } else if (generation === 1) {
            offset = 0;
            limit = 151; 
          } else if (generation === 2) {
              offset = 151
              limit = 251
          } else if (generation === 3) {
              offset = 251
              limit = 386 
          } else if (generation === 4) {
              offset = 386
              limit = 493
          } else if (generation === 5) {
              offset = 494
              limit = 649 
          } else if (generation === 6) {
              offset = 649
              limit = 721 
          }

      await fetchPokemon();
    }

    function getColorByType(type) {
        const colors = {
          normal: '#A8A878',
          fire: '#F08030',
          water: '#6890F0',
          electric: '#F8D030',
          grass: '#78C850',
          ice: '#98D8D8',
          fighting: '#C03028',
          poison: '#A040A0',
          ground: '#E0C068',
          flying: '#A890F0',
          psychic: '#F85888',
          bug: '#A8B820',
          rock: '#B8A038',
          ghost: '#705898',
          dragon: '#7038F8',
          dark: '#705848',
          steel: '#B8B8D0',
          fairy: '#EE99AC',
        };
      
        return colors[type.toLowerCase()] || '#777'; // Cor padrão para tipos desconhecidos
      }
      

      async function fetchPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
      
        const pokeListElement = document.getElementById('pokeList');
        pokeListElement.innerHTML = ''; // Limpa a lista antes de adicionar novos Pokémons
      
        data.results.forEach(async pokemon => {
          const pokemonData = await fetch(pokemon.url).then(res => res.json());
      
          const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          const card = document.createElement('div');
          card.classList.add('card', 'col-lg-4', 'col-md-6', 'mb-4');
      
          // Aplica a cor da borda com base no tipo do Pokémon
          const borderColor = pokemonData.types.length > 0 ? getColorByType(pokemonData.types[0].type.name) : '#777';
          card.style.borderColor = borderColor;
      
          card.innerHTML = `
            <img src="${pokemonData.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="${formattedName}">
            <div class="card-body">
              <h5 class="card-title">${formattedName}</h5>
              <p class="card-text">Número: ${pokemonData.id}</p>
              <p class="card-text">Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            </div>
          `;
      
          pokeListElement.appendChild(card);
        });
      }
      
      