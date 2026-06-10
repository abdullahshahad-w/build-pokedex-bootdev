import { State } from "./state.js";

export async function commandCatch(state:State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

    let possible = false;
    const catchChance = 50 / pokemon.base_experience;
    if (Math.random() < catchChance) {
        possible = true;
    }

    if (possible) {
        state.caughtPokemon[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught`);
        console.log("you may now inspect your pokemon");
    } else {
        console.log(`${pokemon.name} escaped!`)
    }
}