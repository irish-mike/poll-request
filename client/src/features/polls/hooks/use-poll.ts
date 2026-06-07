import { useEffect, useState } from "react";

import { getPoll } from "../api/api.ts";
import type { PollDetail } from "../model/types.ts";

type UsePollState = {
    poll: PollDetail | null;
    error: string | null;
    is_loading: boolean;
};

const loading_state: UsePollState = {
    poll: null,
    error: null,
    is_loading: true,
};

const invalid_poll_state: UsePollState = {
    poll: null,
    error: "Invalid poll id",
    is_loading: false,
};

function getLoadedState(poll: PollDetail): UsePollState {
    return {
        poll,
        error: null,
        is_loading: false,
    };
}

function getErrorState(err: unknown): UsePollState {
    return {
        poll: null,
        error: err instanceof Error ? err.message : "Unknown error",
        is_loading: false,
    };
}

export function usePoll(id: number | null): UsePollState {
    const [state, set_state] = useState<UsePollState>(loading_state);

    useEffect(() => {
        if (id === null) {
            set_state(invalid_poll_state);
            return;
        }

        set_state(loading_state);

        getPoll(id)
            .then((poll) => {
                set_state(getLoadedState(poll));
            })
            .catch((err: unknown) => {
                set_state(getErrorState(err));
            });
    }, [id]);

    return state;
}
