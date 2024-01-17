"use client";
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken"; // Importing jwt directly from the 'jsonwebtoken' library

const AdminConfirmedAppointments = () => {
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [policeId, setPoliceId] = useState("");

  const fetchDataByIds = async (ids) => {
    try {
      // Map each ID to a fetch request
      const fetchPromises = ids.map(async (id) => {
        const response = await fetch(`http://localhost:3005/appointments/id/${id}`);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error(`Failed to fetch data for appointment ID ${id}`);
          return null;
        }
      });
      const results = await Promise.all(fetchPromises);

      const validResults = results.filter((result) => result !== null);

      return validResults;
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  };

  const fetchConfirmedAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          setPoliceId(decodedToken.user._id);
        } catch (error) {
          console.error("Token decoding failed:", error.message);
        }
      } else {
        console.error("Token not found in localStorage");
      }

      // Only make the API call if policeId is not empty
      if (policeId) {
        const response = await fetch(`http://localhost:3005/police/conappointments/${policeId}`);

        if (response.ok) {
          const data = await response.json();
          const fetchedData = await fetchDataByIds(data.data);
          setConfirmedAppointments(fetchedData);
        } else {
          console.error("Failed to fetch confirmed appointments");
        }
      }
    } catch (error) {
      console.error("Error during appointment fetch:", error);
    }
  };

  useEffect(() => {
    fetchConfirmedAppointments();
  }, [policeId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-500">Confirmed Appointments</h2>
      <table className="min-w-full bg-white border border-green-800">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b border-green-800">User ID</th>
            <th className="py-2 px-4 border-b border-green-800">Date</th>
            <th className="py-2 px-4 border-b border-green-800">Time</th>
          </tr>
        </thead>
        <tbody>
          {confirmedAppointments.map((appointment) => (
            <tr key={appointment.UserId}>
              <td className="py-2 px-4 border-b border-green-800">{appointment.UserId}</td>
              <td className="py-2 px-4 border-b border-green-800">{appointment.date}</td>
              <td className="py-2 px-4 border-b border-green-800">{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminConfirmedAppointments;