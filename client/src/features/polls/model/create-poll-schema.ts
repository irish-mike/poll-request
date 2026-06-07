import { z } from "zod";

export const create_poll_schema = z.object({
    question: z.string().trim().min(1, "Question is required"),
    option_a: z.string().trim().min(1, "Option 1 is required"),
    option_b: z.string().trim().min(1, "Option 2 is required"),
    option_c: z.string().optional(),
    option_d: z.string().optional(),
    option_e: z.string().optional(),
});

export type CreatePollFormValues = z.infer<typeof create_poll_schema>;
