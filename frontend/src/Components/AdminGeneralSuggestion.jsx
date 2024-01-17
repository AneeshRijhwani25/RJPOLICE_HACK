"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken"; // Importing jwt directly from the 'jsonwebtoken' library

const AdminGeneralSuggestion = () => {
  const [generalSuggestions, setGeneralSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decodedToken = jwt.decode(token);

            const response = await fetch(
              `http://localhost:3005/suggestions/police/${decodedToken.user._id}`
            );

            if (response.ok) {
              const data = await response.json();
              setGeneralSuggestions(data.data.suggestions);
            } else {
              console.error("Failed to fetch Suggestions");
            }
          } catch (error) {
            console.error("Token decoding failed:", error.message);
          }
        } else {
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error during suggestion fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center mt-4 text-gray-700">Loading...</p>
      ) : (
        <div>
          <p className="text-lg font-bold mb-2 text-green-500">Suggestion</p>
          {generalSuggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              className="bg-white p-4 mb-4 max-w-md mx-auto rounded-md shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Title:</p>
                  <p>{suggestion.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGeneralSuggestion;
