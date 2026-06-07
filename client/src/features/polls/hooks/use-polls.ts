import { useEffect, useState } from "react";

import { getPolls } from "../api/api.ts";
import type { Poll } from "../model/types.ts";

export function usePolls() {
    const [polls, set_polls] = useState<Poll[]>([]);
    const [error, set_error] = useState<string | null>(null);

    useEffect(() => {
        getPolls()
            .then(set_polls)
            .catch((err: unknown) => {
                set_error(err instanceof Error ? err.message : "Unknown error");
            });
    }, []);

    return {
        polls,
        error,
    };
}
