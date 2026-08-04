const LIBRARY_REF = document.getElementById("library-wrapper");
const MY_PKMS = [];

// #region Render Pokemons

function renderPokemons(pokemons) {
    LIBRARY_REF.innerHTML = "";
    for (let index = 0; index < pokemons.length; index++) {
        const pkm = pokemons[index];
        // LIBRARY_REF.innerHTML += libraryTemplate(pkm);
        LIBRARY_REF.innerHTML += /*html*/ `
        <div class="library-cards">
            <h3>${pkm.name}</h3>
        </div>
    `;
    }
}

// #endregion Render Pokemons

// #region get API Data

async function getPkm() {
    const Pkms = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    const PkmsFromJSON = await Pkms.json();
    console.log(PkmsFromJSON);
    console.log(PkmsFromJSON.results[1].name);

    for (let i = 0; i < PkmsFromJSON.results.length; i++) {
        MY_PKMS.push(PkmsFromJSON.results[i]);
    }

    renderPokemons(MY_PKMS);
}

getPkm();

// #endregion get API Data
