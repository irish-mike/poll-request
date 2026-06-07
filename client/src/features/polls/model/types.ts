export interface Poll {
    id: number;
    question: string;
    created_at: number;
    updated_at: number;
}

export interface PollOption {
    id: number;
    content: string;
    vote_count: number;
}

export interface PollDetail extends Poll {
    options: PollOption[];
    total_votes: number;
}
