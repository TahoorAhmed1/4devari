import React from "react";
import blue_pattern from "../../public/assets/landing-page-assets/blue-pattern.png";
// import banner_video from "../../public/assets/about/production.mp4";
import { ABOUT_CARDS_DATA, ABOUT_INFO_ELLIPCE_DATA } from "../../data/index";
import grey_pattern from "../../public/assets/landing-page-assets/grey-pattern.png";
import { svg_about_info_logo } from "../../public/Svgs";
import { useWindowSize } from "../../utils";
import about_card1 from "../../public/assets/about/about_card1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Next from "../../components/reactSlickButtons/next";
import Prev from "../../components/reactSlickButtons/prev";
const About = () => {
  const video_src = "public/assets/about/production.mp4";
  const width = useWindowSize().width;
  const settings = {
    className: "common-slider",
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
    ],
  };
  return (
    <div className="zilaay__about">
      <div className="top_panel">
        <img src={blue_pattern.src} className="pattern_bg" />
        <img src={grey_pattern.src} className="pattern_bg" />
      </div>
      <div className="banner_content">
        <video className="banner_video" controls>
          <source src={"/assets/about/production.mp4"} />
          Sorry, your browser doesn't support videos.
        </video>
        <div className="banner_text_content">
          <h2>About Us</h2>
          <p>
            Unlock your ideal property with our 4Devari.com real estate property
            solutions.
          </p>
        </div>
      </div>
      <div className="about_info_container">
        <div className="info_ellipce_design">
          <div className="main_divider"></div>
          {ABOUT_INFO_ELLIPCE_DATA.map((e) => {
            return (
              <div
                className="ellipce_container"
                key={e.id}
                style={{ top: `${e.Ptop}` }}
              >
                {width > 768 && (
                  <>
                    <div className="ellipce_divider_container">
                      <div className="ellipce_divider"></div>
                      <div className="ellipce_border"></div>
                    </div>
                    <div className="ellipce">
                      <h1>{e.id}</h1>
                    </div>
                  </>
                )}
                <div className="about_info_content">
                  <div className="info_icon_container">{e.icon}</div>
                  <div className="info_text_content">
                    <div className="info_head">{e.Head}</div>
                    <div className="info_para">{e.para}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="about_ad">
        <h1>970 X 250</h1>
        <h1>Premium Billboard AD</h1>
        <h1>Goes Here</h1>
      </div>
      <div className="explore_more_container">
        <div className="cards_container">
          <Slider arrows={true} {...settings}>
            {ABOUT_CARDS_DATA.map((e) => {
              return (
                <div className="card_body" key={e.id}>
                  <img src={e.img} />
                  <div
                    // style={{ backgroundImage: }}
                    className="overlay"
                    style={{ background: `${e.grdient}` }}
                  >
                    <p>{e.para}</p>
                    <div className="card_btn">
                      <p>{e.btn}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default About;
