function libraryTemplate(pkm) {
    return /*html*/ `
        <div id="library-cards-${pkm.id}" class="library-cards ${pkm.types[0].type.name} ">
            <button data-id="card${pkm.id}" id="card${pkm.id}" onclick="openPkm(${pkm.id})">
            <h2>Nr ${pkm.id}</h2>    
            <img data-id="card-image${pkm.id}" class="default-image" src="${pkm.img}" alt="Image of ${pkm.name}">
            <h3>${pkm.name}</h3>
            <span class="types-wrapper">
                <p class="type ${pkm.types[0].type.name}">${pkm.types[0].type.name}</p>
                ${pkm.types[1] ? `<p class="type ${pkm.types[1].type.name}">${pkm.types[1].type.name}</p>` : ""}
            </span>
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
            <div class="dialog-header-wrapper ${pkm.types[0].type.name}">
                <div class="dialog-img-text">
                    <div class="dialog-img-wrapper">
                        <img data-id="dialog-image" class="default-image ${pkm.types[0].type.name}" src="${pkm.img}" alt="Image of ${pkm.name}">
                    </div>
                    <div class="dialog-text-wrapper">
                        <h2>Nr ${pkm.id}</h2>  
                        <h3>${pkm.name}</h3>
                        <span class="types-wrapper">
                            <p class="type ${pkm.types[0].type.name}">${pkm.types[0].type.name}</p>
                            ${pkm.types[1] ? `<p class="type ${pkm.types[1].type.name}">${pkm.types[1].type.name}</p>` : ""}
                        </span>
                    </div>
                </div>
            <div class="dialog-close-wrapper">
                <button data-id="close-dialog-button" onclick="closeDialog()">X</button>
            </div>
        </div>
        <div class="dialog-content">
            <div class="dialog-hw">
                <div class="dialog-bubble">
                    <p class="hw-title">Height</p>
                    <p>${pkm.height} m</p>
                </div>
                <div class="dialog-bubble">
                    <p class="hw-title">Weight</p>
                    <p>${pkm.weight} Kg</p>
                </div>
                <div class="dialog-bubble">
                    <p class="hw-title">Ability</p>
                    <p>${pkm.ab}</p>
                </div>
            </div class="stats">
                <div class="stats-header">
                    <h4>BASE STATS</h4>
                </div>
                <div id="stats-grid" class="stats-grid">
            </div>
            <!-- <p>Attack: ${pkm.att} Pts</p>
            <p>Defense: ${pkm.def} Pts</p>
            <p>Health: ${pkm.hp} Pts</p> -->
            <button data-id="next-button" onclick="nextPkm(${pkm.id})">Next</button>
            <button data-id="prev-button" onclick="prevPkm(${pkm.id})">Previous</button>
        </div>
    `;
}

function statRowTemplate(label, value, percent) {
    return /*html*/ `
        <span class="stat-label">${label}</span>
        <div class="stat-track">
            <div class="stat-fill" style="width: ${percent}%"></div>
        </div>
        <span class="stat-value">${value}</span>
    `;
}
