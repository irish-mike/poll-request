import { Router } from "express";

import { getAllPolls, getPollById } from "./repository.js";
import { createPoll } from "./service.js";

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

    const poll = getPollById(id);

    if (!poll) {
        res.status(404).json({ error: "Poll not found" });
        return;
    }

    res.json(poll);
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
