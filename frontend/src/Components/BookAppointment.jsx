"use client";
import React, { useState, useEffect } from "react";

const jwt = require("jsonwebtoken");
function BookAppointment() {
  const [pincode, setPincode] = useState("");
  const [selectedStationId, setSelectedStationId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [policeStationList, setPoliceStationList] = useState([]);
  const [userid, setuserid] = useState("")
  const handleStationChange = (event) => {
    setSelectedStationId(event.target.value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    const formData = {
      UserId: userid,
      PoliceId: selectedStationId,
      date: selectedDate,
      time: selectedTime,
    };

    try {
      const response = await fetch(
        "http://localhost:3005/appointments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("appointment requested");
        console.log("Appointment created successfully!");
      } else {
        console.error("Error creating appointment:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating appointment:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      if (pincode.length === 6) {
        const response = await fetch(`http://localhost:3005/police/${pincode}`);

        if (response.ok) {
          const data = await response.json();

          setPoliceStationList(data);
        } else {
          console.error(
            "Error fetching police station list:",
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error fetching police station list:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pincode]);

  return (
    <>
      <main className="container mx-auto p-4">
        <div className="bg-white p-8 max-w-xl mx-auto rounded-md shadow-md">
          <div className="text-3xl font-bold mb-4 text-green-500">
            Book Appointment to Register your FIR
          </div>
          <form className="max-w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="pinCode"
                className="block text-sm font-semibold mb-2"
              >
                Enter your Pin Code
              </label>
              <input
                autoFocus
                type="text"
                className="form-input w-full under-label bg-gray-100 p-1"
                id="pinCode"
                name="pinCode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>

            {pincode.length === 6 && policeStationList.length > 0 && (
              <div className="mb-4">
                <label
                  htmlFor="policeStation"
                  className="block text-sm font-semibold mb-2"
                >
                  Select your Police Station
                </label>

                <select
                  className="form-select w-full bg-gray-100 p-1"
                  onChange={handleStationChange}
                  value={selectedStationId}
                >
                  <option value="">Select a Police Station</option>
                  {policeStationList.map((station) => (
                    <option key={station._id} value={station._id}>
                      {station.Name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-semibold mb-2"
              >
                Select Date
              </label>
              <input
                type="date"
                className="form-input w-full under-label bg-gray-100 p-1"
                id="date"
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="time"
                className="block text-sm font-semibold mb-2"
              >
                Select Time
              </label>
              <input
                type="time"
                className="form-input w-full under-label bg-gray-100 p-1"
                id="time"
                name="time"
                value={selectedTime}
                onChange={handleTimeChange}
                required
              />
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="border-2 border-green-500 text-green-500 px-4 py-2 rounded mx-auto hover:bg-green-500 hover:text-white"
              >
                Create Appointment
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default BookAppointment;
