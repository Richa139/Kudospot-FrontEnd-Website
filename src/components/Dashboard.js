import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = () => {
  const [kudos, setKudos] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // Retrieve name from localStorage

  useEffect(() => {
    // Fetching kudos data
    axios
      .get("https://kudospot-assignment.onrender.com/api/kudos")
      .then((res) => setKudos(res.data))
      .catch((err) => console.error("Error fetching kudos data:", err));
  }, []);

  const handleGiveKudos = () => {
    navigate("/give-kudos");
  };

  const handleViewAnalytics = () => {
    navigate("/analytics");
  };

  const handleCreateUser = () => {
    navigate("/create-user");
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear username from localStorage
    navigate("/"); // Redirect to welcome page
  };

  return (
    <Box
      sx={{
        padding: "20px",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "#1976D2",
              fontSize: "2rem",
              marginBottom: "20px",
            }}
          >
            {username ? username.charAt(0) : "U"}
          </Avatar>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "10px",
              color: "#1976D2",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome, {username || "User"}!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "30px",
              textAlign: "center",
              color: "#555",
            }}
          >
            Here’s your Kudos Dashboard:
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {kudos.length > 0 ? (
            kudos.map((kudo) => (
              <Grid item xs={12} sm={6} md={4} key={kudo._id}>
                <Card
                  sx={{
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    borderRadius: "15px",
                    background: "linear-gradient(135deg, #e3f2fd, #fff)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#1976D2",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <StarIcon sx={{ marginRight: "5px", color: "#FFD700" }} />
                        {kudo?.sender} → {kudo?.recipient}
                      </Typography>
                      <Chip
                        label={kudo?.badge || "Appreciation"}
                        color="primary"
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          borderRadius: "10px",
                          backgroundColor: "#FFD700",
                          color: "#000",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ marginTop: "10px", color: "#555" }}
                    >
                      {kudo.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", marginTop: "10px", color: "#888" }}
                    >
                      Sent on: {new Date(kudo?.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                marginTop: "50px",
                color: "#555",
              }}
            >
              No kudos data available.
            </Typography>
          )}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            marginTop: "40px",
          }}
        >
          <Button
            onClick={handleGiveKudos}
            variant="contained"
            sx={{
              backgroundColor: "#1976D2",
              color: "#fff",
              padding: "12px 24px",
              fontSize: "1.1rem",
              borderRadius: "30px",
              textTransform: "none",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#145DA0",
                transform: "scale(1.05)",
              },
            }}
          >
            Give Kudos
          </Button>

          {username === "richa" && (
            <Button
              onClick={handleCreateUser}
              variant="outlined"
              sx={{
                color: "#1976D2",
                borderColor: "#1976D2",
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#145DA0",
                  backgroundColor: "#f0f8ff",
                },
              }}
            >
              Create User
            </Button>
          )}

          <Button
            onClick={handleViewAnalytics}
            variant="outlined"
            sx={{
              color: "#1976D2",
              borderColor: "#1976D2",
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "30px",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "&:hover": {
                borderColor: "#145DA0",
                backgroundColor: "#f0f8ff",
              },
            }}
          >
            <BarChartIcon sx={{ color: "#1976D2" }} />
            View Analytics
          </Button>

          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{
              color: "#d32f2f",
              borderColor: "#d32f2f",
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "30px",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "&:hover": {
                borderColor: "#b71c1c",
                backgroundColor: "#fdecea",
              },
            }}
          >
            <LogoutIcon sx={{ color: "#d32f2f" }} />
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
