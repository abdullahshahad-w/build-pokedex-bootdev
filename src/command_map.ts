import { State } from "./state.js";

export async function commandMapForward(state: State) {
    const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next ?? "";
    state.prevLocationsURL = locations.previous ?? "";

    console.log("Results: \n");

    for (const location of locations.results) {
        console.log(location.name);
    }

    console.log();
}