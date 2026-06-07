export interface PollRow {
    id: number;
    question: string;
    created_at: number;
    updated_at: number;
}

export interface CreatePollData {
    question: string;
    options: string[];
}
