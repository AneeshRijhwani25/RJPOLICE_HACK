"use client";
import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AdminRequestedAppointments = () => {
  const [requestedAppointments, setRequestedAppointments] = useState([]);
  const [policeId, setPoliceId] = useState("");
  const fetchDataByIds = async (ids) => {
    try {
      // Map each ID to a fetch request
      const fetchPromises = ids.map(async (id) => {
        const response = await fetch(`http://localhost:3005/appointments/id/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          return data;
        } else {
          console.error(`Failed to fetch data for appointment ID ${id}`);
          return null;
        }
      });
  
      // Wait for all fetch requests to complete
      const results = await Promise.all(fetchPromises);
  
      // Filter out any null results (failed fetches)
      const validResults = results.filter((result) => result !== null);
  
      return validResults;
    } catch (error) {
      console.error("Error during fetch:", error);
      throw error;
    }
  };
  const fetchRequestedAppointments = async () => {
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
        const response = await fetch(
          `http://localhost:3005/police/reqappointments/${policeId}`
        );
        
        if (response.ok) {
          const data = await response.json();
          const fetchedData = await fetchDataByIds(data.data);
          setRequestedAppointments(fetchedData);
        } else {
          console.error("Failed to fetch requested appointments");
        }
      }
    } catch (error) {
      console.error("Error during appointment fetch:", error);
    }
  };



  useEffect(() => {
    fetchRequestedAppointments();
  }, [policeId]);

  const handleAccept = async (id) => {
    try {
      // Make an API call to update the appointment status to accepted
      await fetch(`http://localhost:3005/appointments/confirm`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId: id,
        }),
      });
  
      // After a successful update, fetch the updated list of requested appointments
      fetchRequestedAppointments();
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const handleReject = async (userId) => {
    try {
      // Make an API call to update the appointment status to rejected
      // await fetch(`http://localhost:3005/appointments/reject/${userId}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // After successful update, fetch updated list of requested appointments
      fetchRequestedAppointments();
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  return (
    <div>
      <h2>Requested Appointments</h2>
      <table className="border-collapse border border-green-800">
        <thead>
          <tr>
            <th className="border border-green-800 p-2">User ID</th>
            <th className="border border-green-800 p-2">Date</th>
            <th className="border border-green-800 p-2">Time</th>
            <th className="border border-green-800 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requestedAppointments.map((appointment) => (
            <tr key={appointment.UserId}>
              <td className="border border-green-800 p-2">
                {appointment.UserId}
              </td>
              <td className="border border-green-800 p-2">
                {appointment.date}
              </td>
              <td className="border border-green-800 p-2">
                {appointment.time}
              </td>
              <td className="border border-green-800 p-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2"
                  onClick={() => handleAccept(appointment._id)}
                >
                  Accept
                </button>
                {/* <button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => handleReject(appointment.userId)}
                >
                  Reject
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequestedAppointments;
