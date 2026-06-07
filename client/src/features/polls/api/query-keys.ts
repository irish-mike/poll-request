export const poll_query_keys = {
    all: ["polls"] as const,
    detail: (id: number | null) => ["poll", id] as const,
};
