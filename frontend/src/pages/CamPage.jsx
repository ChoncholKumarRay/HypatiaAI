import React from "react";
import "./css/cam.css";
import img1 from "../assets/img-1.jpg";

const CamPage = () => {
  return (
    <div className="cam">
      <section className="content-section">
        <div className="cam-container">
          <h2>About CAM-SUST</h2>
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
        <div className="cam-container">
          <h2>Activities</h2>
          <div className="activity">
            <div className="act">
              <img src={img1} alt="" />
            </div>
            <div className="act">
              <img src={img1} alt="" />
            </div>
            <div className="act">
              <img src={img1} alt="" />
            </div>
            <div className="act">
              <img src={img1} alt="" />
            </div>
            <div className="act">
              <img src={img1} alt="" />
            </div>
            <div className="act">
              <img src={img1} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CamPage;
