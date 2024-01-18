
"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import jwt from "jsonwebtoken";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

// const FeedbackPieChart = () => {
//   const [feedbackData, setFeedbackData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
//   const [ratingLabels, setRatingLabels] = useState([]);

//   useEffect(() => {
//     const fetchFeedbackData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (token) {
//           try {
//             const decodedToken = jwt.decode(token);
//             const policeId = decodedToken.user._id;

//             const response = await fetch(
//               `http://localhost:3005/feedback/${policeId}`
//             );

//             if (!response.ok) {
//               throw new Error("Failed to fetch feedback data");
//             }

//             const data = await response.json();

//             setFeedbackData(data.feedbackList);
//           } catch (error) {
//             console.error("Token decoding failed:", error.message);
//           }
//         } else {
//           console.error("Token not found in localStorage");
//         }
//       } catch (error) {
//         console.error("Error during FIR fetch:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedbackData();
//   }, []); // Pass an empty dependency array to run the effect once on mount

//   useEffect(() => {
//     updateRatingCounts(feedbackData);
//   }, [feedbackData]);

//   const updateRatingCounts = (feedbackList) => {
//     const counts = [0, 0, 0, 0, 0];
//     const labels = [];
//     feedbackList.forEach((feedback) => {
//       counts[feedback.rating - 1]++;
//       labels.push(feedback.rating);
//     });

//     // Sort the labels array in ascending order
//     const sortedLabels = labels.sort((a, b) => a - b);

//     setRatingCounts(counts);
//     setRatingLabels(sortedLabels);
//   };

