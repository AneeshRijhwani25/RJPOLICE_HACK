"use client"
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    
    try {
      const response = await fetch('http://localhost:3005/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response)
      const data = await response.json();
      console.log("data",data)
      if (response.ok) {
        // Login successful, save the token to local storage
        localStorage.setItem('token', data.token.token);

        // Redirect or perform any other necessary action after login
        console.log('Login successful!');
        router.push('/dashboard/user')
      } else {
        // Handle login error
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };
  return (
    <>
      <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5">
          <div className="text-left font-bold">
            <span className="text-green-500">Rajasthan Police</span> Feedback
            System
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-green-500 mb-2 ml-20 ">
              Login to your Account
            </h2>
            <div className="border-2 w-12 border-green-500 inline-block mb-2 ml-48"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
              <FaEnvelope className="text-gray-400 m-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 outline-none text-sm flex-1"
              ></input>
            </div>
            <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 outline-none text-sm flex-1"
              ></input>
            </div>

            <button

              onClick={handleLogin}
              className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white "
            >
              Log in
            </button>
          </div>
        </div>

        <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ml-20">
          <h2 className="text-3xl font-bold mb-2">Hello, Citizen!!</h2>
          <div className="border-2 w-12 border-white inline-block mb-2 ml-20"></div>
          <p className="mb-10">Help us improve,by providing feedback!!</p>
          <Link
            href={"/register"}
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500 ml-10"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
