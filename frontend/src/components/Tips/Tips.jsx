import React from "react";
import "./Tips.css";

const tips = [
  "Describe the main elements clearly that you want in the image.",
  "Try to elaborate using descriptive words.",
  "Mention what should be in the foreground and background.",
  "Describe any actions or activities taking place.",
  "Combine different elements to create unique and imaginative scenes.",
  "Don’t forget to incorporate artistic styles.",
  "And try different variations of prompts to see which ones best suit your imagination.",
];

const Tips = () => {
  return (
    <section className="tips-section">
      <h2 className="tips-title">Tips for Creating a Good AI Image Prompt</h2>
      <ul className="tips-list">
        {tips.map((tip, index) => (
          <li key={index} className="tip-item">
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Tips;
