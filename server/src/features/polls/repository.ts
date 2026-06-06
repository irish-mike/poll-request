import db from "../../db/db.js";
import type { PollRow } from "./types.js";

export function getAllPolls(): PollRow[] {
    return db
        .prepare<[], PollRow>(`
            SELECT id, question, created_at, updated_at
            FROM polls
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC
        `)
        .all();
}