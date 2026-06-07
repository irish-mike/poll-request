import { Router } from "express";

import { getAllPolls, getPollById } from "./repository.js";
import { castVote, createPoll } from "./service.js";

const polls_router = Router();

polls_router.get("/", (_req, res) => {
    const polls = getAllPolls();

    res.json(polls);
});

polls_router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid poll ID" });
        return;
    }

    const user_token = typeof req.query.user_token === "string" ? req.query.user_token : undefined;
    const poll = getPollById(id, user_token);

    if (!poll) {
        res.status(404).json({ error: "Poll not found" });
        return;
    }

    res.json(poll);
});

polls_router.post("/:id/votes", (req, res) => {
    const poll_id = Number(req.params.id);

    if (!Number.isInteger(poll_id) || poll_id <= 0) {
        res.status(400).json({ error: "Invalid poll ID" });
        return;
    }

    const result = castVote(poll_id, req.body);

    if (result === false) {
        res.status(400).json({ error: "Invalid vote data" });
        return;
    }

    if (result === "duplicate") {
        res.status(409).json({ error: "Already voted on this poll" });
        return;
    }

    res.status(201).json({ ok: true });
});

polls_router.post("/", (req, res) => {
    try {
        const poll_id = createPoll(req.body);

        if (poll_id === false) {
            res.status(400).json({ error: "Invalid poll data" });
            return;
        }

        res.status(201).json({ id: poll_id });
    } catch {
        res.status(500).json({ error: "Failed to create poll" });
    }
});

export default polls_router;
