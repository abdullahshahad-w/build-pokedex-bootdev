import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";

export type State = {
    readline: Interface ,
    commands: Record<string, CLICommand>,
    pokeAPI: PokeAPI;
    nextLocationsURL: string,
    prevLocationsURL: string,
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export function initState(): State {
    const repl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex > ",
    })

    const commands = {
            help: {
                name: "help",
                description: "Displays a help message",
                callback: commandHelp,
            },
            exit: {
                name: "exit",
                description: "Exits the Pokedex",
                callback: commandExit,
            },
            map: {
                name: "map",
                description: "Displays the Location-area",
                callback: commandMapForward,
            },
            mapb: {
                name: "mapb",
                description: "Displays the Location-area of previous page",
                callback: commandMapBack,
            }
        }

    const pokeAPI = new PokeAPI(10000);

    return {readline: repl, commands: commands, pokeAPI: pokeAPI, nextLocationsURL: "", prevLocationsURL: ""};
}