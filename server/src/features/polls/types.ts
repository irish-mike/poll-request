export interface PollRow {
    id: number;
    question: string;
    created_at: number;
    updated_at: number;
}

export interface OptionRow {
    id: number;
    content: string;
    vote_count: number;
}

export interface PollDetailRow extends PollRow {
    options: OptionRow[];
    total_votes: number;
}

export interface CreatePollData {
    question: string;
    options: string[];
}

export interface VoteData {
    option_id: number;
    user_token: string;
}
