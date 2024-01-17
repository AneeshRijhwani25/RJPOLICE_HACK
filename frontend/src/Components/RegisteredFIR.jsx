"use client";
import React, { useState, useEffect } from "react";

const jwt = require("jsonwebtoken");
const RegisteredFIR = () => {
  const [registeredFIRs, setRegisteredFIRs] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchRegisteredFIRs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwt.decode(token);
          await setUserId(decodedToken.user._id);
        } catch (error) {
          console.error("Token decoding failed:", error.message);
        }
      } else {
        console.error("Token not found in localStorage");
      }

      const response = await fetch(`http://localhost:3005/fir/user/${userId}`);
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
  }, [userId]);
  return (
    <div className="bg-white p-4 mb-4 max-w-md mx-auto rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2 text-green-500">
        Registered FIR Status
      </h2>
      {registeredFIRs.map((fir) => (
        <div key={fir._id} className="border p-4 my-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">FIR Number:</p>
              <p>{fir._id}</p>
            </div>
            <div>
              <p className="font-semibold">Date:</p>
              <p>{fir.Date.substring(0, 10)}</p>
            </div>
            <div>
              <p className="font-semibold ">Status:</p>
              <p className="capitalize">{fir.Status}</p>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default RegisteredFIR;