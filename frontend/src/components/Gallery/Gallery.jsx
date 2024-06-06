import React, { useRef } from "react";
import "./Gallery.css";
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

const Gallery = () => {
  const galleryRef = useRef(null);

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

  return (
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
  );
};

export default Gallery;
