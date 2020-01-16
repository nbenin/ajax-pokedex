// Globals
const DESCRIPTIONDIV =document.getElementById('description');
const MOVESDIV = document.getElementById('moves');
const EVOLUTIONDIV = document.getElementById('evolution');

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

    // Set First Information
    setDescription(pSpecies);
    setIcon(pObject);


    // Activate buttons
    let descriptionCount = 0;


    document.getElementById('nextButton').addEventListener('click', function () {
        descriptionCount++;
        if (descriptionCount === 1) {
            DESCRIPTIONDIV.style.visibility= 'hidden';
            setMoves(pObject);

        }
        else if (descriptionCount === 2) {
            MOVESDIV.style.visibility='hidden';
            setEvolution(pSpecies);
        }
        else {
            EVOLUTIONDIV.style.visibility="hidden";
            setDescription(pSpecies);
            descriptionCount = 0;
        }
    });
    document.getElementById('prevButton').addEventListener('click', function () {
        descriptionCount--;
        if (Math.abs(descriptionCount) === 1) {
            DESCRIPTIONDIV.style.visibility= 'hidden'
            setEvolution(pSpecies);
        }
        else if (Math.abs(descriptionCount) === 2) {
            EVOLUTIONDIV.style.visibility="hidden";
            setMoves(pObject);
        }
        else {
            MOVESDIV.style.visibility='hidden';
            setDescription(pSpecies);
            descriptionCount = 0;
        }
    });


}

//filter icon from object and set to DOM
function setIcon(pokemonObject) {
    let img = pokemonObject.sprites.front_default;
    let icon = document.getElementById('icon');
    icon.src = img;
    icon.style.visibility= "visible";

}

function setDescription(species) {
    DESCRIPTIONDIV.style.visibility= "visible";
    console.log(species.flavor_text_entries[2]);
    document.getElementById('information').innerHTML = species.flavor_text_entries[2].flavor_text;
}


//filter at least 4 moves from object and set to DOM
function setMoves(pokemonObject) {

    MOVESDIV.style.visibility = 'visible';

    // fill an array with up to 4 moves
    let moves = [];
    for(i =0; i < pokemonObject.moves.length; i++){
        let getMoves = pokemonObject.moves[i];
        moves.push(getMoves);
        if (i >= 3) {
            break;
        }
    }

    document.getElementById('movesList').innerHTML = moves;
}

//filter Pre evoolution and set icon for said pokemon
async function setEvolution(species){

    EVOLUTIONDIV.style.visibility = 'visible';

    let preEvolution = '';
    let icon = document.getElementById('iconEvolution');

    if (species.evolves_from_species == null) {
        preEvolution = "No previous evolution";
        document.getElementById('evolutionName').innerHTML = preEvolution;
    }
    else {
        preEvolution = species.evolves_from_species.name;

        //need to do a fetch to get the json of the evolution pokemon, so i can get the image, not in the other json
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${preEvolution}`);
        let evolutionObject = await res.json();

        //seticon to dom
        let src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionObject.id}.png`;
        icon.src = src;
        document.getElementById('evolutionName').innerHTML = preEvolution;
    }
    


}




















