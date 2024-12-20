import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";
import GiveKudos from "./components/GiveKudos";
import Analytics from "./components/Analytics";
import CreateUserForm from "./components/CreateUserForm";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/give-kudos" element={<GiveKudos />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/create-user" element={<CreateUserForm />} />
            </Routes>
        </Router>
    );
};

export default App;
