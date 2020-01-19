// Globals
const DESCRIPTIONDIV = document.getElementById('description');
const MOVESDIV = document.getElementById('moves');
const EVOLUTIONDIV = document.getElementById('evolution');
const EVOLUTIONICON = document.getElementById('iconEvolution');
const EVOLUTIONTEXT = document.getElementById('evolutionName');
const MOVESLIST = document.getElementById('movesList');
const ICON = document.getElementById('icon');

// Main program
document.getElementById('button').addEventListener('click',  function() {

    // Set all information to empty when new search
    if (MOVESLIST.hasChildNodes()) {
        for (y = 0; y < moves.length; y++) {
            MOVESLIST.removeChild(MOVESLIST.childNodes[0]);
        }
    }
    DESCRIPTIONDIV.style.display = 'none';
    MOVESDIV.style.display = 'none';
    EVOLUTIONDIV.style.display = 'none';

    let pokemonName = document.getElementById('input').value.toLowerCase();
    getPokemon(pokemonName);

});

async function getPokemon(name){

    // Fetch data and convert to JSON
    const response1= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const pObject =  await response1.json();
    const pSpecies =   await response2.json();

    // Set First Information
    setDescription(pSpecies);
    setIcon(pObject);
    DESCRIPTIONDIV.style.display = "block";
    setEvolution(pSpecies);
    setMoves(pObject);

    // Activate buttons
    let descriptionCount = 0;

    document.getElementById('nextButton').addEventListener('click', function () {

        if (descriptionCount === 0) {
            descriptionCount++;
            DESCRIPTIONDIV.style.display = 'none';
            EVOLUTIONDIV.style.display = 'none';
            MOVESDIV.style.display = 'block';
        }
        else if (descriptionCount === 1) {
            descriptionCount++;
            MOVESDIV.style.display ='none';
            DESCRIPTIONDIV.style.display = 'none';
            EVOLUTIONDIV.style.display = 'block';
        }
        else {
            descriptionCount = 0;
            EVOLUTIONDIV.style.display = 'none';
            MOVESDIV.style.display = 'none';
            DESCRIPTIONDIV.style.display = 'block';
        }
    });

    document.getElementById('prevButton').addEventListener('click', function () {

        if (descriptionCount === 0) {
            descriptionCount = 2;
            DESCRIPTIONDIV.style.display= 'none';
            MOVESDIV.style.display='none';
            EVOLUTIONDIV.style.display = 'block';
        }
        else if (descriptionCount === 2) {
            descriptionCount--;
            DESCRIPTIONDIV.style.display= 'none';
            EVOLUTIONDIV.style.display="none";
            MOVESDIV.style.display = 'block'
        }
        else {
            descriptionCount--;
            MOVESDIV.style.display='none';
            EVOLUTIONDIV.style.display="none";
            DESCRIPTIONDIV.style.display = 'block';
        }
    });
}

// Filter icon from object and set to DOM
function setIcon(pokemonObject) {

    let img = pokemonObject.sprites.front_default;
    ICON.src = img;
    ICON.style.display = "block";
}

// Set flavor text
function setDescription(species) {

    document.getElementById('information').innerHTML = species.flavor_text_entries[2].flavor_text;
}

// Filter at least 4 moves from object and set to DOM
function setMoves(pokemonObject) {

    // Fill an array with up to 4 moves
    let moves = [];
    for(i =0; i < pokemonObject.moves.length; i++){
        let getMoves = pokemonObject.moves[i];
        moves.push(getMoves);
        if (i >= 3) {
            break;
        }
    }

    MOVESLIST.innerHTML = '';
    for (x = 0; x < moves.length; x++) {
        MOVESLIST.innerHTML += '<li>' + moves[x].move.name + '</li>';
    }
}

// Filter Pre evolution and set icon for said pokemon
async function setEvolution(species) {

    let preEvolution = '';

    if (species.evolves_from_species == null) {
        EVOLUTIONICON.style.display = 'none';
        preEvolution = "No previous evolution";
        EVOLUTIONTEXT.innerHTML = preEvolution;
    }

    else {
        preEvolution = species.evolves_from_species.name;

        // Fetch the json of the evolution pokemon for sprite
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${preEvolution}`);
        let evolutionObject = await res.json();

        // Set to DOM
        let src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionObject.id}.png`;
        EVOLUTIONICON.src = src;
        EVOLUTIONTEXT.innerHTML = preEvolution;
        EVOLUTIONICON.style.display = 'block';
    }
}
