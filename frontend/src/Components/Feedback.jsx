"use client"

import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";

const jwt = require("jsonwebtoken");
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const slug = params.slug;
  const [StationData, setStationData] = useState(null);
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: "",
    officerName: "",
    satisfaction: "",
    respectfulTreatment: "",
    communication: "",
    professionalConduct: "",
    suggestions: "",
    rating: 0,
  });

  console.log(formValues)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3005/fir/${slug}`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await res.json();
        const fir = result.data.fir;
        const stat = await fetch(
          `http://localhost:3005/police/id/${fir.PoliceId}`
        );

        if (!stat.ok) {
          throw new Error("Failed to fetch data");
        }

        const station = await stat.json();
        setStationData(station);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user ID from token
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to the home page if the token is not present
        router.push("/login/user");
        return;
      }

      // Decode the token to get user ID
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.user._id;

      // Extract police ID from StationData
      const policeId = StationData._id;

      // Prepare feedback data
      const feedbackData = {
        UserId: userId,
        PoliceId: policeId,
        FirId: StationData._id,
        behaviorQuestions: {
          question1: formValues.respectfulTreatment ,  
          question2: formValues.communication ,
          question3: formValues.professionalConduct ,
        },
        satisfactionLevel: formValues.satisfaction ,
        rating: formValues.rating ,
        suggestions: formValues.suggestions ,
      };
      console.log(feedbackData)

      // Submit feedback
      const response = await fetch("http://localhost:3005/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        console.log("Feedback submitted successfully!");
        router.push("/dashboard/user");
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }
  };

  return (
    <main className="container mx-auto p-4 ">
      <div className="bg-white p-8 max-w-xl mx-auto rounded-md shadow-md  ">
        <div className="text-3xl font-bold mb-4 text-green-500">
          Feedback Form
        </div>
        <form className="max-w-full" onSubmit={handleSubmit}>
          {/* Police Station Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2 ">
              Police Station Name
            </label>
            <input
              autoFocus
              type="text"
              className="form-input w-full under-label bg-gray-100 p-1"
              id="name"
              name="name"
              defaultValue={StationData ? StationData.Name : ""}
              readOnly={StationData ? true : false}
              required
            />
          </div>

          {/* Officer Name/ID (if known) */}
          <div className="mb-4">
            <label
              htmlFor="officerName"
              className="block text-sm font-semibold mb-2"
            >
              Officer Name/ID (if known)
            </label>
            <input
              type="text"
              className="form-input w-full under-label bg-gray-100 p-1"
              id="officerName"
              name="officerName"
              value={formValues.officerName}
              onChange={handleInputChange}
              aria-describedby="officerNameHelp"
            />
            <small id="officerNameHelp" className="text-gray-500">
              Enter officer name or ID if known.
            </small>
          </div>

          {/* Satisfaction with Interaction (Out of 5) */}
          <div className="mb-4">
            <label
              htmlFor="satisfaction"
              className="block text-sm font-semibold mb-2 "
            >
              Satisfaction with Interaction (Out of 5)
            </label>
            <select
              className="form-select w-full bg-gray-100 p-1"
              id="satisfaction"
              name="satisfaction"
              value={formValues.satisfaction}
              onChange={handleInputChange}
              required
              aria-required="true"
            >
              <option value="5">5 - Very Satisfied</option>
              <option value="4">4 - Satisfied</option>
              <option value="3">3 - Neutral</option>
              <option value="2">2 - Dissatisfied</option>
              <option value="1">1 - Very Dissatisfied</option>
            </select>
          </div>

          {/* Respectful Treatment by Police */}
          <div className="mb-4">
            <label
              htmlFor="respectfulTreatment"
              className="block text-sm font-semibold mb-2"
            >
              Respectful Treatment by Police
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="respectYes"
                name="respectfulTreatment"
                value="Yes"
                checked={formValues.respectfulTreatment === "Yes"}
                onChange={handleInputChange}
                required
              />
              <label className="ml-2" htmlFor="respectYes">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="respectNo"
                name="respectfulTreatment"
                value="No"
                checked={formValues.respectfulTreatment === "No"}
                onChange={handleInputChange}
                required
              />
              <label className="ml-2" htmlFor="respectNo">
                No
              </label>
            </div>
          </div>

          {/* Clear and Effective Communication */}
          <div className="mb-4">
            <label
              htmlFor="communication"
              className="block text-sm font-semibold mb-2"
            >
              Clear and Effective Communication
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="communicationYes"
                name="communication"
                value="Yes"
                checked={formValues.communication === "Yes"}
                onChange={handleInputChange}
                required
              />
              <label className="ml-2" htmlFor="communicationYes">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="communicationNo"
                name="communication"
                value="No"
                checked={formValues.communication === "No"}
                onChange={handleInputChange}
                required
              />
              <label className="ml-2" htmlFor="communicationNo">
                No
              </label>
            </div>
          </div>

          {/* Professional Conduct by Police */}
          <div className="mb-4">
            <label
              htmlFor="professionalConduct"
              className="block text-sm font-semibold mb-2"
            >
              Professional Conduct by Police
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="professionalYes"
                name="professionalConduct"
                value="Yes"
                checked={formValues.professionalConduct === "Yes"}
                onChange={handleInputChange}
                required
              />
              <label className="ml-2" htmlFor="professionalYes">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="professionalNo"
                name="professionalConduct"
                value="No"
                checked={formValues.professionalConduct === "No"}
                onChange={handleInputChange}
                required
              />
              <label className="ml-2" htmlFor="professionalNo">
                No
              </label>
            </div>
          </div>

          {/* Any Suggestions? */}
          <div className="mb-4">
            <label
              htmlFor="suggestions"
              className="block text-sm font-semibold mb-2 "
            >
              Any Suggestions?
            </label>
            <textarea
              className="form-textarea w-full bg-gray-100 p-1"
              id="suggestions"
              name="suggestions"
              value={formValues.suggestions}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>

          {/* Overall Experience Rating (Out of 5) */}
          <div className="mb-4">
            <label
              htmlFor="overallRating"
              className="block text-sm font-semibold mb-2"
            >
              Overall Experience Rating (Out of 5)
            </label>
            <StarRating
              onChange={(rating) =>
                setFormValues({ ...formValues, rating: rating })
              }
            />
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
  );
};

export default Feedback;
