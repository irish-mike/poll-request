import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Code2, GitPullRequest } from "lucide-react";

import { getPolls } from "../features/polls/api.ts";
import { PollGrid } from "../features/polls/poll-grid.tsx";
import type { Poll } from "../features/polls/types.ts";
import PageHeader from "../components/page-header.tsx";

export const PollsPage = () => {
    const navigate = useNavigate();
    const [polls, set_polls] = useState<Poll[]>([]);
    const [error, set_error] = useState<string | null>(null);

    useEffect(() => {
        getPolls()
            .then(set_polls)
            .catch((err: unknown) => {
                set_error(err instanceof Error ? err.message : "Unknown error");
            });
    }, []);

    return (
        <Container className="py-5">
            <PageHeader
                icon={<Code2 className="polls-page-title-icon" size={34} />}
                title="Poll Request"
                description="Spin up a question, ship it to the team, and watch the votes compile."
                actions={
                    <Button
                        className="polls-page-create-button"
                        onClick={() => navigate("/create")}
                    >
                        <GitPullRequest size={18} />
                        Create Poll Request
                    </Button>
                }
            />

            {error ? (
                <p className="polls-page-error">{error}</p>
            ) : (
                <PollGrid polls={polls} />
            )}
        </Container>
    );
};
