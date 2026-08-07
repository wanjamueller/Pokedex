const LIBRARY_REF = document.getElementById("library-wrapper");
const SEARCH_REF = document.getElementById("search");
const SEARCH_INPUT = document.getElementById("search-input");
const SEARCH_BTN = document.getElementById("search-button");
const SEARCH_CONT_REF = document.getElementById("search-button-container");
const SEARCH_MSSG = document.getElementById("search-message");
const DIALOG_REF = document.getElementById("dialog");
const LOAD_BTN_REF = document.getElementById("load-more-button");
const STAT_MAX = 150;
const MY_PKMS = [];

// #region get API Data

async function getPkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=0`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    await loadDetails();
    LOAD_BTN_REF.classList.remove("d_none");
}

async function getPkmDetails(pkm) {
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`);
    const pkmDetails = await details.json();
    pkm.id = pkmDetails.id;
    pkm.img = pkmDetails.sprites.other["official-artwork"].front_default;
    pkm.types = pkmDetails.types;
    pkm.shiny = pkmDetails.sprites.other["official-artwork"].front_shiny;
}

async function loadDetails() {
    for (const pkm of MY_PKMS) {
        await getPkmDetails(pkm);
    }
    renderPokemons(MY_PKMS);
}

async function getMorePkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${MY_PKMS.length}`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    await loadDetails();
}

async function addPkmDetails(pkm) {
    const details = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`);
    const pkmDetails = await details.json();
    pkm.height = pkmDetails.height / 10;
    pkm.weight = pkmDetails.weight / 10;
    pkm.att = pkmDetails.stats[1].base_stat;
    pkm.def = pkmDetails.stats[2].base_stat;
    pkm.hp = pkmDetails.stats[0].base_stat;
    pkm.ab = pkmDetails.abilities[0].ability.name;
}

async function loadAddDetails() {
    for (const pkm of MY_PKMS) {
        await addPkmDetails(pkm);
    }
    console.log(MY_PKMS);
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
    setCardBackground();
}

function setCardBackground() {
    const libCardRef = document.getElementById(`library-cards-${pkm.id}`);
    const typeColor = MY_PKM.types[0].type.name;
    libCardRef.classList.add(typeColor);
}

// #region search functionality

function renderSearchBtn() {
    SEARCH_CONT_REF.innerHTML = searchBtnTemplate();
}

function searchPkm() {
    const query = SEARCH_INPUT.value.trim().toLowerCase();
    const results = MY_PKMS.filter((pkm) => pkm.name.includes(query));
    searchFlow(results, query);
}

function searchFlow(results, query) {
    if (query.length < 3) {
        SEARCH_MSSG.innerText = "minimum 3 letter necessary";
        setTimeout(() => (SEARCH_MSSG.innerText = ""), 3000);
    } else {
        if (results.length === 0) {
            SEARCH_MSSG.innerText = `no pokemon found for "${query}"`;
        } else {
            renderPokemons(results);
            SEARCH_MSSG.innerText = "";
        }
        LOAD_BTN_REF.classList.add("d_none");
        toggleSearchButton();
    }
}

function toggleSearchButton() {
    SEARCH_CONT_REF.innerHTML = returnBtnTemplate();
}

function returnToLibrary() {
    SEARCH_INPUT.value = "";
    SEARCH_MSSG.innerText = "";
    renderPokemons(MY_PKMS);
    document.getElementById("load-more-button").classList.remove("d_none");
}

// #endregion search functionality

// #region dialog

async function openPkm(id) {
    const pkm = MY_PKMS.find((p) => p.id === id);
    await loadAddDetails();
    showModal(pkm);
    renderStats(pkm);
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
    renderPokemons(MY_PKMS);
}

// grid
function calcStatPercent(value) {
    return Math.min((value / STAT_MAX) * 100, 100);
}

function renderStats(pkm) {
    const stats = [
        { label: "HP", value: pkm.hp },
        { label: "Attack", value: pkm.att },
        { label: "Defense", value: pkm.def },
        // { label: "Sp. Atk", value: pkm.spAtt },
        // { label: "Sp. Def", value: pkm.spDef },
        // { label: "Speed", value: pkm.speed },
    ];
    const StatRef = document.getElementById("stats-grid");
    for (let i = 0; i < stats.length; i++) {
        const percent = calcStatPercent(stats[i].value);
        StatRef.innerHTML += statRowTemplate(stats[i].label, stats[i].value, percent);
    }
}

function nextPkm(id) {
    const pkm = MY_PKMS.find((p) => p.id === id + 1);
    if (pkm.id == MY_PKMS.length + 1) pkm.id = 1;
    return showModal(pkm);
}

function prevPkm(id) {
    const pkm = MY_PKMS.find((p) => p.id === id - 1);
    if (pkm.id === 1) pkm.id = MY_PKMS.length + 1;
    return showModal(pkm);
}

// #endregion dialog

// #endregion Render Pokemons

function init() {
    getPkm();
}
