import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Next from "../../../reactSlickButtons/next";
import Prev from "../../../reactSlickButtons/prev";

const CardSlider = ({ children, show , autoplay, speed, className, responsive, disableInfinite , handleMoreCard, totalLength}) => {

  const sliderRef = useRef(null);

  const handleAfterChange = (currentSlide) => {
    if(handleMoreCard){
      const slider = sliderRef.current;
      const totalSlides = React.Children.count(slider.props.children);
      // Check if it's the last slide
      if ((currentSlide === (totalSlides - slider.props.slidesToShow)) && handleMoreCard && totalSlides < totalLength) {
        handleMoreCard(totalSlides + 10)
        console.log("SLIDE END")
      }
    }
  };

  const settings = {
    className: className || "common-slider",
    dots: false,
    infinite: disableInfinite ? false : true,
    slidesToShow: show || 3,
    slidesToScroll: 1,
    autoplay: autoplay || false,
    autoplaySpeed: speed || 2000,
    centerMode: false,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    afterChange: handleAfterChange,
    responsive: responsive || [
      {
        breakpoint: 1177,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: disableInfinite ? false : true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: disableInfinite ? false : true,
        },
      },
    ],
  };

  return (
    <Slider ref={sliderRef} arrows={true} {...settings}>
      {children}
    </Slider>
  );
};

export default CardSlider;
