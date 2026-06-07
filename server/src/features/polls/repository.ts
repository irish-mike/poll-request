import db from "../../db/db.js";
import type { CreatePollData, PollRow } from "./types.js";

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

export function insertPoll(input: CreatePollData): number {
    const insert_poll_transaction = db.transaction((input: CreatePollData) => {
        const insert_poll_stmt = db.prepare(`
            INSERT INTO polls (question)
            VALUES (?)
        `);

        const insert_option_stmt = db.prepare(`
            INSERT INTO options (poll_id, content)
            VALUES (?, ?)
        `);

        const poll_result = insert_poll_stmt.run(input.question);
        const poll_id = Number(poll_result.lastInsertRowid);

        for (const option of input.options) {
            insert_option_stmt.run(poll_id, option);
        }

        return poll_id;
    });

    return insert_poll_transaction(input);
}