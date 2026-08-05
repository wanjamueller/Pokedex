function libraryTemplate(pkm) {
    return /*html*/ `
        <div class="library-cards">
            <h3>${pkm.name}</h3>
            <img data-id="card-image${pkm.id}" class="default-image" src="${pkm.img}" alt="Image of ${pkm.name}">
            <p>Height: ${pkm.height} m</p>
            <p>Weight: ${pkm.weight} Kg</p>
            <p>${pkm.types[0].type.name}</p>
            ${pkm.types[1] ? `<p>${pkm.types[1].type.name}</p>` : ""}
            <p>Attack: ${pkm.att} Pts</p>
            <p>Defense: ${pkm.def} Pts</p>
            <p>Health: ${pkm.hp} Pts</p>
        </div>
    `;
}

function loadMoreBtnTemplate() {
    return /*html*/ `
        <button data-id="load-more-button" id="load-more-button" class="" onclick="getMorePkm()">
        Load further cards
        </button>
    `;
}

function searchBtnTemplate() {
    return /*html*/ `
        <button data-id="search-button" id="search-button" onclick="searchPkm()">SEARCH</button>
    `;
}

function returnBtnTemplate() {
    return /*html*/ `
        <button data-id="search-button" id="search-button" onclick="getPkm()">Return to Library</button>
    `;
}
