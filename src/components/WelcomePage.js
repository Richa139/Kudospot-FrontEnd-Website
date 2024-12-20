import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomePage = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.get("https://kudospot-assignment.onrender.com/api/users/validate", {
                params: { name },
            });
            if (response.data.success) {
                localStorage.setItem("username", name); // Save username in localStorage
                navigate("/dashboard"); // Redirect to Dashboard on success
            }
        } catch (err) {
            setError("Name not found. Please try again.");
        }
    };
    

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                color: "#fff",
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    padding: "40px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "15px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                }}
            >
                <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
                    Welcome to KudoSpot
                </h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                    Enter your name to explore the platform:
                </p>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                        padding: "15px",
                        width: "80%",
                        maxWidth: "400px",
                        borderRadius: "30px",
                        border: "none",
                        outline: "none",
                        fontSize: "1rem",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                />

                <div style={{ marginTop: "30px" }}>
                    {/* <Link to="/create-user" style={{ textDecoration: "none", marginRight: "15px" }}>
                        <button
                            style={{
                                padding: "15px 30px",
                                backgroundColor: "#4CAF50",
                                color: "#fff",
                                border: "none",
                                borderRadius: "30px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "transform 0.3s ease, background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.backgroundColor = "#45a049";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.backgroundColor = "#4CAF50";
                            }}
                        >
                            Create User
                        </button>
                    </Link> */}

                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: "15px 30px",
                            backgroundColor: "#1976D2",
                            color: "#fff",
                            border: "none",
                            borderRadius: "30px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "transform 0.3s ease, background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.backgroundColor = "#155a9d";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.backgroundColor = "#1976D2";
                        }}
                    >
                        Login
                    </button>
                </div>

                {error && (
                    <p style={{ color: "#ff6b6b", marginTop: "20px", fontSize: "1rem" }}>{error}</p>
                )}
            </div>

            <footer
                style={{
                    position: "absolute",
                    bottom: "20px",
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.8)",
                }}
            >
                © 2024 KudoSpot. All rights reserved.
            </footer>
        </div>
    );
};

export default WelcomePage;
