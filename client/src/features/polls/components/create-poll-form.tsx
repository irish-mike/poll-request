import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "react-bootstrap/Form";

import { createPoll } from "../api/api.ts";
import { create_poll_schema, type CreatePollFormValues } from "../model/create-poll-schema.ts";

interface Props {
    onIsSubmittingChange?: (value: boolean) => void;
}

export const CreatePollForm = ({ onIsSubmittingChange }: Props) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreatePollFormValues>({
        resolver: zodResolver(create_poll_schema),
    });

    useEffect(() => {
        onIsSubmittingChange?.(isSubmitting);
    }, [isSubmitting, onIsSubmittingChange]);

    const onSubmit = async (data: CreatePollFormValues) => {
        try {
            await createPoll(data.question, [data.option_a, data.option_b]);
            navigate("/");
        } catch (err: unknown) {
            setError("root", {
                message: err instanceof Error ? err.message : "Failed to create poll",
            });
        }
    };

    return (
        <Form id="create-poll-form" className="create-poll-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4">
                <Form.Label>Question</Form.Label>
                <Form.Control type="text" placeholder="What should the team decide?" {...register("question")} />
                {errors.question && <Form.Text className="text-danger">{errors.question.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Option 1</Form.Label>
                <Form.Control type="text" placeholder="First choice" {...register("option_a")} />
                {errors.option_a && <Form.Text className="text-danger">{errors.option_a.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Label>Option 2</Form.Label>
                <Form.Control type="text" placeholder="Second choice" {...register("option_b")} />
                {errors.option_b && <Form.Text className="text-danger">{errors.option_b.message}</Form.Text>}
            </Form.Group>

            {errors.root && <p className="polls-page-error">{errors.root.message}</p>}
        </Form>
    );
};
