const pokemonContainer = document.getElementById('poke-container'),
  pokemonCount = 150;

const colors = {
  fire: '#fc523f',
  grass: '#0e873a',
  electric: '#dbd225',
  water: '#4287ed',
  ground: '#4d4a19',
  rock: '#3d3d32',
  fairy: '#db56ce',
  poison: '#3ce87b',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#998a70',
  fighting: '#E6E0D4',
  normal: '#ded2bd',
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0');

  const pokemonTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokemonTypes.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
	<div class="img-container">
		<img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" alt="">
	</div>
	<div class="info">
		<span class="number">#${id}</span>
		<h3 class="name">${name}</h3>
		<small class="type">Type: <span>${type}</span> </small>
	</div>
`;

  pokemonEl.innerHTML = pokemonInnerHTML;

  pokemonContainer.appendChild(pokemonEl);
};

fetchPokemons();
