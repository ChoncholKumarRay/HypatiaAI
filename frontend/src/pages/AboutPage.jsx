import React from "react";
import "./css/hypatia.css";
import hypatiaImage from "../assets/hypatia.jpeg";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="hypatia-container">
        <div className="hypatia-header">
          <h1>Hypatia of Alexandria</h1>
        </div>
        <div className="hypatia-content">
          <div className="hypatia-image">
            <img src={hypatiaImage} alt="Hypatia" />
          </div>
          <div className="caption">
            Hypatia is shown in a 1509-1511 painting called "The School of
            Athens" by an artist known as Raphael.
          </div>
        </div>
        <div className="hypatia-details">
          <h2>Biography</h2>
          <p>
            Hypatia (born c. 350–370; died 415 AD) was a Hellenistic
            Neoplatonist philosopher, astronomer, and mathematician, who lived
            in Alexandria, Egypt, then part of the Eastern Roman Empire. She was
            the daughter of the mathematician Theon of Alexandria, and she was
            educated in Athens. Hypatia is known for her teachings and works in
            mathematics, astronomy, and philosophy.
          </p>
          <h2>Contributions</h2>
          <p>
            Hypatia's work included commentary on the works of Diophantus,
            Apollonius, and Ptolemy. She made significant contributions to the
            development of mathematics and astronomy. She is known to have
            edited the third book of her father's commentary on Ptolemy's
            Almagest, which was later used by other scholars. Hypatia was also a
            teacher and is credited with the invention of the astrolabe and the
            hydrometer.
          </p>
          <h2>Legacy</h2>
          <p>
            Hypatia's life and tragic death have inspired numerous works of
            literature, art, and film. She is remembered as a martyr for
            philosophy and science, and as one of the earliest women to make a
            significant impact on the intellectual landscape of her time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
