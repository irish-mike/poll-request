import { Router } from "express";
import { getAllPolls } from "../db/polls.js";

const router = Router();

router.get("/", (_req, res) => {
    const polls = getAllPolls();
    res.json(polls);
});

export default router;
