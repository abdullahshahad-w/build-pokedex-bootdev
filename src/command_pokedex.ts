import { State } from "./state.js";

export async function commandPokedex(state: State) {
    const isEmpty = Object.keys(state.caughtPokemon).length === 0;

    if (isEmpty) {
        console.log("You have not yet caught any pokemon, noob");
    } else {
        console.log("Your Pokedex:");
        for (const key of Object.keys(state.caughtPokemon)) {
            console.log(` - ${key}`);
        }
    }
}