import { State } from "./state.js";

export async function commandMapBack(state:State) {
    if (!state.prevLocationsURL) {
        console.log("You are already on the first page")
    } else {
        const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

        state.prevLocationsURL = locations.previous ?? "";
        state.nextLocationsURL = locations.next ?? "";

        console.log("Results: \n");

        for (const location of locations.results) {
            console.log(location.name);
        }

        console.log();
    }
}