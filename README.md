# Pokédex

A browsable Pokémon library built with vanilla JavaScript — no frameworks, no build step, no dependencies.

<img width="2994" height="1884" alt="screenshot" src="https://github.com/user-attachments/assets/c83296a0-9b0c-4604-aa61-25693cb2cf79" />


**[Live Demo →](https://wanjamueller.developerakademie.net/Pokedex/index.html)**

---

## What it does

- Loads Pokémon from the [PokeAPI](https://pokeapi.co/) with pagination — 40 to start, 20 more on demand
- Search by name with a 3-character minimum and a clear message when nothing matches
- Detail dialog with base stats visualised as scaled bars, height, weight, and abilities
- Next/previous navigation inside the dialog that respects the current view — searching for "char" means you cycle through those results only, not the whole library
- Colour-coded by Pokémon type across cards, dialogs, and stat bars
- Responsive from 375px to desktop

---

## Built with

`HTML` `CSS` `JavaScript (ES6+)` `PokeAPI`

No libraries. Deliberately — the goal was to understand what frameworks abstract away before reaching for one.

---

## Architecture

Three files, three responsibilities:

```
script.js     → data fetching, state, application logic
template.js   → HTML generation (pure functions, string in, string out)
style/        → modular CSS split by component
```

**Two-stage data loading.** The list endpoint returns only names and URLs, so card data (sprite, types) is fetched on render. The heavier detail payload — stats, abilities, measurements — loads lazily when a card is opened, and only once per Pokémon:

```javascript
async function showPkmInDialog(id) {
    const pkm = SEARCH_LIST.find((p) => p.id === id);
    if (!pkm.height) await addPkmDetails(pkm);
    showModal(pkm);
}
```

**State drives the UI, not the other way around.** The current view is tracked in a single variable, so dialog navigation, the search/reset button, and the load-more visibility all derive from one source instead of reading values back out of the DOM.

**Modular navigation.** Cycling through results uses index arithmetic against the active list rather than incrementing IDs — which keeps it correct when the list is a filtered subset:

```javascript
const nextIndex = (index + 1) % SEARCH_LIST.length;
```

## About

Built during my fullstack development training as I move from a decade in operations and customer care leadership into engineering. Constraints were deliberate: no classes, no `Promise.all`, no libraries — the curriculum's scope at this stage, and a useful one for learning what the language actually does.

[LinkedIn](#) · [Portfolio](#)
