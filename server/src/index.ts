import "dotenv/config";

import express from "express";

const app = express();

const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 3000);

if (Number.isNaN(port)) {
    throw new Error("PORT must be a number");
}

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

app.listen(port, host, () => {
    console.log(`Backend listening on http://localhost:${port}`);
    console.log(`Bound to ${host}:${port}`);
});