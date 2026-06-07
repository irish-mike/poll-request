export function pollUrl(id: number, user_token?: string | null): string {
    if (!user_token) return `/api/polls/${id}`;
    return `/api/polls/${id}?user_token=${encodeURIComponent(user_token)}`;
}

export function formatPollRef(id: number): string {
    return id.toString(16).padStart(7, "0");
}
