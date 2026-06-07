const USER_TOKEN_KEY = "poll-request-user-token";

export function getUserToken(): string | null {
    return localStorage.getItem(USER_TOKEN_KEY);
}

export function createUserToken(): string {
    const token = crypto.randomUUID();
    localStorage.setItem(USER_TOKEN_KEY, token);
    return token;
}

export function copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
}
