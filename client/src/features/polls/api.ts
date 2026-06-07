import type { Poll } from "./types";

export async function getPolls(): Promise<Poll[]> {
    const res = await fetch("/api/polls");

    if (!res.ok) {
        throw new Error("Failed to fetch polls");
    }

    return (await res.json()) as Poll[];
}

export async function createPoll(question: string, options: string[]): Promise<{ id: number }> {
    const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options }),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => null) as { error?: string } | null;
        throw new Error(body?.error ?? "Failed to create poll");
    }

    return (await res.json()) as { id: number };
}