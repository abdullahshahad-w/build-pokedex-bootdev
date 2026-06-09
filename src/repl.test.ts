import { cleanInput } from "./repl.js";
import {describe, expect, test} from "vitest";

describe.each([
    {
        input: " hello world ",
        expected: ["hello", "world"],
    },
    {
        input: "     hello     my    nigga    ",
        expected: ["hello", "my", "nigga"],
    },
    {
        input: " wassUP DAWG       ",
        expected: ["wassup", "dawg"],
    }
])("cleanInput($input)", ({ input, expected}) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);

        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
