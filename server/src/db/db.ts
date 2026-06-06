import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { initializeSchema } from "./schema.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db_path = path.resolve(__dirname, "../../data/poll-request.db");

fs.mkdirSync(path.dirname(db_path), { recursive: true });

const db = new Database(db_path);

db.pragma("foreign_keys = ON");

initializeSchema(db);

export default db;