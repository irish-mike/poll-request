import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
    to: string;
    label: string;
}

const BackLink = ({ to, label }: Props) => {
    const navigate = useNavigate();

    return (
        <button className="page-back-link" onClick={() => navigate(to)}>
            <ArrowLeft size={16} />
            {label}
        </button>
    );
};

export default BackLink;
