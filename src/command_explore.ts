import { State } from "./state.js";

export async function commandExplore(state: State, area: string) {
    const response = await state.pokeAPI.fetchLocation(area);
    console.log("Found Pokemon:")
    for (const pokemon_encounters of response.pokemon_encounters) {
        console.log(`-${pokemon_encounters.pokemon.name}`);
    }
}