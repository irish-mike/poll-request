import { useQuery } from "@tanstack/react-query";

import { getPolls } from "../api/api";
import { poll_query_keys } from "../api/query-keys";

export function usePolls() {
    return useQuery({
        queryKey: poll_query_keys.all,
        queryFn: getPolls,
    });
}
