import React from "react";
import "./css/cam.css";
import studyCircleIcon from "../assets/study-circle.jpeg";
import cosmaniaIcon from "../assets/cosmania.jpeg";
import astroCarnivalIcon from "../assets/astro-carnival.jpeg";
import starGazingIcon from "../assets/star-gazing.jpeg";
import spaceWeekIcon from "../assets/space-week.jpeg";
import seminarIcon from "../assets/seminar.jpeg";

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
              <img src={studyCircleIcon} alt="" />
            </div>
            <div className="act">
              <img src={cosmaniaIcon} alt="" />
            </div>
            <div className="act">
              <img src={astroCarnivalIcon} alt="" />
            </div>
            <div className="act">
              <img src={starGazingIcon} alt="" />
            </div>
            <div className="act">
              <img src={seminarIcon} alt="" />
            </div>
            <div className="act">
              <img src={spaceWeekIcon} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CamPage;
