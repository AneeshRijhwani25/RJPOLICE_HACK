"use client";
import React from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Hero from "@/Components/Home";
import Features from "@/Components/Features";
import Abilities from "@/Components/Abilities";
const Dashboard = () => {
  return (
    <>
      <Header  />
      <Hero />
      <Features />
      <div id="book">
        <Abilities />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
