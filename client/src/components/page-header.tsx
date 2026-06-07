import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
    icon: ReactNode;
    title: string;
    description: string;
    backTo?: string;
    actions?: ReactNode;
}

const PageHeader = ({ icon, title, description, backTo, actions }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            {backTo && (
                <button className="page-back-link" onClick={() => navigate(backTo)}>
                    <ArrowLeft size={16} />
                    Back to polls
                </button>
            )}

            <header className="polls-page-header">
                <div className="polls-page-header-content">
                    <div>
                        <div className="polls-page-title-row">
                            {icon}
                            <h1 className="polls-page-title">{title}</h1>
                        </div>

                        <p className="polls-page-description">{description}</p>
                    </div>

                    {actions}
                </div>
            </header>
        </>
    );
};

export default PageHeader;
