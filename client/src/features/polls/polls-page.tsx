import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Code2, GitPullRequest } from "lucide-react";

import { getPolls } from "./api";
import { PollGrid } from "./poll-grid";
import type { Poll } from "./types";

export const PollsPage = () => {
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
            <header className="polls-page-header">
                <div className="polls-page-header-content">
                    <div>
                        <div className="polls-page-title-row">
                            <Code2 className="polls-page-title-icon" size={34} />
                            <h1 className="polls-page-title">Poll Request</h1>
                        </div>

                        <p className="polls-page-description">
                            Spin up a question, ship it to the team, and watch the votes compile.
                        </p>
                    </div>

                    <Button
                        className="polls-page-create-button"
                        onClick={() => console.log("Create new poll")}
                    >
                        <GitPullRequest size={18} />
                        Create Poll Request
                    </Button>
                </div>
            </header>

            {error ? (
                <p className="polls-page-error">{error}</p>
            ) : (
                <PollGrid polls={polls} />
            )}
        </Container>
    );
};