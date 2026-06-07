import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import type { Poll } from "./types";
import { PollCard } from "./poll-card";

interface Props {
    polls: Poll[];
}

export const PollGrid = ({ polls }: Props) => {
    if (polls.length === 0) {
        return <p className="poll-empty">No polls yet. Nothing in the queue.</p>;
    }

    return (
        <Row xs={1} sm={2} lg={3} className="g-3">
            {polls.map((poll) => (
                <Col key={poll.id}>
                    <PollCard poll={poll} />
                </Col>
            ))}
        </Row>
    );
};
