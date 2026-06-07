import { describe, it, expect } from "vitest";

import { formatPollRef } from "./utils.ts";

describe("formatPollRef", () => {
    it("pads a small id to 7 hex characters", () => {
        expect(formatPollRef(1)).toBe("0000001");
    });

    it("formats a larger id as hex", () => {
        expect(formatPollRef(255)).toBe("00000ff");
    });
});
