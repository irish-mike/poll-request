export function pollUrl(id: number, user_token?: string | null): string {
    if (!user_token) return `/api/polls/${id}`;
    return `/api/polls/${id}?user_token=${encodeURIComponent(user_token)}`;
}

export function formatPollRef(id: number): string {
    return id.toString(16).padStart(7, "0");
}

export function parsePollRef(ref: string): number | null {
    const clean_ref = ref.startsWith("poll-") ? ref.slice(5) : ref;

    if (!/^[0-9a-f]+$/i.test(clean_ref)) {
        return null;
    }

    return Number.parseInt(clean_ref, 16);
}
