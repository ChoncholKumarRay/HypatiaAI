import React from "react";
import Hero from "../components/Hero/Hero";
import Gallery from "../components/Gallery/Gallery";
import "./style.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Gallery />
      <div>this is it</div>
    </div>
  );
};

export default HomePage;
