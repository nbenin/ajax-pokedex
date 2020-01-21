// Globals
const DESCRIPTIONDIV = document.getElementById('description');
const DESCRIPTIONTEXT = document.getElementById('information');
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
    console.log(pSpecies);

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

    // Loop through and get english flavortext
    for (x = 0; x < species.flavor_text_entries.length; x++) {
        if (species.flavor_text_entries[x].language.name === "en") {
            DESCRIPTIONTEXT.innerHTML = species.flavor_text_entries[x].flavor_text;
            break;
        }
        else {
            continue;
        }
    }
}

// Filter at least 4 moves from object and set to DOM
function setMoves(pokemonObject) {
    console.log(pokemonObject);

    // Fill an array with up to 4 random moves
    let moves = [];
    let numberOfMoves = 4;

    // Special case for pokemon with less than 4 moves (Ditto)
    if (pokemonObject.moves.length < 3) {
        numberOfMoves = pokemonObject.moves.length;
    }

    // Random number generator, if same number generated, will skip
    while (moves.length < numberOfMoves) {
        let randomNum = Math.floor(Math.random() * pokemonObject.moves.length);
        if (moves.length === 0) {
            moves.push(pokemonObject.moves[randomNum].move.name);
        }
        else {
            for (x = 0; x < moves.length; x++) {
                if (pokemonObject.moves[randomNum].move.name === moves[x]) {
                    break;
                }
                else {
                    continue;
                }
            }
            moves.push(pokemonObject.moves[randomNum].move.name);
        }

    }

    // Append moves list to innerHTML
    MOVESLIST.innerHTML = '';
    for (x = 0; x < moves.length; x++) {
        MOVESLIST.innerHTML += '<li>' + moves[x] + '</li>';
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
