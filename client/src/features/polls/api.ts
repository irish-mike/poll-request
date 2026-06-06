import type { Poll } from "./types";

export async function getPolls(): Promise<Poll[]> {
    const res = await fetch("/api/polls");

    if (!res.ok) {
        throw new Error("Failed to fetch polls");
    }

    return (await res.json()) as Poll[];
}