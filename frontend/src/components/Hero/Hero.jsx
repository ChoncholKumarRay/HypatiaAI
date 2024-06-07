import React, { useState, useRef } from "react";
import axios from "axios";
import "./Hero.css";

// Import images
import img1 from "../../assets/img-1.jpg";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";
import img4 from "../../assets/img-4.jpg";
import busyIcon from "../../assets/busy.jpg";
import loaderIcon from "../../assets/loader.svg";
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
  const [imageUrls, setImageUrls] = useState([img1, img2, img3, img4]);
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

  const updateImageUrlAtIndex = (index, newImageUrl) => {
    setImageUrls((prevImageUrls) => {
      const updatedImageUrls = [...prevImageUrls];
      updatedImageUrls[index] = newImageUrl;
      return updatedImageUrls;
    });
  };

  const removeLoaderClassOfCard = (imageId) => {
    const magicImageCard = document.querySelector(imageId).closest(".card");
    if (magicImageCard) {
      magicImageCard.classList.remove("loading");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (promptText.trim() === "") {
      alert("Please fill up the prompt to generate image.");
      return;
    }

    setIsGenerating(true); // Disabling the generate button

    // Set loader icons and add loading class to images
    setImageUrls([loaderIcon, loaderIcon, loaderIcon, loaderIcon]);

    const cards = document.querySelectorAll(".gallery .card");
    cards.forEach((card) => {
      card.classList.add("loading");
    });

    const artStyles = selectedOptions
      .map((option) => `/${option.toLowerCase()}`)
      .join(", ");

    const data = {
      promptText: promptText,
      artStyles: artStyles,
    };

    try {
      const response = await fetch("http://localhost:3000/api/imgGen1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const magic1 = URL.createObjectURL(blob);

      // Update the state with the new image URL
      updateImageUrlAtIndex(0, magic1);

      // Remove the loading class only from the card with the image ID "magic-image1"
      removeLoaderClassOfCard("#magic-image1");

      setIsGenerating(false);
    } catch (error) {
      console.error("Error sending data to server:", error);
      setIsGenerating(false);
    }

    // For the second Image requsting api
    try {
      const response = await fetch("http://localhost:3000/api/imgGen2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        updateImageUrlAtIndex(1, busyIcon);
        removeLoaderClassOfCard("#magic-image2");
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const generatedImageURL = URL.createObjectURL(blob);
      updateImageUrlAtIndex(1, generatedImageURL);
      removeLoaderClassOfCard("#magic-image2");
      setIsGenerating(false);
    } catch (error) {
      console.error("Error sending data to server:", error);
      setIsGenerating(false);
    }

    // For the third Image requesting api
    try {
      const response = await fetch("http://localhost:3000/api/imgGen3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const generatedImageURL = URL.createObjectURL(blob);
      updateImageUrlAtIndex(2, generatedImageURL);
      removeLoaderClassOfCard("#magic-image3");
      setIsGenerating(false);
    } catch (error) {
      console.error("Error sending data to server:", error);
      setIsGenerating(false);
    }

    // For the Forth Image requesting api
    try {
      const response = await fetch("http://localhost:3000/api/imgGen4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const generatedImageURL = URL.createObjectURL(blob);
      updateImageUrlAtIndex(3, generatedImageURL);
      removeLoaderClassOfCard("#magic-image4");
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
          <img src={imageUrls[0]} alt="" id="magic-image1" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, imageUrls[0])}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="card">
          <img src={imageUrls[1]} alt="" id="magic-image2" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, imageUrls[1])}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="card">
          <img src={imageUrls[2]} alt="" id="magic-image3" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, imageUrls[2])}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="card">
          <img src={imageUrls[3]} alt="" id="magic-image4" />
          <button
            className="download-btn"
            onClick={(event) => handleDownload(event, imageUrls[3])}
          >
            <img src={downloadIcon} alt="Download" />
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
