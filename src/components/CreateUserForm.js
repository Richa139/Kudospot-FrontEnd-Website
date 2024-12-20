import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const CreateUserForm = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Use navigate hook for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://kudospot-assignment.onrender.com/api/users", { name });
            setMessage(response.data.message);
            setName(""); // Clear the input after successful creation
        } catch (error) {
            setMessage("Failed to create user. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
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
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Create User
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "400px" }}>
                <TextField
                    label="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    required
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        padding: "10px 20px",
                        borderRadius: "5px",
                        fontSize: "1rem",
                        transition: "background-color 0.3s ease",
                    }}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create"}
                </Button>
            </form>
            {message && (
                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        color: message.includes("Failed") ? "red" : "green",
                    }}
                >
                    {message}
                </Typography>
            )}
            <Button
                variant="outlined"
                sx={{ marginTop: 2 }}
                onClick={() => navigate("/dashboard")}
            >
                Go to Dashboard
            </Button>
        </Box>
    );
};

export default CreateUserForm;
