import type Database from "better-sqlite3";

export function initializeSchema(db: Database.Database): void {
    try {
        db.exec(`ALTER TABLE polls ADD COLUMN owner_token TEXT`);
    } catch {
        // Column already exists
    }

    db.exec(`
        CREATE TABLE IF NOT EXISTS polls (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            question    TEXT    NOT NULL,
            owner_token TEXT,
            created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
            updated_at  INTEGER NOT NULL DEFAULT (unixepoch()),
            deleted_at  INTEGER
        );

        CREATE TABLE IF NOT EXISTS options (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            poll_id     INTEGER NOT NULL REFERENCES polls(id),
            content     TEXT    NOT NULL,
            created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
            updated_at  INTEGER NOT NULL DEFAULT (unixepoch()),
            deleted_at  INTEGER
        );

        CREATE TABLE IF NOT EXISTS votes (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            poll_id     INTEGER NOT NULL REFERENCES polls(id),
            option_id   INTEGER NOT NULL REFERENCES options(id),
            user_token  TEXT    NOT NULL,
            created_at  INTEGER NOT NULL DEFAULT (unixepoch()),
            updated_at  INTEGER NOT NULL DEFAULT (unixepoch()),
            deleted_at  INTEGER,
            UNIQUE (poll_id, user_token)
        );
    `);
}
