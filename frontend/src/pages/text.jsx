import React from "react";
import "";

const CamPage = () => {
  return (
    <div className="about-page">
      <section className="hero">
        <div className="hero-container">
          <h1>Copernicus Astronomical Memorial of SUST</h1>
          <p>Exploring the cosmos, one star at a time.</p>
        </div>
      </section>

      <section id="about" className="content-section">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Copernicus Astronomical Memorial of SUST (CAM-SUST) is the only
            astronomical organization in Shahjalal University of Science and
            Technology and one of the leading institutions in the Sylhet
            division. CAM-SUST was founded on 7th July 2012 and officially
            registered as an organization of SUST on 17th July 2012. Since its
            establishment, CAM-SUST has been working relentlessly to promote and
            encourage interest in astronomy, astrophysics, and cosmology among
            the students of schools, colleges, and universities under the
            supervision of the organization’s trusted advisors.
          </p>
          <p>
            The motto of CAM-SUST is “Pursuing the infinity.“. The main goal of
            CAM-SUST is to learn about astronomy and spread knowledge about
            astronomy. Astronomy is the field of science that has a lot of to
            explore by the communities in our country.
          </p>
        </div>
      </section>

      <section id="activities" className="content-section">
        <div className="container">
          <h2>Our Activities</h2>
          <ul>
            <li>Organizing star-gazing events and telescope nights.</li>
            <li>
              Hosting lectures and workshops on various astronomical topics.
            </li>
            <li>
              Participating in national and international astronomy
              competitions.
            </li>
            <li>Conducting outreach programs to schools and communities.</li>
          </ul>
        </div>
      </section>

      <section id="achievements" className="content-section">
        <div className="container">
          <h2>Achievements</h2>
          <p>CAM-SUST has a proud history of achievements, including:</p>
          <ul>
            <li>Winning awards in national astronomy competitions.</li>
            <li>
              Successful organization of university-wide stargazing events.
            </li>
            <li>
              Collaborations with renowned astronomers and space scientists.
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" className="content-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p>For more information, feel free to reach out to us:</p>
          <p>Email: info@cam-sust.org</p>
          <p>Phone: +880 1234 567890</p>
          <p>
            Visit our website:{" "}
            <a
              href="https://cam-sust.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://cam-sust.org/
            </a>
          </p>
        </div>
      </section>

      <footer>
        <p>
          &copy; 2024 Copernicus Astronomical Memorial of SUST. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default CamPage;
