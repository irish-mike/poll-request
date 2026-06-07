import { hasLengthBetween, isNonEmptyString, isRecord } from "../../utils/validation.js";
import type { CreatePollData } from "./types.js";

const min_options = 2;
const max_options = 5;

export function isValidCreatePollRequest(value: unknown): value is CreatePollData {
    if (!isRecord(value)) return false;

    if (!isNonEmptyString(value.question)) return false;

    if (!Array.isArray(value.options)) return false;

    if (!hasLengthBetween(value.options, min_options, max_options)) return false;

    return value.options.every(isNonEmptyString);
}
