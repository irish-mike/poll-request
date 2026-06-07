import { describe, it, expect } from "vitest";

import { isValidCreatePollRequest } from "./validation";

describe("isValidCreatePollRequest", () => {
    it("accepts a valid request", () => {
        expect(isValidCreatePollRequest({ question: "Tabs or spaces?", options: ["Tabs", "Spaces"] })).toBe(true);
    });

    it("rejects null", () => {
        expect(isValidCreatePollRequest(null)).toBe(false);
    });

    it("rejects a missing question", () => {
        expect(isValidCreatePollRequest({ options: ["A", "B"] })).toBe(false);
    });

    it("rejects a whitespace-only question", () => {
        expect(isValidCreatePollRequest({ question: "   ", options: ["A", "B"] })).toBe(false);
    });

    it("rejects fewer than 2 options", () => {
        expect(isValidCreatePollRequest({ question: "Q?", options: ["A"] })).toBe(false);
    });
});
