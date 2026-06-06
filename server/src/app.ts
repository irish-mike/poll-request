import express from "express";
import "./db/db.js";

import polls_router from "./features/polls/routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

app.use("/api/polls", polls_router);

export default app;