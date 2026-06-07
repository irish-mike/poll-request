import db from "../../db/db.js";
import type { CreatePollData, OptionRow, PollDetailRow, PollRow } from "./types.js";

export function getAllPolls(): PollRow[] {
    return db
        .prepare<[], PollRow>(
            `
            SELECT id, question, created_at, updated_at
            FROM polls
            WHERE deleted_at IS NULL
            ORDER BY created_at DESC
        `
        )
        .all();
}

export function getPollById(id: number): PollDetailRow | null {
    const poll = db
        .prepare<[number], PollRow>(
            `
            SELECT id, question, created_at, updated_at
            FROM polls
            WHERE id = ? AND deleted_at IS NULL
        `
        )
        .get(id);

    if (!poll) return null;

    const options = db
        .prepare<[number], OptionRow>(
            `
            SELECT o.id, o.content, COUNT(v.id) as vote_count
            FROM options o
            LEFT JOIN votes v ON v.option_id = o.id AND v.deleted_at IS NULL
            WHERE o.poll_id = ? AND o.deleted_at IS NULL
            GROUP BY o.id
            ORDER BY o.id ASC
        `
        )
        .all(id);

    const total_votes = options.reduce((sum, o) => sum + o.vote_count, 0);

    return { ...poll, options, total_votes };
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
