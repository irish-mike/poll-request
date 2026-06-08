import { useQuery } from "@tanstack/react-query";

import { getPoll } from "../api/api";
import { poll_query_keys } from "../api/query-keys";
import { getUserToken } from "../../../utils/browser";

const poll_refetch_interval_ms = 5000;

export function usePoll(id: number | null) {
    return useQuery({
        queryKey: poll_query_keys.detail(id),
        queryFn: () => {
            if (id === null) {
                throw new Error("Invalid poll id");
            }

            return getPoll(id, getUserToken());
        },
        enabled: id !== null,
        refetchInterval: poll_refetch_interval_ms,
    });
}