import { useState } from "react";
import Container from "react-bootstrap/Container";
import { GitPullRequest } from "lucide-react";

import BackLink from "../components/back-link";
import PageHeader from "../components/page-header";
import { CreatePollForm } from "../features/polls/components/create-poll-form.tsx";

const CreatePollPage = () => {
    const [is_submitting, set_is_submitting] = useState(false);

    return (
        <Container className="py-5">
            <BackLink to="/" label="Back to polls" />

            <PageHeader
                icon={<GitPullRequest className="polls-page-title-icon" size={34} />}
                title="Open a Poll Request"
                description="Propose a question and ship it to the team. Two options minimum — let the votes decide."
                action_button={{
                    type: "submit",
                    form: "create-poll-form",
                    icon: <GitPullRequest size={18} />,
                    label: is_submitting ? "Opening…" : "Open Poll Request",
                    disabled: is_submitting,
                }}
            />

            <CreatePollForm onIsSubmittingChange={set_is_submitting} />
        </Container>
    );
};

export default CreatePollPage;
