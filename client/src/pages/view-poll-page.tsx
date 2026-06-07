import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { GitPullRequest, Link2, Trash2 } from "lucide-react";

import BackLink from "../components/back-link";
import PageHeader from "../components/page-header";
import { PollRef } from "../features/polls/components/poll-ref";
import { PollResults } from "../features/polls/components/poll-results";
import { PollVote } from "../features/polls/components/poll-vote";
import { useDeletePoll } from "../features/polls/hooks/use-delete-poll";
import { usePoll } from "../features/polls/hooks/use-poll";
import { useSubmitVote } from "../features/polls/hooks/use-submit-vote";
import { copyToClipboard } from "../utils/browser";

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
    const valid_poll_id = Number.isFinite(poll_id) ? poll_id : null;

    const navigate = useNavigate();
    const { data: poll, error, isLoading } = usePoll(valid_poll_id);
    const vote_mutation = useSubmitVote(valid_poll_id);
    const delete_mutation = useDeletePoll(valid_poll_id);

    const [show_toast, set_show_toast] = useState(false);

    const handleCopyLink = () => {
        copyToClipboard(window.location.href).then(() => set_show_toast(true));
    };

    const handleVote = (option_id: number) => {
        vote_mutation.mutate(option_id);
    };

    const handleDelete = () => {
        delete_mutation.mutate(undefined, {
            onSuccess: () => navigate("/"),
        });
    };

    if (valid_poll_id === null) {
        return <PageMessage message="Invalid poll id." variant="error" />;
    }

    if (isLoading) {
        return <PageMessage message="Loading poll..." />;
    }

    if (error) {
        return <PageMessage message={error.message} variant="error" />;
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

            {vote_mutation.error && <p className="polls-page-error">{vote_mutation.error.message}</p>}
            {delete_mutation.error && <p className="polls-page-error">{delete_mutation.error.message}</p>}

            {poll.has_voted ? (
                <PollResults options={poll.options} total_votes={poll.total_votes} />
            ) : (
                <PollVote options={poll.options} onVote={handleVote} />
            )}

            {poll.is_owner && (
                <section className="poll-owner-actions" aria-label="Poll owner actions">
                    <div>
                        <p className="poll-owner-actions-title">Owner controls</p>
                        <p className="poll-owner-actions-description">
                            Delete this poll if you no longer want it to appear in the poll list.
                        </p>
                    </div>

                    <Button className="delete-button" onClick={handleDelete} disabled={delete_mutation.isPending}>
                        <Trash2 size={16} />
                        {delete_mutation.isPending ? "Deleting..." : "Delete poll"}
                    </Button>
                </section>
            )}

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
