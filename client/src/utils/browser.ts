const USER_TOKEN_KEY = "poll-request-user-token";

export function getUserToken(): string {
    const existing = localStorage.getItem(USER_TOKEN_KEY);
    if (existing) return existing;

    const token = crypto.randomUUID();
    localStorage.setItem(USER_TOKEN_KEY, token);
    return token;
}

export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
}
