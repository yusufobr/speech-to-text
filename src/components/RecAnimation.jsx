import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/rec-svg-animation.json";

const RecAnimation = () => (
  <div className="transform scale-50">
    <Lottie animationData={animationData} loop={true} />
  </div>
);

export default RecAnimation;
