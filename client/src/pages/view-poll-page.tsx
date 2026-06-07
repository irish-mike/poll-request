import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { GitPullRequest, Share2 } from "lucide-react";

import BackLink from "../components/back-link";
import PageHeader from "../components/page-header";
import { PollRef } from "../features/polls/components/poll-ref.tsx";
import { usePoll } from "../features/polls/hooks/use-poll.ts";

interface Props {
    message: string;
    variant?: "muted" | "error";
}

const PageMessage = ({ message, variant = "muted" }: Props) => (
    <Container className="py-5">
        <p className={variant === "error" ? "polls-page-error" : "poll-empty"}>{message}</p>
    </Container>
);

const ViewPollPage = () => {
    const { id } = useParams<{ id: string }>();
    const poll_id = id ? Number(id) : null;

    const { poll, error, is_loading } = usePoll(Number.isFinite(poll_id) ? poll_id : null);

    if (is_loading) {
        return <PageMessage message="Loading poll..." />;
    }

    if (error) {
        return <PageMessage message={error} variant="error" />;
    }

    if (!poll) {
        return <PageMessage message="Poll not found." variant="error" />;
    }

    return (
        <Container className="py-5">
            <BackLink to="/" label="Back to polls" />

            <PageHeader
                icon={<GitPullRequest className="polls-page-title-icon" size={34} />}
                title={poll.question}
                description={<PollRef id={poll.id} />}
                action_button={{
                    icon: <Share2 size={18} />,
                    label: "Share",
                    onClick: () => console.log("Share poll:", poll.id),
                }}
            />

            <ul>
                {poll.options.map((option) => (
                    <li key={option.id}>{option.content}</li>
                ))}
            </ul>

            <p>Total votes: {poll.total_votes}</p>
        </Container>
    );
};

export default ViewPollPage;