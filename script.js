const LIBRARY_REF = document.getElementById("library-wrapper");
const CARD_LOADER = document.getElementById("card-loader");
const SEARCH_REF = document.getElementById("search");
const SEARCH_INPUT = document.getElementById("search-input");
const SEARCH_BTN = document.getElementById("search-button");
const SEARCH_CONT_REF = document.getElementById("search-button-container");
const DIALOG_REF = document.getElementById("dialog");
const MY_PKMS = [];

// #region get API Data

async function getPkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=0`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    await loadAllDetails();
    const loadBtn = document.getElementById("load-more-button");
    loadBtn.classList.remove("d_none");
}

async function getPkmDetails(pkm) {
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`);
    const pkmDetails = await details.json();
    pkm.id = pkmDetails.id;
    pkm.img = pkmDetails.sprites.other["official-artwork"].front_default;
    pkm.types = pkmDetails.types;
    // pkm.displayname = pkmDetails.name.charAt(0).toUpperCase() + pkmDetails.name.slice(1);
    // want / need to shorten by just pulling stats? and then finetuning in template?
    pkm.height = pkmDetails.height / 10;
    pkm.weight = pkmDetails.weight / 10;
    pkm.att = pkmDetails.stats[1].base_stat;
    pkm.def = pkmDetails.stats[2].base_stat;
    pkm.hp = pkmDetails.stats[0].base_stat;
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
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${MY_PKMS.length}`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    await loadAllDetails();
}

function renderMoreBtn() {
    CARD_LOADER.innerHTML = loadMoreBtnTemplate();
}

// #endregion get API Data

// #region Render Pokemons

function renderPokemons(pokemons) {
    LIBRARY_REF.innerHTML = "";
    for (let index = 0; index < pokemons.length; index++) {
        const pkm = pokemons[index];
        LIBRARY_REF.innerHTML += libraryTemplate(pkm);
    }
    renderSearchBtn();
}

// #region search functionality

function renderSearchBtn() {
    SEARCH_CONT_REF.innerHTML = searchBtnTemplate();
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
        SEARCH_MSSG.innerText = "";
    }
    const loadBtn = document.getElementById("load-more-button");
    loadBtn.classList.add("d_none");
    toggleSearchButton();
}

function toggleSearchButton() {
    SEARCH_CONT_REF.innerHTML = returnBtnTemplate();
}

function returnToLibrary() {
    SEARCH_INPUT.value = "";
    renderPokemons(MY_PKMS);
    document.getElementById("load-more-button").classList.remove("d_none");
}

// #endregion search functionality

// #region dialog

function openPkm(id) {
    const pkm = MY_PKMS.find((p) => p.id === id);
    showModal(pkm);
    DIALOG_REF.classList.add("open");
    DIALOG_REF.showModal();
}

function showModal(pkm) {
    DIALOG_REF.innerHTML = "";
    DIALOG_REF.innerHTML = dialogTemplate(pkm);
}

function closeDialog() {
    DIALOG_REF.close();
    DIALOG_REF.classList.remove("open");
}

// #endregion dialog

// #endregion Render Pokemons

function init() {
    getPkm();
    renderMoreBtn();
}
