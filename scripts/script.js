//declaring var for pokedex
const p = new Pokedex.Pokedex();

//run click event
document.getElementById('button').onclick = function() {
    getPokemon(getinput());
};

async function getPokemon(pokemonName){

    const pokemon = await p.getPokemonByName(`${pokemonName}`);
    console.log(pokemon);

}

function  getinput() {
    return document.getElementById('input').value;
}











