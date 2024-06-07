import React from "react";
import Hero from "../components/Hero/Hero";
import Gallery from "../components/Gallery/Gallery";
import Tips from "../components/Tips/Tips";
import "./style.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Tips />
    </div>
  );
};

export default HomePage;
