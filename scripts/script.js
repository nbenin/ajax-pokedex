// Main program
document.getElementById('button').addEventListener('click',  function() {

    let pokemonName = document.getElementById('input').value;
    getPokemon(pokemonName);

});

async function getPokemon(name){

    //fetch stream of data
    const response1= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

    //convert to json
    const pObject =  await response1.json();
    const pSpecies =   await response2.json();

    console.log(pObject);
    console.log(pSpecies);
    // Function calls
    setIcon(pObject);
    setMoves(pObject);
    getEvolution(pSpecies);

}

//filter icon from object and set to DOM
function setIcon(pokemonObject) {
    let img = pokemonObject.sprites.front_default;
    let icon = document.getElementById('icon');
    icon.src = img;

}

//filter at least 4 moves from object and set to DOM
function setMoves(pokemonObject) {
    let moves = [];
    for(i =0; i < pokemonObject.moves.length; i++){
        let getMoves = pokemonObject.moves[i];
        moves.push(getMoves);
    }
    console.log(moves);
}

//filter previous evolutions if any
function getEvolution(species){

    let preEvolution = '';

    if (species.evolves_from_species.name === null) {
        return "No previous evolution";
    }
    else {
        preEvolution = species.evolves_from_species.name;
    }

    console.log(preEvolution);

}


















