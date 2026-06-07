import type { Poll, PollDetail } from "../model/types.ts";
import { pollUrl } from "../utils/utils.ts";

export async function getPolls(): Promise<Poll[]> {
    const res = await fetch("/api/polls");

    if (!res.ok) {
        throw new Error("Failed to fetch polls");
    }

    return (await res.json()) as Poll[];
}

export async function getPoll(id: number, user_token?: string | null): Promise<PollDetail> {
    const res = await fetch(pollUrl(id, user_token));

    if (!res.ok) {
        throw new Error("Failed to fetch poll");
    }

    return (await res.json()) as PollDetail;
}

export async function submitVote(poll_id: number, option_id: number, user_token: string): Promise<void> {
    const res = await fetch(`/api/polls/${poll_id}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option_id, user_token }),
    });

    if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Failed to submit vote");
    }
}

export async function createPoll(question: string, options: string[]): Promise<{ id: number }> {
    const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options }),
    });

    if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Failed to create poll");
    }

    return (await res.json()) as { id: number };
}
