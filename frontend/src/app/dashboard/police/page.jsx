import AdminAbilities from "@/Components/AdminAbilities";
import AdminHero from "@/Components/AdminHero";
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
      <Footer />
    </div>
  );
};

export default page;
