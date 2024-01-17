"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import jwt from "jsonwebtoken";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const FeedbackPieChart = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          const policeId = decodedToken.user._id;

          const response = await fetch(
            `http://localhost:3005/feedback/${policeId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch feedback data");
          }

          const data = await response.json();

          setFeedbackData(data.feedbackList);
        } catch (error) {
          console.error("Token decoding failed:", error.message);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    fetchFeedbackData();
  }, []);

  // Count ratings and prepare data for Pie Chart
  const ratingCounts = feedbackData.reduce((acc, feedback) => {
    const rating = feedback.rating.toString();
    // Convert rating to string for consistency
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(ratingCounts).map(([rating, count]) => ({
    rating: rating === "null" ? "No Rating" : rating,
    count,
  }));

  console.log(pieChartData);
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle);
    const y = cy + radius * Math.sin(-midAngle);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="count" // Use 'count' as the dataKey
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FeedbackPieChart;
