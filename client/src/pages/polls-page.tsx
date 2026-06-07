import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Code2, GitPullRequest } from "lucide-react";

import PageHeader from "../components/page-header";
import { PollGrid } from "../features/polls/components/poll-grid";
import { usePolls } from "../features/polls/hooks/use-polls";

export const PollsPage = () => {
    const navigate = useNavigate();
    const { data: polls = [], error, isLoading } = usePolls();

    return (
        <Container className="py-5">
            <PageHeader
                icon={<Code2 className="polls-page-title-icon" size={34} />}
                title="Poll Request"
                description="Spin up a question, ship it to the team, and watch the votes compile."
                action_button={{
                    icon: <GitPullRequest size={18} />,
                    label: "Create Poll Request",
                    onClick: () => navigate("/polls/new"),
                }}
            />

            {isLoading && <p className="poll-empty">Loading polls...</p>}

            {error && <p className="polls-page-error">{error.message}</p>}

            {!isLoading && !error && <PollGrid polls={polls} />}
        </Container>
    );
};
