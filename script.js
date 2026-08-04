const LIBRARY_REF = document.getElementById("library-wrapper");
const MY_PKMS = [];

// #region Render Pokemons

function renderPokemons(pokemons) {
    LIBRARY_REF.innerHTML = "";
    for (let index = 0; index < pokemons.length; index++) {
        const pkm = pokemons[index];
        LIBRARY_REF.innerHTML += libraryTemplate(pkm);
        getPkmDetails(pkm);
    }
}

// #endregion Render Pokemons

// #region get API Data

async function getPkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    const PkmsFromJSON = await Pkms.json();
    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }
    renderPokemons(MY_PKMS);
}

getPkm();

async function getPkmDetails(pkm) {
    const PkmDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkm.name}`);
    const DetailsFromJSON = await PkmDetails.json();
    pkm.id = DetailsFromJSON.id;
    pkm.height = DetailsFromJSON.height;
    pkm.img = DetailsFromJSON.sprites.other["official-artwork"].front_default;
}

async function loadAllDetails() {
    for (const pkm of MY_PKMS) {
        await getPkmDetails(pkm);
    }
    console.log(MY_PKMS);
    renderPkms();
}

// #endregion get API Data
