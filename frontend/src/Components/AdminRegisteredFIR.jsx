"use client";
import React, { useState, useEffect } from "react";

const jwt = require("jsonwebtoken");

const AdminRegisteredFIR = () => {
  const [registeredFIRs, setRegisteredFIRs] = useState([]);
  const [policeId, setPoliceId] = useState("");

  const fetchRegisteredFIRs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          await setPoliceId(decodedToken.user._id);
        } catch (error) {
          console.error("Token decoding failed:", error.message);
        }
      } else {
        console.error("Token not found in localStorage");
      }

      const response = await fetch(`http://localhost:3005/fir/pol/${policeId}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.data)
        setRegisteredFIRs(data.data.firList);
      } else {
        console.error("Failed to fetch registered FIRs");
      }
    } catch (error) {
      console.error("Error during FIR fetch:", error);
    }
  };
  useEffect(() => {

    fetchRegisteredFIRs();
  }, [policeId]);

  const handleResolveClick = async (firId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/fir/resolve/${firId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        console.log("FIR resolved successfully!");
        // After successful resolution, fetch updated list of registered FIRs
        fetchRegisteredFIRs();
      } else {
        const data = await response.json();
        console.error("FIR resolution failed:", data.message);
      }
    } catch (error) {
      console.error("Error during FIR resolution:", error);
    }
  };

  return (
    <div>
      <h2>Registered FIRs</h2>
      <table>
        <thead>
          <tr>
            <th>FIR ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {registeredFIRs.map((fir) => (
            <tr key={fir._id}>
              <td>{fir._id}</td>
              <td>{fir.UserId}</td>
              <td>{fir.Date.substring(0, 10)}</td>
              <td>
                {fir.Status === "resolved" ? (
                  "Resolved"
                ) : (
                  <button onClick={() => handleResolveClick(fir._id)}>
                    Close
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegisteredFIR;