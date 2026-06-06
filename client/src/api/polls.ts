export interface Poll {
    id: number;
    question: string;
    created_at: number;
    updated_at: number;
}

export async function getPolls(): Promise<Poll[]> {
    const res = await fetch("/api/polls");
    if (!res.ok) throw new Error("Failed to fetch polls");
    return res.json() as Promise<Poll[]>;
}
