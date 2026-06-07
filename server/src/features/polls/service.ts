import { insertPoll } from "./repository.js";
import { isValidCreatePollRequest } from "./validation.js";
import type { CreatePollData } from "./types.js";

function normalizeCreatePollRequest(request: CreatePollData): CreatePollData {
    return {
        question: request.question.trim(),
        options: request.options.map((option) => option.trim()),
    };
}

export function createPoll(value: unknown): number | false {
    if (!isValidCreatePollRequest(value)) return false;

    const input = normalizeCreatePollRequest(value);

    return insertPoll(input);
}