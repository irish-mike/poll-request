import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { query_client } from "./query-client";
import CreatePollPage from "./pages/create-poll-page";
import PollsPage from "./pages/polls-page";
import ViewPollPage from "./pages/view-poll-page";

const App = () => (
    <QueryClientProvider client={query_client}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PollsPage />} />
                <Route path="/polls/new" element={<CreatePollPage />} />
                <Route path="/polls/:id" element={<ViewPollPage />} />
            </Routes>
        </BrowserRouter>
    </QueryClientProvider>
);

export default App;
