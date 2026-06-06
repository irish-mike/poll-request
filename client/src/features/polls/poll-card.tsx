import Card from "react-bootstrap/Card";
import { Terminal } from "lucide-react";

import type { Poll } from "./types";

interface Props {
    poll: Poll;
}

export const PollCard = ({ poll }: Props) => (
    <Card className="poll-card h-100">
        <Card.Body>
            <div className="poll-card-prompt">
                <Terminal size={16} />
                <span>poll #{poll.id}</span>
            </div>

            <Card.Text>{poll.question}</Card.Text>
        </Card.Body>
    </Card>
);