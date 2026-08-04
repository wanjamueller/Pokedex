const LIBRARY_REF = document.getElementById("library-wrapper");

function renderPokemons() {
    for (let index = 0; index < myPokemons.length; index++) {
        LIBRARY_REF.innerHTML += libraryTemplate(index);
    }
}
