const LIBRARY_REF = document.getElementById("library-wrapper");
const CARD_LOADER = document.getElementById("card-loader");
const MY_PKMS = [];

// #region get API Data

async function getPkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    await loadAllDetails();
}

getPkm();

async function getPkmDetails(pkm) {
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`);
    const pkmDetails = await details.json();
    pkm.id = pkmDetails.id;
    pkm.height = pkmDetails.height / 10;
    pkm.weight = pkmDetails.weight / 10;
    pkm.types = pkmDetails.types;
    pkm.att = pkmDetails.stats[1].base_stat;
    pkm.def = pkmDetails.stats[2].base_stat;
    pkm.hp = pkmDetails.stats[0].base_stat;
    pkm.img = pkmDetails.sprites.other["official-artwork"].front_default;
    pkm.shiny = pkmDetails.sprites.other["official-artwork"].front_shiny;
    // console.log(pkm);
}

async function loadAllDetails() {
    for (const pkm of MY_PKMS) {
        await getPkmDetails(pkm);
    }
    console.log(MY_PKMS);
    renderPokemons(MY_PKMS);
    // renderPokemons(MY_PKMS);
}

// #endregion get API Data

// #region Render Pokemons

function renderPokemons(pokemons) {
    LIBRARY_REF.innerHTML = "";
    for (let index = 0; index < pokemons.length; index++) {
        const pkm = pokemons[index];
        LIBRARY_REF.innerHTML += libraryTemplate(pkm);
    }
}

function renderMoreCardsBtn() {
    CARD_LOADER.innerHTML = moreCardsTemplate();
}

// #endregion Render Pokemons

function init() {
    renderMoreCardsBtn();
}
