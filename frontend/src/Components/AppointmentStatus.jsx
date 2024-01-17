"use client";
import React, { useState, useEffect } from "react";
const jwt = require("jsonwebtoken");
const AppointmentStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [userId, setuserid] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          console.log("Stored Token:", token);
          try {
            const decodedToken = jwt.decode(token);
            setuserid(decodedToken.user._id);
          } catch (error) {
            console.error("Token decoding failed:", error.message);
          }
        } else {
          console.error("Token not found in localStorage");
        }
        const response = await fetch(
          `http://localhost:3005/appointments/${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error("Error fetching appointments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };

    fetchAppointments();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-500">Your Appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="bg-white p-4 mb-4 max-w-md mx-auto rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Appointment ID:</p>
              <p>{appointment._id}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{appointment.date}</p>
            </div>
            <div>
              <p className="font-semibold">Time:</p>
              <p>{appointment.time}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p className={appointment.status === "approved" ? "text-green-500" : "text-yellow-500"}>
                {appointment.status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentStatus;
