import { describe, it, expect } from "vitest";

import { isValidCreatePollRequest, isValidDeletePollRequest, isValidVoteRequest } from "./validation.js";

const VALID_POLL = { question: "Tabs or spaces?", options: ["Tabs", "Spaces"], owner_token: "user-abc" };

describe("isValidCreatePollRequest", () => {
    it("accepts a valid request", () => {
        expect(isValidCreatePollRequest(VALID_POLL)).toBe(true);
    });

    it("rejects null", () => {
        expect(isValidCreatePollRequest(null)).toBe(false);
    });

    it("rejects a missing question", () => {
        expect(isValidCreatePollRequest({ ...VALID_POLL, question: undefined })).toBe(false);
    });

    it("rejects a whitespace-only question", () => {
        expect(isValidCreatePollRequest({ ...VALID_POLL, question: "   " })).toBe(false);
    });

    it("rejects fewer than 2 options", () => {
        expect(isValidCreatePollRequest({ ...VALID_POLL, options: ["A"] })).toBe(false);
    });

    it("rejects a missing owner_token", () => {
        expect(isValidCreatePollRequest({ ...VALID_POLL, owner_token: undefined })).toBe(false);
    });
});

describe("isValidVoteRequest", () => {
    it("accepts a valid request", () => {
        expect(isValidVoteRequest({ option_id: 1, user_token: "user-abc" })).toBe(true);
    });

    it("rejects a non-integer option_id", () => {
        expect(isValidVoteRequest({ option_id: 1.5, user_token: "user-abc" })).toBe(false);
    });

    it("rejects a zero option_id", () => {
        expect(isValidVoteRequest({ option_id: 0, user_token: "user-abc" })).toBe(false);
    });

    it("rejects a missing user_token", () => {
        expect(isValidVoteRequest({ option_id: 1 })).toBe(false);
    });
});

describe("isValidDeletePollRequest", () => {
    it("accepts a valid request", () => {
        expect(isValidDeletePollRequest({ owner_token: "user-abc" })).toBe(true);
    });

    it("rejects a missing owner_token", () => {
        expect(isValidDeletePollRequest({})).toBe(false);
    });

    it("rejects a whitespace-only owner_token", () => {
        expect(isValidDeletePollRequest({ owner_token: "   " })).toBe(false);
    });
});
