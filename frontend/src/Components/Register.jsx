"use client";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { RiInputMethodLine } from "react-icons/ri";
import Link from "next/link";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { app } from "../app/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


// const router = useRouter();
//   const auth = getAuth(app);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         router.push("../app/dashboard");
//       }
//     });
//   }, [auth, router]);

const Register = () => {
  const apiUrl= process.env.API;
  console.log(apiUrl);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      adharNumber: aadhar,
      email,
      phoneNo: phoneNumber,
      password,
    };
    console.log(formData);
    try {
      const response = await fetch(`http://localhost:3005/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        router.push('/login/user')
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );

    return () => {
      window.recaptchaVerifier = null;
    };
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    try {
      e.preventDefault();
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      console.log(formattedPhoneNumber);
      console.log(auth);
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      console.log(confirmation);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      // router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Rajasthan Police</span> Feedback
              System
            </div>
            <div className="py-4">
              <h2 className="text-3xl font-bold text-green-500 mb-2 ml-20 ">
                Create an Account
              </h2>
              <div className="border-2 w-12 border-green-500 inline-block mb-2 ml-48"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                <MdDriveFileRenameOutline className="text-gray-400 m-2" />
                <input
                  type="name"
                  name="name"
                  placeholder="AADHAR Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="bg-gray-100 outline-none text-sm flex-1"
                ></input>
              </div>
              <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                <RiInputMethodLine className="text-gray-400 m-2" />
                <input
                  type="text"
                  name="aadhar"
                  placeholder="16 digits AADHAR Number "
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                  className="bg-gray-100 outline-none text-sm flex-1"
                ></input>
              </div>
              <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                <FaEnvelope className="text-gray-400 m-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-100 outline-none text-sm flex-1"
                ></input>
              </div>
              <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                <IoCall className="text-gray-400 m-2 " />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile Number"
                  className="bg-gray-100 outline-none text-[13px] flex-1"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                ></input>
                <button
                  onClick={otpSent ? handleOTPSubmit : handleSendOtp}
                  className="border-2 border-green-500 text-green-500 rounded-full px-4  inline-block text-[10px] hover:bg-green-500 hover:text-white "
                >
                  {otpSent ? "Submit OTP" : "Send OTP"}
                </button>
              </div>
              <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                {!otpSent ? <div id="recaptcha-container"></div> : null}
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOTPChange}
                  className="bg-gray-100 outline-none text-sm flex-1"
                />
              </div>

              <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                <MdLockOutline className="text-gray-400 m-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="bg-gray-100 outline-none text-sm flex-1"
                ></input>
              </div>

              <Link
                href={"#"}
                onClick={handleFormSubmit}
                className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white "
              >
                Register
              </Link>
            </div>
          </div>

          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ml-20">
            <h2 className="text-3xl font-bold mb-2">Hello, Citizen!!</h2>
            <div className="border-2 w-12 border-white inline-block mb-2 ml-20"></div>
            <p className="mb-10">Already have an account?</p>
            <Link
              href={"/login/user"}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 ml-10"
            >
              Log in
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
