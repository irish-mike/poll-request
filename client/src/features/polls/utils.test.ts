import { describe, it, expect } from "vitest";

import { formatPollRef, parsePollRef } from "./utils";

describe("formatPollRef", () => {
    it("pads a small id to 7 hex characters", () => {
        expect(formatPollRef(1)).toBe("0000001");
    });

    it("formats a larger id as hex", () => {
        expect(formatPollRef(255)).toBe("00000ff");
    });
});

describe("parsePollRef", () => {
    it("parses a plain hex ref", () => {
        expect(parsePollRef("0000001")).toBe(1);
    });

    it("strips the poll- prefix before parsing", () => {
        expect(parsePollRef("poll-0000001")).toBe(1);
    });

    it("returns null for a non-hex string", () => {
        expect(parsePollRef("not-hex")).toBeNull();
    });
});
