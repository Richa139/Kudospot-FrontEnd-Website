import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const GiveKudos = () => {
    const [form, setForm] = useState({ sender: "", recipient: "", badge: "", message: "" });
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [badges, setBadges] = useState(["Great Work", "Team Player", "Innovator", "Problem Solver"]);
    const [isFormValid, setIsFormValid] = useState(false); // To track form validity

    const navigate = useNavigate(); // Use navigate hook for redirection

    useEffect(() => {
        // Fetch users list from the API
        axios.get("https://kudospot-assignment.onrender.com/api/users/all")
            .then(response => setUsers(response.data.users))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        // Check if all fields are filled
        const { recipient, badge, message } = form;
        setIsFormValid( recipient && badge && message);
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Include the sender explicitly in the form state when submitting
        const payload = { ...form, sender: localStorage.getItem("username") };
        axios.post("https://kudospot-assignment.onrender.com/api/kudos", payload).then(() => {
            alert("Kudos sent!");
            setForm({ sender: "", recipient: "", badge: "", message: "" });
            navigate("/dashboard"); // Redirect to dashboard after successful submission
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "20px",
                backgroundColor: "#e0f7fa", // Light background color
            }}
        >
            <Typography variant="h4" gutterBottom>
                Give Kudos
            </Typography>
            <Box
                component="form"
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Sender"
                    variant="outlined"
                    fullWidth
                    value={localStorage.getItem("username")} // Using username from localStorage
                    disabled
                />
                <TextField
                    select
                    label="Recipient"
                    variant="outlined"
                    fullWidth
                    value={form.recipient}
                    onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                >
                    {users.length > 0 && users.map((user) => (
                        <MenuItem key={user._id} value={user.name}>
                            {user.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Badge"
                    variant="outlined"
                    fullWidth
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                >
                    {badges.map((badge, index) => (
                        <MenuItem key={index} value={badge}>
                            {badge}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Message/Reason"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <Button type="submit" variant="contained" fullWidth disabled={!isFormValid}>
                    Send Kudos
                </Button>
                <Button variant="outlined" fullWidth onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                </Button>
            </Box>
        </Box>
    );
};

export default GiveKudos;
