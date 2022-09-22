import React, { useEffect } from "react";
import { useState } from "react";
import { fetchImages } from "../service/images";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const titleStyles = {
  position: "absolute",
  top: "70%",
  transform: "translate(0, -50%)",
  textAlign: "center",
  width: '100%',
  fontSize: "30px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};
const subTitleStyles = {
  position: "absolute",
  top: "80%",
  transform: "translate(0, -50%)",
  textAlign: "center",
  width: '100%',
  fontSize: "20px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  borderWidth: 2
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const Carousel = ({ slidesLength, infinite }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchNoImages();
  }, [loading]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? (infinite ? slides.length - 1 : currentIndex) : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? (infinite ? 0 : currentIndex) : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: slides.length > 0 ? `url(${slides[currentIndex].image})` : '',
  };
  const currentSlide = slides[currentIndex];


  const fetchNoImages = async () => {
    const images = await fetchImages({ slides: slidesLength });
    setSlides(images);
  }

  return (
    <>
      {slides && slides.length > 0 && <div style={sliderStyles}>
        <div>
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div style={titleStyles}>{currentSlide.title}</div>
          <div style={subTitleStyles}>{currentSlide.subTitle}</div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
        </div>
        <div style={slideStylesWidthBackground}></div>
        <div style={dotsContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              style={dotStyle}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div>
      }
    </>
  );
};

export default Carousel;