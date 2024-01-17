"use client";
import React from "react";

function Suggestions() {
  return (
    <>
      <main className="container mx-auto p-4">
        <div className="bg-white p-8 max-w-xl mx-auto rounded-md shadow-md">
          <div className="text-3xl font-bold mb-4 text-green-500">
            General Suggestions
          </div>
          <form className="max-w-full">
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
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="policeStation"
                className="block text-sm font-semibold mb-2"
              >
                Enter your Police Station Name (Not Mandatory)
              </label>
              <input
                type="text"
                className="form-input w-full under-label bg-gray-100 p-1"
                id="policeStation"
                name="policeStation"
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
