import { Router } from "express";

import { getAllPolls } from "./repository.js";

const polls_router = Router();

polls_router.get("/", (_req, res) => {
    const polls = getAllPolls();

    res.json(polls);
});

export default polls_router;