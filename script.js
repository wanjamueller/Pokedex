const LIBRARY_REF = document.getElementById("library-wrapper");
const CARD_LOADER = document.getElementById("card-loader");
const SEARCH_REF = document.getElementById("search");
const SEARCH_INPUT = document.getElementById("search-input");
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

async function getPkmDetails(pkm) {
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`);
    const pkmDetails = await details.json();
    pkm.id = pkmDetails.id;
    pkm.height = pkmDetails.height / 10;
    pkm.weight = pkmDetails.weight / 10;
    pkm.types = pkmDetails.types;
    // want / need to shorten by just pulling stats? and then finetuning in template?
    pkm.att = pkmDetails.stats[1].base_stat;
    pkm.def = pkmDetails.stats[2].base_stat;
    pkm.hp = pkmDetails.stats[0].base_stat;
    pkm.img = pkmDetails.sprites.other["official-artwork"].front_default;
    pkm.shiny = pkmDetails.sprites.other["official-artwork"].front_shiny;
}

async function loadAllDetails() {
    for (const pkm of MY_PKMS) {
        await getPkmDetails(pkm);
    }
    console.log(MY_PKMS);
    renderPokemons(MY_PKMS);
    // renderPokemons(MY_PKMS);
}

async function getMorePkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${MY_PKMS.length}`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    await loadAllDetails();
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

function renderSearch() {
    SEARCH_REF.innerHTML = searchTemplate();
}

function searchPkm() {
    const SEARCH_MSSG = document.getElementById("search-message");
    const query = SEARCH_INPUT.value.trim().toLowerCase();
    if (query.length < 3) {
        SEARCH_MSSG.innerText = "minimum 3 letter necessary";
        return;
    } else {
        const results = MY_PKMS.filter((pkm) => pkm.name.includes(query));
        renderPokemons(results);
        console.log(results);
    }
    // ...search happens here
}

// #endregion Render Pokemons

function init() {
    getPkm();
}
