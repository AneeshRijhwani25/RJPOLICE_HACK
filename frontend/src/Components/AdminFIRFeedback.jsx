// "use client";
// import React, { useEffect, useState } from "react";
// const jwt = require("jsonwebtoken");

// const AdminFIRFeedback = () => {
//     const [feedbackData, setFeedbackData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const token = localStorage.getItem("token");
  
//           if (token) {
//             try {
//               const decodedToken = jwt.decode(token);
  
//               const response = await fetch(`http://localhost:3005/feedback/${decodedToken.user._id}`);
              
//               if (response.ok) {
//                 const data = await response.json();
//                 setFeedbackData(data.feedbackList);
//               } else {
//                 console.error("Failed to fetch registered FIRs");
//               }
//             } catch (error) {
//               console.error("Token decoding failed:", error.message);
//             }
//           } else {
//             console.error("Token not found in localStorage");
//           }
//         } catch (error) {
//           console.error("Error during FIR fetch:", error);
//         }finally {
            
//             setLoading(false);
//           }
//       };
  
//       fetchData();
//     }, []); 

//     return (
//         <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {feedbackData.map((feedback) => (
//             <div key={feedback._id}>
//               <p>User ID: {feedback.UserId}</p>
//               <p>Rating: {feedback.rating} stars</p>
//               <p>Suggestion: {feedback.suggestions}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     );
// };

// export default AdminFIRFeedback;


"use client";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken"; // Importing jwt directly from the 'jsonwebtoken' library

const AdminFIRFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decodedToken = jwt.decode(token);

            const response = await fetch(`http://localhost:3005/feedback/${decodedToken.user._id}`);

            if (response.ok) {
              const data = await response.json();
              setFeedbackData(data.feedbackList);
            } else {
              console.error("Failed to fetch registered FIRs");
            }
          } catch (error) {
            console.error("Token decoding failed:", error.message);
          }
        } else {
          console.error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error during FIR fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center mt-4 text-gray-700">Loading...</p>
      ) : (
        <div>
          <p className="text-xl font-bold mb-2 text-green-500">User Feedback</p>
          {feedbackData.map((feedback) => (
            <div key={feedback._id} className="bg-white p-4 mb-4 max-w-md mx-auto rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">User ID:</p>
                  <p>{feedback.UserId}</p>
                </div>
                <div>
                  <p className="font-semibold">Rating:</p>
                  <p className="capitalize">{feedback.rating} stars</p>
                </div>
                <div>
                  <p className="font-semibold ">Suggestion:</p>
                  <p className="capitalize">{feedback.suggestions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFIRFeedback;