function libraryTemplate(pkm) {
    return /*html*/ `
        <div class="library-cards">
            <button data-id="card" onclick="openPkm(${pkm.id})">
            <h2>${pkm.id}</h2>    
            <h3>${pkm.name}</h3>
            <img data-id="card-image${pkm.id}" class="default-image" src="${pkm.img}" alt="Image of ${pkm.name}">
            <p>${pkm.types[0].type.name}</p>
            ${pkm.types[1] ? `<p>${pkm.types[1].type.name}</p>` : ""}
            </button>
        </div>
    `;
}

function searchBtnTemplate() {
    return /*html*/ `
        <button data-id="search-button" id="search-button" class="search-button" onclick="searchPkm()">Search</button>
    `;
}

function returnBtnTemplate() {
    return /*html*/ `
        <button data-id="search-button" id="search-button" class="search-button" onclick="returnToLibrary()">Back</button>
    `;
}

function dialogTemplate(pkm) {
    return /*html*/ `
        <div data-id="overlay-pokemon-name" class="focus-card">
            <button data-id="close-dialog-button" onclick="closeDialog()">X</button>
            <h3>${pkm.name}</h3>
            <img data-id="dialog-image" class="default-image" src="${pkm.img}" alt="Image of ${pkm.name}">
            <p>Height: ${pkm.height} m</p>
            <p>Weight: ${pkm.weight} Kg</p>
            <p>${pkm.types[0].type.name}</p>
            ${pkm.types[1] ? `<p>${pkm.types[1].type.name}</p>` : ""}
            <p>Attack: ${pkm.att} Pts</p>
            <p>Defense: ${pkm.def} Pts</p>
            <p>Health: ${pkm.hp} Pts</p>
            <button data-id="next-button" onclick="nextPkm(${pkm.id})">Next</button>
            <button data-id="prev-button" onclick="prevPkm(${pkm.id})">Previous</button>
        </div>
    `;
}
