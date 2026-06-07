import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreatePollPage from "./pages/create-poll-page";
import { PollsPage } from "./pages/polls-page";
import ViewPollPage from "./pages/view-poll-page";

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PollsPage />} />
            <Route path="/polls/new" element={<CreatePollPage />} />
            <Route path="/polls/:id" element={<ViewPollPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
