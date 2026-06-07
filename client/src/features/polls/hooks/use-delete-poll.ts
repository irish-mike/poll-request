import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePoll } from "../api/api";
import { poll_query_keys } from "../api/query-keys";
import { getUserToken } from "../../../utils/browser";

export function useDeletePoll(poll_id: number | null) {
    const query_client = useQueryClient();

    return useMutation({
        mutationFn: () => {
            if (poll_id === null) throw new Error("Invalid poll id");

            const owner_token = getUserToken();
            if (!owner_token) throw new Error("Not authorized");

            return deletePoll(poll_id, owner_token);
        },
        onSuccess: () => {
            void query_client.invalidateQueries({ queryKey: poll_query_keys.all });
        },
    });
}
