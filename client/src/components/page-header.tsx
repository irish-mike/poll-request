import type { ReactNode } from "react";
import Button from "react-bootstrap/Button";

interface ActionButton {
    icon?: ReactNode;
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
    form?: string;
    disabled?: boolean;
}

interface Props {
    icon: ReactNode;
    title: string;
    description: ReactNode;
    action_button: ActionButton;
}

const PageHeader = ({ icon, title, description, action_button }: Props) => (
    <header className="polls-page-header">
        <div className="polls-page-header-content">
            <div>
                <div className="polls-page-title-row">
                    {icon}
                    <h1 className="polls-page-title">{title}</h1>
                </div>

                <div className="polls-page-description">{description}</div>
            </div>

            {action_button && (
                <Button
                    type={action_button.type ?? "button"}
                    form={action_button.form}
                    className="header-action-button"
                    disabled={action_button.disabled}
                    onClick={action_button.onClick}
                >
                    {action_button.icon}
                    {action_button.label}
                </Button>
            )}
        </div>
    </header>
);

export default PageHeader;
