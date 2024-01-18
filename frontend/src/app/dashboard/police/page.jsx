import AdminAbilities from "@/Components/AdminAbilities";
import AdminHero from "@/Components/AdminHero";
import AdminView from "@/Components/AdminView";
import FeedbackPieChart from "@/Components/FeedbackPieChart";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <AdminHero />
      <div id="bookfir">
        <AdminAbilities />
      </div>
      <AdminView/>
      <div>
        <FeedbackPieChart/>
      </div>
      <Footer />
    </div>
  );
};

export default page;
