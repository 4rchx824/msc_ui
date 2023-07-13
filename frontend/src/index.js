import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./screens/Stats";
import NotFound from "./screens/NotFound";
import Layout from "./screens/Layout";
import Landing from "./screens/Landing";
import Leaderboard from "./screens/Leaderboard";
import Search from "./screens/Search";

const router = (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/search" element={<Search />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/:ichat/stats" element={<App />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(router)