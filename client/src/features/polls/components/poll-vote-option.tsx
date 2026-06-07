import Form from "react-bootstrap/Form";
import { GitCommit } from "lucide-react";

import type { PollOption } from "../model/types";

interface Props {
    option: PollOption;
    is_selected: boolean;
    onSelect: () => void;
}

export const PollVoteOption = ({ option, is_selected, onSelect }: Props) => {
    const input_id = `poll-option-${option.id}`;
    const option_ref = `option-${option.id.toString(16).padStart(4, "0")}`;

    return (
        <label className={`poll-vote-option${is_selected ? " poll-vote-option--selected" : ""}`} htmlFor={input_id}>
            <span className="poll-vote-option-line" />

            <span className="poll-vote-option-marker">
                <GitCommit size={16} />
            </span>

            <Form.Check.Input
                id={input_id}
                type="radio"
                name="poll-option"
                checked={is_selected}
                onChange={onSelect}
                className="poll-vote-option-input"
            />

            <span className="poll-vote-option-content">
                <span className="poll-vote-option-header">
                    <span className="poll-vote-option-ref">{option_ref}</span>
                    <span className="poll-vote-option-check">{is_selected ? "✓" : ""}</span>
                </span>

                <span className="poll-vote-option-label">{option.content}</span>
            </span>
        </label>
    );
};
