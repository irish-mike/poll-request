import { GitCommit } from "lucide-react";

import { formatPollRef } from "../utils/utils.ts";

interface Props {
    id: number;
}

export const PollRef = ({ id }: Props) => (
    <span className="poll-card-meta-item">
        <GitCommit size={14} />
        {`poll-${formatPollRef(id)}`}
    </span>
);
