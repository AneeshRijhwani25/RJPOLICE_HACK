"use client";
import React, { useState, useEffect } from "react";

function Suggestions() {
  const [pincode, setPincode] = useState("");

  const [selectedStationId, setSelectedStationId] = useState("");
  const [policeStationList, setPoliceStationList] = useState([]);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const handleStationChange = (event) => {
    setSelectedStationId(event.target.value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title: Title,
      description: Description,
      policeId: selectedStationId,
    };

    try {
      const response = await fetch("http://localhost:3005/suggestions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Suggestion Submitted");
        console.log("Suggestion created successfully!");
      } else {
        console.error("Error creating appointment:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating appointment:", error.message);
    }
  };
  return (
    <>
      <main className="container mx-auto p-4">
        <div className="text-3xl font-bold mb-4 text-green-500 text-center">
          General Suggestions
        </div>
        <div className="bg-white p-8 max-w-xl mx-auto rounded-md shadow-md">
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
                htmlFor="subject"
                className="block text-sm font-semibold mb-2"
              >
                Enter Subject
              </label>
              <input
                autoFocus
                type="text"
                className="form-input w-full under-label bg-gray-100 p-1"
                id="subject"
                name="subject"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Enter Description
              </label>
              <textarea
                className="form-textarea w-full bg-gray-100 p-1"
                id="description"
                name="description"
                rows="3"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="flex items-center">
              <button
                type="submit"
                className="border-2 border-green-500 text-green-500 px-4 py-2 rounded mx-auto hover:bg-green-500 hover:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Suggestions;
