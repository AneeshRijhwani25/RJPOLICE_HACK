"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import jwt from "jsonwebtoken";

const Header = () => {
  const [user, setUser] = useState(null);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        setUser(decodedToken.user);
      } catch (error) {
        console.error("Token decoding failed:", error.message);
      }
    } else {
      console.error("Token not found in localStorage");
    }
  }, []);

  return (
    <header className="header bg-gray-100 fixed top-0 left-0 w-full bg-body-color shadow-md z-50">
      <nav className="nav h-20 flex justify-between items-center max-w-7xl mx-auto px-4">
        <div className="logo-container flex justify-between">
          <a href="#">
            <Image
              className="rajpollogo"
              src="/logo.png"
              alt="Rajasthanpolice"
              width={70}
              height={70}
            />
          </a>
        </div>
        <div className="text-center">
          <h1 className="text-green-500 text-lg sm:text-3xl md:text-4xl mt-3">
            Rajasthan Police
          </h1>
          <p className="text-sm text-green-500 sm:text-2xl md:text-3xl mb-3">
            Feedback Portal
          </p>
        </div>
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3000/dashboard/user/hi")
          }
          className="hidden sm:inline hover:text-green-500 hover:font-bold ml-2 sm:ml-4 px-3 py-1 rounded border text-sm"
        >
          Hindi
        </button>

        <div className="ml-auto">
          <Link
            href={'/community'}
            className="capitalize hover:text-green-500 hover:font-bold mx-2 sm:mx-3 text-sm"
          >
            Community
          </Link>
          {user ? (
            <>
              <Link
                href="/"
                as="/"
                className="capitalize hover:text-green-500 hover:font-bold sm:mx-2 md:mx-3 text-sm"
              >
                {user.name || user.Name}
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:text-green-500 ml-2 sm:ml-4 px-3 py-1 rounded border text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                as="/"
                className="capitalize hover:text-green-500 hover:font-bold sm:mx-2 md:mx-3 text-sm"
              >
                User
              </Link>
              <Link
                href={"/"}
                className="hover:text-green-500 ml-2 sm:ml-4 px-3 py-1 rounded border text-sm"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
