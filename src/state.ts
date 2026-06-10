import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "node:readline";
import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { callbackify } from "node:util";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export type Pokedex = Record<string, Pokemon>;

export type State = {
    readline: Interface ,
    commands: Record<string, CLICommand>,
    pokeAPI: PokeAPI;
    nextLocationsURL: string,
    prevLocationsURL: string,
    caughtPokemon: Pokedex,
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
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
            },
            explore: {
                name: "explore",
                description: "Displays the pokemons available in the given area",
                callback: commandExplore,
            },
            catch: {
                name: "catch",
                description: "Throws a pokeball at a pokemon to try and catch it",
                callback: commandCatch,
            },
            inspect: {
                name: "inspect",
                description: "Shows info of a pokeman you have caught",
                callback: commandInspect,
            },
            pokedex: {
                name: "pokedex",
                description: "Shows all the pokemons you've caught",
                callback: commandPokedex,
            }
        }
    const pokeAPI = new PokeAPI(10000);
    const caughtPokemon: Pokedex = {};
    return {readline: repl, commands: commands, pokeAPI: pokeAPI, nextLocationsURL: "", prevLocationsURL: "", caughtPokemon};
}