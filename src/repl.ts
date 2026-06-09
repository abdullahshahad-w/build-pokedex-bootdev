import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const finalResult: string[] = [];

    const temp: string[] = input.trim().toLowerCase().split(" ");

    for (const val of temp) {
        if (val) {
            finalResult.push(val);
        }
    }

    return finalResult;
}

export async function startREPL(state: State) {
    const repl = state.readline;

    repl.prompt();

    repl.on("line", async (input: string) => {
        const cleaned = cleanInput(input);

        if (cleaned.length === 0) {
            repl.prompt()
        } else {
            const inputCommand = cleaned[0];

            const availableCommand = state.commands;

            const command = availableCommand[inputCommand];

            if (command) {
                try {
                await command.callback(state);

                } catch (err) {
                    if (err instanceof Error)
                    console.log(err.message);
                    else {
                        console.log("Unknown Error")
                    }
                }
            } else {
                console.log("Unknown command. Try 'help'");
            }

            repl.prompt();
        }

    })
}