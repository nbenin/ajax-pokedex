// Declaring var for pokedex, using pokeapi-js-wrapper
const p = new Pokedex.Pokedex();

// Main program
document.getElementById('button').addEventListener('click',  function() {

    let pokemonName = document.getElementById('input').value;
    getPokemon(pokemonName);

});

async function getPokemon(name){

    // Create pokemon object
    const pokemonObject = await p.getPokemonByName(`${name}`);

    // Function calls
    getIcon(pokemonObject);


}

function getIcon(pokemonObject) {
    let img = pokemonObject.sprites.front_default;
    let icon =document.getElementById('icon');
    icon.src = img;
}















