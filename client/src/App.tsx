import { useEffect, useState } from "react";
import { getPolls, type Poll } from "./api/polls.ts";

function App() {
    const [polls, set_polls] = useState<Poll[]>([]);
    const [error, set_error] = useState<string | null>(null);

    useEffect(() => {
        getPolls()
            .then(set_polls)
            .catch((err: unknown) => {
                set_error(err instanceof Error ? err.message : "Unknown error");
            });
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Poll Request</h1>
            {polls.length === 0 ? (
                <p>No polls yet.</p>
            ) : (
                <ul>
                    {polls.map(poll => (
                        <li key={poll.id}>{poll.question}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
