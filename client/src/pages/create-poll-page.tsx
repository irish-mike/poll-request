import Container from "react-bootstrap/Container";
import { GitPullRequest } from "lucide-react";

import PageHeader from "../components/page-header";
import { CreatePollForm } from "../features/polls/create-poll-form";

const CreatePollPage = () => (
    <Container className="py-5">
        <PageHeader
            icon={<GitPullRequest className="polls-page-title-icon" size={34} />}
            title="Open a Poll Request"
            description="Propose a question and ship it to the team. Two options minimum — let the votes decide."
            backTo="/"
        />

        <CreatePollForm />
    </Container>
);

export default CreatePollPage;
