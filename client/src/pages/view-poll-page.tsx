import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { GitPullRequest, Link2 } from "lucide-react";

import BackLink from "../components/back-link";
import PageHeader from "../components/page-header";
import { PollRef } from "../features/polls/components/poll-ref.tsx";
import { PollResults } from "../features/polls/components/poll-results.tsx";
import { PollVote } from "../features/polls/components/poll-vote.tsx";
import { usePoll } from "../features/polls/hooks/use-poll.ts";
import { submitVote } from "../features/polls/api/api.ts";
import { copyToClipboard, getUserToken } from "../utils/browser";

interface PageMessageProps {
    message: string;
    variant?: "muted" | "error";
}

const PageMessage = ({ message, variant = "muted" }: PageMessageProps) => (
    <Container className="py-5">
        <p className={variant === "error" ? "polls-page-error" : "poll-empty"}>{message}</p>
    </Container>
);

const ViewPollPage = () => {
    const { id } = useParams<{ id: string }>();
    const poll_id = id ? Number(id) : null;

    const { poll, error, is_loading, refetch } = usePoll(Number.isFinite(poll_id) ? poll_id : null);
    const [show_toast, set_show_toast] = useState(false);

    const handleCopyLink = () => {
        copyToClipboard(window.location.href).then(() => set_show_toast(true));
    };

    const handleVote = (option_id: number) => {
        submitVote(Number(poll_id), option_id, getUserToken()).then(refetch);
    };

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
                    icon: <Link2 size={18} />,
                    label: "Copy request link",
                    onClick: handleCopyLink,
                }}
            />

            <PollResults options={poll.options} total_votes={poll.total_votes} />

            <PollVote options={poll.options} onVote={handleVote} />

            <ToastContainer position="top-center" className="p-3">
                <Toast
                    className="copy-toast"
                    show={show_toast}
                    onClose={() => set_show_toast(false)}
                    delay={2500}
                    autohide
                >
                    <Toast.Body>Request link copied to clipboard.</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default ViewPollPage;
