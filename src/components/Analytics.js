import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const Analytics = () => {
    const [data, setData] = useState([]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2", "#FF6347"];

    useEffect(() => {
        axios.get("https://kudospot-assignment.onrender.com/api/kudos/analytics").then((res) => {
            const formattedData = res.data.map((item) => ({
                name: item._id, // User name
                value: item.count, // Kudos count
            }));
            setData(formattedData);
        });
    }, []);

    return (
        <Box
            sx={{
                padding: "20px",
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    marginBottom: "30px",
                    color: "#1976D2",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Kudos Analytics
            </Typography>

            {/* Chart Section */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "400px",
                    background: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    marginBottom: "30px",
                }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            fill="#8884d8"
                            paddingAngle={5}
                            isAnimationActive={true}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#f5f5f5",
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                            }}
                            formatter={(value) => [`${value} Kudos`, "Count"]}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            align="center"
                            iconType="circle"
                            iconSize={12}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>

            {/* Table Section */}
            <TableContainer component={Paper} sx={{ maxWidth: "800px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)" }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976D2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>User</TableCell>
                            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Kudos Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Analytics;
