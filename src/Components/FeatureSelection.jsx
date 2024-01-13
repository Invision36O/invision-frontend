import React from "react";
import "./FeatureSelection.css";
import Navbar from "../Layouts/Navbar";
function FeatureSelection() {
    return (
        <>
        <Navbar/>
    <div className="html">
        
        <div className="features-box">
            <h1>Features</h1>
            <div className="box">

                <div className="frame">
            <a href="/map"><div class="card-wrapper">
                        <div class="card-top">
                            <img class="image" src="/Icons/Digitization1.png"/>
                        </div>
                        <div class="card-bottom">
                            <span class="top-text">Convert Floor Map</span>
                        </div>
                    </div> </a>
                </div>

                <div className="frame">
            <a href="/object"> <div class="card-wrapper">
                        <div class="card-top">
                            <img class="image" src="/Icons/Object1.png"/>
                        </div>
                        <div class="card-bottom">
                            <span class="top-text">Upload Model</span>
                        </div>
                    </div>  </a>
                </div>

                <div className="frame">
                    <div class="card-wrapper">
                        <div class="card-top">
                            <img class="image" src="/Icons/Front1.png"/>
                        </div>
                        <div class="card-bottom">
                            <span class="top-text">Front Elevation</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
    </>
    );
};
export default FeatureSelection;