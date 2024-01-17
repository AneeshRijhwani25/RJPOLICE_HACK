"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const jwt = require("jsonwebtoken");

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
      <header className="header bg-gray-100 fixed top-0 left-0 w-full bg-body-color shadow-md z-10">
        <nav className="nav h-20 flex justify-between items-center max-w-1120 mx-4">
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
          <div>
            <h1 className="text-green-500 text-4xl mt-3 text">
              Rajasthan Police
            </h1>
            <p className="text-xl text-green-500 ml-14 items-center mb-3">
              Feedback Portal
            </p>
          </div>

          <div className="">
            {user ? (
              <>
                <Link
                  href="/"
                  as="/"
                  className="capitalize hover:text-green-500 hover:font-bold"
                >
                  {user.name || user.Name}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-green-500 ml-4 px-4 py-2 rounded border"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  as="/"
                  className="hover:text-green-500 hover:font-bold"
                >
                  User
                </Link>
                <Link href={'/'} className="hover:text-green-500 ml-4 px-4 py-2 rounded border">
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
