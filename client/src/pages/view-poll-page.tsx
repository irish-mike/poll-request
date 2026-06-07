import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { GitPullRequest } from "lucide-react";

import PageHeader from "../components/page-header";

const ViewPollPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <Container className="py-5">
            <PageHeader
                icon={<GitPullRequest className="polls-page-title-icon" size={34} />}
                title={`Poll #${id ?? ""}`}
                description="Poll detail view — coming soon."
                backTo="/"
            />
        </Container>
    );
};

export default ViewPollPage;
