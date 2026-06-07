import ProgressBar from "react-bootstrap/ProgressBar";

import type { PollOption } from "../model/types";
import { toPercent } from "../../../utils/math";

interface Props {
    options: PollOption[];
    total_votes: number;
}

export const PollResults = ({ options, total_votes }: Props) => (
    <div className="poll-results">
        {options.map((option) => {
            const percent = toPercent(option.vote_count, total_votes);

            return (
                <div key={option.id} className="poll-results-option">
                    <div className="poll-results-option-header">
                        <span className="poll-results-option-label">{option.content}</span>
                        <span className="poll-results-option-count">{option.vote_count} votes</span>
                    </div>

                    <ProgressBar now={percent} label={`${percent}%`} />
                </div>
            );
        })}

        <p className="poll-results-total">{total_votes} total votes</p>
    </div>
);
