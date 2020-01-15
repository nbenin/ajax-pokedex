// Main program
document.getElementById('button').addEventListener('click',  function() {

    let pokemonName = document.getElementById('input').value;
    getPokemon(pokemonName);

});

async function getPokemon(name){


    // Create pokemon object
    const pObject = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

    console.log(pObject);
    console.log(pSpecies);
    // Function calls
   setIcon(pObject);
   setMoves(pObject);


    console.log(pObject);
    console.log(pSpecies);



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
    for(i =0; i < 4; i++){
        let getMoves = pokemonObject.moves[i];
        moves.push(getMoves);
    }
    console.log(moves);
}

















