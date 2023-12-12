import React from "react";
import "./FeatureSelection.css";
import Navbar from "./Navbar";
function FeatureSelection() {
    return (
        <div className="html">
        
        <div className="feature-window">
            <Navbar/>
                    <div className="rectangle" />
                    <div className="rectangle-2" />
                    <div className="rectangle-3" />
                    <div className="rectangle-4" />
                    <div className="rectangle-5" />
                    <div className="rectangle-55" />
                    <div className="rectangle-6" />
                    <img className="screenshot frontElevation" alt="Screenshot" src="/Icons/Screenshot 2023-10-12 122032 1.png" />
                    <a href="/ModelView"><img className="screenshot-2 object" alt="Screenshot" src="/Icons/Screenshot 2023-10-12 122520 1.png" /></a>
                    <a href="/map"><img className="floor-plan-with" alt="Floor plan with" src="/Icons/floor-plan-with-furniture-blueprint-illustration-removebg-preview 1.png"/></a>
        </div>
        </div>
    );
};
export default FeatureSelection;