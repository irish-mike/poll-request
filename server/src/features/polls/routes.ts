import { Router } from "express";

import { parseRouteId } from "../../utils/validation.js";
import { getAllPolls, getPollById } from "./repository.js";
import { castVote, createPoll, deletePoll } from "./service.js";

const polls_router = Router();

// GET /polls — list all polls
polls_router.get("/", (_req, res) => {
    const polls = getAllPolls();

    res.json(polls);
});

// GET /polls/:id — poll detail with options, vote counts, and user state
polls_router.get("/:id", (req, res) => {
    const id = parseRouteId(req.params.id);

    if (id === null) {
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

// POST /polls — create a new poll
polls_router.post("/", (req, res) => {
    const poll_id = createPoll(req.body);

    if (poll_id === false) {
        res.status(400).json({ error: "Invalid poll data" });
        return;
    }

    res.status(201).json({ id: poll_id });
});

// POST /polls/:id/votes — submit a vote on a poll
polls_router.post("/:id/votes", (req, res) => {
    const poll_id = parseRouteId(req.params.id);

    if (poll_id === null) {
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

// DELETE /polls/:id — soft-delete a poll (owner token required)
polls_router.delete("/:id", (req, res) => {
    const id = parseRouteId(req.params.id);

    if (id === null) {
        res.status(400).json({ error: "Invalid poll ID" });
        return;
    }

    const result = deletePoll(id, req.body);

    if (result === false) {
        res.status(400).json({ error: "Invalid request data" });
        return;
    }

    if (result === "unauthorized") {
        res.status(403).json({ error: "Not authorized to delete this poll" });
        return;
    }

    res.json({ ok: true });
});

export default polls_router;
