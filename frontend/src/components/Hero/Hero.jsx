import React from "react";
import { useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleSelection = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected options:", selectedOptions);
  };

  return (
    <div className="hero">
      <h1>Generate AI Image with CAM-SUST</h1>
      <p>Convert your astronomical thought into image.</p>
      <form id="prompt-form" onSubmit={handleSubmit}>
        <div className="prompt-container">
          <input type="text" id="prompt-input" className="prompt-input" />
          <button type="submit" className="btn">
            Generate
          </button>
        </div>
        <div className="container">
          {[
            "Fantasy",
            "Detailed",
            "Photo Realistic",
            "Sci-Fi",
            "Digital Painting",
            "Watercolor",
            "Oil painting",
            "Cyberpunk",
            "Steampunk",
            "Surreal",
            "Abstract",
            "Hybrid",
          ].map((option) => (
            <div
              key={option}
              className={`option ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => toggleSelection(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Hero;
