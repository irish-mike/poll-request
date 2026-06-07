import Card from "react-bootstrap/Card";
import { Clock3, MessageCircleQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Poll } from "../model/types.ts";
import { PollRef } from "./poll-ref.tsx";

interface Props {
    poll: Poll;
}

export const PollCard = ({ poll }: Props) => {
    const navigate = useNavigate();

    const committed_at = new Date(poll.updated_at * 1000).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <Card className="poll-card h-100" onClick={() => navigate(`/polls/${poll.id}`)}>
            <Card.Body className="poll-card-body">
                <div className="poll-card-question-row">
                    <MessageCircleQuestion className="poll-card-question-icon" size={22} />

                    <Card.Text className="poll-card-question">{poll.question}</Card.Text>
                </div>

                <div className="poll-card-meta">
                    <PollRef id={poll.id} />

                    <span className="poll-card-meta-item">
                        <Clock3 size={14} />
                        committed {committed_at}
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};
