import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Hero.css";

const Hero = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [promptText, setPromptText] = useState("");
  const [isGeneratng, setIsGenerating] = useState(false);

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
    if (promptText.trim() === "") {
      alert("Please fill up the prompt to generate image.");
      return;
    }

    setIsGenerating(true); // Disabling the generate button

    const artStyles = selectedOptions
      .map((option) => `/${option.toLowerCase()}`)
      .join(", ");

    const data = {
      promptText: promptText,
      artStyles: artStyles,
    };

    // console.log(promptText);
    // console.log(artStyles);
    // console.log(data);

    try {
      // Make sure to include the correct URL and port for your backend
      const response = await axios.post(
        "http://localhost:3000/api/sendPrompt",
        data
      );
      console.log("Response from server:", response.data);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }

    // console.log("Type of promptText:", typeof promptText);
    // console.log("Type of selectedOptions:", typeof artStyles);
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
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <button type="submit" className="btn" disabled={isGeneratng}>
                {isGeneratng ? "Generating..." : "Generate"}
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
