import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitVote } from "../api/api";
import { poll_query_keys } from "../api/query-keys";
import { createUserToken, getUserToken } from "../../../utils/browser";

export function useSubmitVote(poll_id: number | null) {
    const query_client = useQueryClient();

    return useMutation({
        mutationFn: (option_id: number) => {
            if (poll_id === null) {
                throw new Error("Invalid poll id");
            }

            const user_token = getUserToken() ?? createUserToken();

            return submitVote(poll_id, option_id, user_token);
        },
        onSuccess: () => {
            void query_client.invalidateQueries({
                queryKey: poll_query_keys.detail(poll_id),
            });
        },
    });
}
