import React, { useState, useRef } from "react";
import axios from "axios";
import "./Hero.css";

// Import images
import img1 from "../../assets/img-1.jpg";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";
import img4 from "../../assets/img-4.jpg";
import downloadIcon from "../../assets/download.svg";

const generateRandomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Unique FileName Generation for each image
const generateUniqueFilename = () => {
  const randomString = generateRandomString(8);
  const currentTime = new Date().getTime();
  return `${randomString}_${currentTime}.jpg`;
};

const Hero = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [promptText, setPromptText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(null);
  const galleryRef = useRef(null);

  const toggleSelection = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleDownload = (event, imageSrc) => {
    event.preventDefault();

    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = generateUniqueFilename();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Scroll to the gallery section
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

    try {
      const response = await axios.post(
        "http://localhost:3000/api/sendPrompt",
        data
      );
      console.log("Response from server:", response);
      console.log("Response from server:", response.data);
      console.log("Image1 URL: ", response.data.img1);
      // setImage(response.data.imageURL); // Assuming response.data.imageURL contains the image URL
      setIsGenerating(false);
    } catch (error) {
      console.error("Error sending data to server:", error);
      setIsGenerating(false);
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
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <button type="submit" className="btn" disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate"}
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
      <section className="gallery" ref={galleryRef}>
        <div className="card">
          <img src={img1} alt="" id="magic-image1" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, img1)}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="card">
          <img src={img2} alt="" id="magic-image2" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, img2)}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="card">
          <img src={img3} alt="" id="magic-image3" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, img3)}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="card">
          <img src={img4} alt="" id="magic-image4" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, img4)}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
