import React from "react";
import { useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputText, setInputText] = useState("");

  const toggleSelection = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputText.trim() === "") {
      alert("Please fill up the prompt to generate image.");
      return;
    }

    const data = {
      inputText: inputText,
      selectedOptions: selectedOptions,
    };

    console.log(inputText);
    console.log(selectedOptions);
    console.log(data);

    try {
      const response = await fetch("http://localhost:5002/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      // Handle response from server as needed
    } catch (error) {
      console.error("Fetch Error:", error);
      // Handle fetch errors
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <h1>Generate AI Image with CAM-SUST</h1>
          <p>Convert your astronomical thought into image.</p>
          <form id="prompt-form" onSubmit={handleSubmit}>
            <div className="prompt-container">
              <input
                type="text"
                id="prompt-input"
                className="prompt-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
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
      </section>
    </>
  );
};

export default Hero;
