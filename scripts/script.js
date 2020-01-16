// Main program
document.getElementById('button').addEventListener('click',  function() {

    let pokemonName = document.getElementById('input').value;
    getPokemon(pokemonName);

    //output name in DOM element
    document.getElementById('Pname').innerHTML = pokemonName;

});

async function getPokemon(name){

    //fetch stream of data
    const response1= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

    //convert to json
    const pObject =  await response1.json();
    const pSpecies =   await response2.json();

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

    // fill an array with up to 4 moves
    let moves = [];
    for(i =0; i < pokemonObject.moves.length; i++){
        let getMoves = pokemonObject.moves[i];
        moves.push(getMoves);
        if (i >= 3) {
            break;
        }
    }
    console.log(moves);

}

//filter Pre evoolution and set icon for said pokemon
async function getEvolution(species){

    let preEvolution = '';

    if (species.evolves_from_species == null) {
        preEvolution = "No previous evolution";
    }
    else {
        preEvolution = species.evolves_from_species.name;
    }
    
    //need to do a fetch to get the json of the evolution pokemon, so i can get the image, not in the other json
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${preEvolution}`);
    let evolutionObject = await res.json();

    //seticon to dom
    let src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionObject.id}.png`;
    let icon = document.getElementById('iconEvolution');
    icon.src = src;

}




















