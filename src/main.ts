import {startREPL} from "./repl.js";
import { initState } from "./state.js";

async function main() {
    const newState = initState();
    await startREPL(newState);
}

main();