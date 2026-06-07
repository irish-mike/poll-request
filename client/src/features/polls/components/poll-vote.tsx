import { useState, type FormEvent } from "react";
import Button from "react-bootstrap/Button";
import { Check } from "lucide-react";

import type { PollOption } from "../model/types";
import { PollVoteOption } from "./poll-vote-option";

interface Props {
    options: PollOption[];
    onVote: (option_id: number) => void;
}

export const PollVote = ({ options, onVote }: Props) => {
    const [selected_id, set_selected_id] = useState<number | null>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (selected_id === null) return;

        onVote(selected_id);
    };

    return (
        <form className="poll-vote" onSubmit={handleSubmit}>
            <div className="poll-vote-options" role="radiogroup" aria-label="Poll options">
                {options.map((option) => (
                    <PollVoteOption
                        key={option.id}
                        option={option}
                        is_selected={selected_id === option.id}
                        onSelect={() => set_selected_id(option.id)}
                    />
                ))}
            </div>

            <Button type="submit" className="action-button" disabled={selected_id === null}>
                <Check size={18} />
                Commit vote
            </Button>
        </form>
    );
};
