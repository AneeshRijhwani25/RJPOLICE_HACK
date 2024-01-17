"use client";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { RiInputMethodLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminRegister = () => {
  const [policeStation, setPoliceStation] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setopen] = useState("");
  const [close, setclose] = useState("");
    
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Name:policeStation,
      Pincode: pinCode,
      UniqueId: uniqueId,
      Phone: phoneNumber,
      Email: email,
      Password: password,
        timingsStart: open,
        timingsEnd: close
    };

    try {
      const response = await fetch("http://localhost:3005/police/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Successfully Registered!");
        router.push("/login/police");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col lg:flex-row w-full lg:w-2/3 max-w-4xl">
          <div className="w-full lg:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Rajasthan Police</span> Feedback
              System
            </div>
            <div className="py-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-green-500 mb-2 ml-4 lg:ml-20 ">
                Create an Admin Account
              </h2>
              <div className="border-2 w-8 lg:w-12 border-green-500 inline-block mb-2 ml-4 lg:ml-48"></div>
            </div>
            <div className="flex flex-col items-center lg:items-start md:pl-20 p-0">
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <MdDriveFileRenameOutline className="text-gray-400 m-2" />
                <input
                  type="text"
                  name="policeStation"
                  placeholder="Police Station Name"
                  onChange={(e) => setPoliceStation(e.target.value)}
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <RiInputMethodLine className="text-gray-400 m-2" />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  onChange={(e) => setPinCode(e.target.value)}
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <RiInputMethodLine className="text-gray-400 m-2 " />
                <input
                  type="text"
                  name="uniqueId"
                  placeholder="Unique ID"
                  onChange={(e) => setUniqueId(e.target.value)}
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <IoCall className="text-gray-400 m-2 " />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Mobile Number"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <FaEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>
              <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <label className="text-gray-400 m-1 text-xs">Open At</label>
                <input
                  type="time"
                  className="form-input w-full under-label p-1"
                  id="time"
                  name="time"
                  onChange={(e) => setopen(e.target.value)}
                  required
                />

                <label className="text-gray-400 m-1 text-xs">Close At</label>
                <input
                  type="time"
                  className="form-input w-full under-label p-1"
                  id="time"
                  name="time"
                  onChange={(e) => setclose(e.target.value)}
                  required
                />
              </div>
              {/* <div className="bg-gray-100 w-full lg:w-72 p-2 flex items-center mb-3">
                <label className="text-gray-400 m-1 text-xs">Close At</label>
                <input
                  type="time"
                  className="form-input w-full under-label p-1"
                  id="time"
                  name="time"
                  required
                />
              </div> */}

              <button
                onClick={handleFormSubmit}
                className="border-2 border-green-500 text-green-500 rounded-full px-8 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4"
              >
                Register
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-10 lg:py-36 px-6 lg:px-12 mt-10 lg:mt-0">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              Hello, Officer!!
            </h2>
            <div className="border-2 w-8 lg:w-12 border-white inline-block mb-2 ml-4 lg:ml-20"></div>
            <p className="mb-5 lg:mb-10">Already have an account?</p>
            <Link
              href={"/login/police"}
              className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-green-500"
            >
              Log in
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminRegister;
