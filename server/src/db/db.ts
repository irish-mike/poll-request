import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db_path = path.resolve(__dirname, "../../data/poll-request.db");

fs.mkdirSync(path.dirname(db_path), { recursive: true });

const db = new Database(db_path);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS polls (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    question    TEXT    NOT NULL,
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

export default db;
