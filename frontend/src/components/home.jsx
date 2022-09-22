import React from "react";
import Carousel from "./carousel";

const Home = () => {
  const containerStyles = {
    width: "90%",
    height: "500px",
    margin: "0 auto",
  };
  return (
    <div>
      <div style={containerStyles}>
        <Carousel slidesLength={3} infinite={true} />
      </div>
    </div>
  );
};

export default Home;