//   const data = {
//     labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
//     datasets: [
//       {
//         label: 'Feedback Counts',
//         data: ratingCounts,
//         backgroundColor: [
//           '#FF6384',
//           '#FF9F40',
//           '#FFCD56',
//           '#4BC0C0',
//           '#36A2EB',
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };
//   const chartOptions = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "right", 
//       },
//     },
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {loading ? (
//         <p className="text-center mt-4 text-gray-700">Loading...</p>
//       ) : (
//         <div>
//           <p className="text-xl font-bold mb-2 text-green-500 mx-auto text-center">Data Visualization</p>
//           <Doughnut className="max-h-96 max-w-96" data={data} options={chartOptions} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeedbackPieChart;



const FeedbackPieChart = () => {
    const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
    const [satisfactionCounts, setSatisfactionCounts] = useState([0, 0, 0, 0, 0]);
    const [behaviorQuestion1Counts, setBehaviorQuestion1Counts] = useState({ yes: 0, no: 0 });
    const [behaviorQuestion2Counts, setBehaviorQuestion2Counts] = useState({ yes: 0, no: 0 });
    const [behaviorQuestion3Counts, setBehaviorQuestion3Counts] = useState({ yes: 0, no: 0 });
    const [ratingLabels, setRatingLabels] = useState([]);
    const [satisfactionLabels, setSatisfactionLabels] = useState([]);
    const [behaviorQuestion1Labels, setBehaviorQuestion1Labels] = useState([]);
    const [behaviorQuestion2Labels, setBehaviorQuestion2Labels] = useState([]);
    const [behaviorQuestion3Labels, setBehaviorQuestion3Labels] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const updateFeedbackCounts = (feedbackList) => {
      const ratingCountsArray = [0, 0, 0, 0, 0];
      const satisfactionCountsArray = [0, 0, 0, 0, 0];
      const behaviorQuestion1CountsObject = { yes: 0, no: 0 };
      const behaviorQuestion2CountsObject = { yes: 0, no: 0 };
      const behaviorQuestion3CountsObject = { yes: 0, no: 0 };
      const ratingLabelsArray = [];
      const satisfactionLabelsArray = [];
      const behaviorQuestion1LabelsArray = [];
      const behaviorQuestion2LabelsArray = [];
      const behaviorQuestion3LabelsArray = [];
  
      feedbackList.forEach((feedback) => {
        ratingCountsArray[feedback.rating - 1]++;
        satisfactionCountsArray[feedback.satisfactionLevel - 1]++;
        ratingLabelsArray.push(feedback.rating);
        satisfactionLabelsArray.push(feedback.satisfactionLevel);
  
        const behaviorQuestion1Response = feedback.behaviorQuestions?.question1;
        const behaviorQuestion2Response = feedback.behaviorQuestions?.question2;
        const behaviorQuestion3Response = feedback.behaviorQuestions?.question3;
  
        if (behaviorQuestion1Response) {
          behaviorQuestion1CountsObject[behaviorQuestion1Response.toLowerCase()]++;
          behaviorQuestion1LabelsArray.push(behaviorQuestion1Response);
        }
  
        if (behaviorQuestion2Response) {
          behaviorQuestion2CountsObject[behaviorQuestion2Response.toLowerCase()]++;
          behaviorQuestion2LabelsArray.push(behaviorQuestion2Response);
        }
  
        if (behaviorQuestion3Response) {
          behaviorQuestion3CountsObject[behaviorQuestion3Response.toLowerCase()]++;
          behaviorQuestion3LabelsArray.push(behaviorQuestion3Response);
        }
      });
  
      const sortedRatingLabels = ratingLabelsArray.sort((a, b) => a - b);
      const sortedSatisfactionLabels = satisfactionLabelsArray.sort((a, b) => a - b);
      const sortedBehaviorQuestion1Labels = behaviorQuestion1LabelsArray.sort();
      const sortedBehaviorQuestion2Labels = behaviorQuestion2LabelsArray.sort();
      const sortedBehaviorQuestion3Labels = behaviorQuestion3LabelsArray.sort();
  
      setRatingCounts(ratingCountsArray);
      setSatisfactionCounts(satisfactionCountsArray);
      setBehaviorQuestion1Counts(behaviorQuestion1CountsObject);
      setBehaviorQuestion2Counts(behaviorQuestion2CountsObject);
      setBehaviorQuestion3Counts(behaviorQuestion3CountsObject);
      setRatingLabels(sortedRatingLabels);
      setSatisfactionLabels(sortedSatisfactionLabels);
      setBehaviorQuestion1Labels(sortedBehaviorQuestion1Labels);
      setBehaviorQuestion2Labels(sortedBehaviorQuestion2Labels);
      setBehaviorQuestion3Labels(sortedBehaviorQuestion3Labels);
    };
  
    useEffect(() => {
      const fetchFeedbackData = async () => {
        try {
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
  
              updateFeedbackCounts(data.feedbackList);
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
  
      fetchFeedbackData();
    }, []); // Pass an empty dependency array to run the effect once on mount
  
    const ratingData = {
      labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
      datasets: [
        {
          label: 'Rating Counts',
          data: ratingCounts,
          backgroundColor: [
            '#FF6384',
            '#FF9F40',
            '#FFCD56',
            '#4BC0C0',
            '#36A2EB',
          ],
          hoverOffset: 4,
        },
      ],
    };
  
    const satisfactionData = {
      labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
      datasets: [
        {
          label: 'Satisfaction Level Counts',
          data: satisfactionCounts,
          backgroundColor: [
            '#FF6384',
            '#FF9F40',
            '#FFCD56',
            '#4BC0C0',
            '#36A2EB',
          ],
          hoverOffset: 4,
        },
      ],
    };
  
    const behaviorQuestion1Data = {
      labels: ['Yes', 'No'],
      datasets: [
        {
          label: 'Respectful Treatment Counts',
          data: [behaviorQuestion1Counts['yes'], behaviorQuestion1Counts['no']],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverOffset: 4,
        },
      ],
    };
  
    const behaviorQuestion2Data = {
      labels: ['Yes', 'No'],
      datasets: [
        {
          label: 'Communication Counts',
          data: [behaviorQuestion2Counts['yes'], behaviorQuestion2Counts['no']],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverOffset: 4,
        },
      ],
    };
  
    const behaviorQuestion3Data = {
      labels: ['Yes', 'No'],
      datasets: [
        {
          label: 'Professional Conduct Counts',
          data: [behaviorQuestion3Counts['yes'], behaviorQuestion3Counts['no']],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverOffset: 4,
        },
      ],
    };
  
    const chartOptions = {
      plugins: {
        legend: {
          display: true,
          position: "right",
        },
      },
    };
  
    return (
      <div className="flex flex-col items-center">
        {loading ? (
          <p className="text-center mt-4 text-gray-700">Loading...</p>
        ) : (
          <div>
            <p className="text-xl font-bold mb-2 text-green-500 mx-auto text-center">Data Visualization</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mx-4">
                <Doughnut className="max-h-96 max-w-96" data={ratingData} options={chartOptions} />
                <p className="text-center mt-4 text-gray-700">Rating</p>
              </div>
              <div className="mx-4">
                <Doughnut className="max-h-96 max-w-96" data={satisfactionData} options={chartOptions} />
                <p className="text-center mt-4 text-gray-700">Satisfaction Level</p>
              </div>
              <div className="mx-4">
                <Doughnut className="max-h-96 max-w-96" data={behaviorQuestion1Data} options={chartOptions} />
                <p className="text-center mt-4 text-gray-700">Respectful Treatment</p>
              </div>
              <div className="mx-4">
                <Doughnut className="max-h-96 max-w-96" data={behaviorQuestion2Data} options={chartOptions} />
                <p className="text-center mt-4 text-gray-700">Communication</p>
              </div>
              <div className="mx-4">
                <Doughnut className="max-h-96 max-w-96" data={behaviorQuestion3Data} options={chartOptions} />
                <p className="text-center mt-4 text-gray-700">Professional Conduct</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default FeedbackPieChart;

  
  