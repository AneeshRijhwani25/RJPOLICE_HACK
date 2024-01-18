"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import jwt from "jsonwebtoken";

const Headerh = () => {
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
        <div className="text-center">
          <h1 className="text-green-500 text-2xl sm:text-3xl md:text-4xl mt-3">
            राजस्थान पुलिस
          </h1>
          <p className="text-xl text-green-500 sm:text-2xl md:text-3xl mb-3">
            प्रतिक्रिया पोर्टल
          </p>
        </div>
        <Link
          href={'/dashboard/user'}
          className="hidden sm:inline hover:text-green-500 ml-4 px-4 py-2 rounded border text-sm"
        >
          English
        </Link>

        <div className="ml-auto">
          <Link
            href={'/community'}
            className="capitalize hover:text-green-500 hover:font-bold mx-2 sm:mx-3 text-sm"
          >
            समुदाय
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
                समाप्त करे
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                as="/"
                className="capitalize hover:text-green-500 hover:font-bold sm:mx-2 md:mx-3 text-sm"
              >
                उपयोगकर्ता
              </Link>
              <Link
                href={"/"}
                className="hover:text-green-500 ml-2 sm:ml-4 px-3 py-1 rounded border text-sm"
              >
                दाखिल करना
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Headerh;

