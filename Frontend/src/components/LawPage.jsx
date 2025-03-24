import React from "react";
import { useParams } from "react-router-dom";
import LawContent from "./LawContent"; // Import the LawContent object
import "../styles/LawPage.css"; // Import the CSS file
import bg from "../assets/LawPage_BG.jpg";

const LawPage = () => {
  const { lawId } = useParams(); // Get the dynamic URL parameter
  const law = LawContent[lawId]; // Fetch the law data based on the parameter

  if (!law) {
    return <h2>Law not found</h2>; // Handle invalid lawId
  }

 
    return (
      <div className="page-wrapper">
        <div className="law-page-container container">
          <div className="row align-items-center">
            {/* Left: Law Details */}
            <div className="col-lg-7 text-section">
              <div className="law-card shadow-sm p-4">
                <h1>{law.title}</h1>
                <p className="description">{law.description}</p>
                <h4>Key Aspects:</h4>
                <ul>
                  {law.keyAspects.map((aspect, index) => (
                    <li key={index}>{aspect}</li>
                  ))}
                </ul>
                <h4>Examples:</h4>
                <p>{law.examples}</p>
                <a
                  href={law.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Learn More
                </a>
              </div>
            </div>
    
            {/* Right: Image */}
            <div className="col-lg-5 image-section">
              <div className="image-wrapper">
                <img src={bg} alt="Law Illustration" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    };

export default LawPage;
