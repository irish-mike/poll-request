import db from "./db.js";

interface PollRow {
    id: number;
    question: string;
    created_at: number;
    updated_at: number;
}

const get_all_polls_stmt = db.prepare<[], PollRow>(
    "SELECT id, question, created_at, updated_at FROM polls WHERE deleted_at IS NULL ORDER BY created_at DESC"
);

export function getAllPolls(): PollRow[] {
    return get_all_polls_stmt.all();
}
