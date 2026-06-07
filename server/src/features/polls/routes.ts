import { Router } from "express";

import { getAllPolls } from "./repository.js";
import { createPoll } from "./service.js";

const polls_router = Router();

polls_router.get("/", (_req, res) => {
    const polls = getAllPolls();

    res.json(polls);
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