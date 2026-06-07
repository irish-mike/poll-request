import { insertPoll, insertVote } from "./repository.js";
import { isValidCreatePollRequest, isValidVoteRequest } from "./validation.js";
import type { CreatePollData, VoteData } from "./types.js";

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

function normalizeVoteRequest(request: VoteData): VoteData {
    return {
        option_id: request.option_id,
        user_token: request.user_token.trim(),
    };
}

export function castVote(poll_id: number, value: unknown): true | false | "duplicate" {
    if (!isValidVoteRequest(value)) return false;

    const input = normalizeVoteRequest(value);
    const success = insertVote(poll_id, input);

    return success ? true : "duplicate";
}
