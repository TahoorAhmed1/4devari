import React, { useState } from "react";
// import ForumCard from "../../cards/forum-card";
import classes from "./forums-newsletters.module.css";
// import register_panel_bg from "../../../public/assets/landing-page-assets/register-panel-bg.png";
import video_bg from "../../../public/assets/landing-page-assets/video-bg.png";
// import pause from "../../../public/assets/landing-page-assets/pause.svg";
// import newsletter_bg from "../../../public/assets/landing-page-assets/newsletter_bg.svg";
// import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import Next from "../../reactSlickButtons/next";
// import Prev from "../../reactSlickButtons/prev";
import { useDispatch } from "react-redux";
import { addSubscription } from "../../../redux/users";
import { message } from "antd";

function ForumsAndNewsletters() {
  const dispatch = useDispatch();
  const [subEmail, setSubEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = () => {
    if (subEmail.length === 0) {
      setEmailErr("Email is required");
      message.warning(`Email is required`, 3);
    } else if (!validateEmail(subEmail)) {
      setEmailErr("Invalid Email");
      message.warning(`Invalid Email`, 3);
    } else {
      dispatch(addSubscription({ payload: { email: subEmail } })).then(() => {
        setEmailErr("");
        setSubEmail("");
      });
    }
  };
  // const settings = {
  //   className: "common-slider",
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   // centerMode: true,
  //   nextArrow: <Next />,
  //   prevArrow: <Prev />,
  //   responsive: [
  //     {
  //       breakpoint: 1255,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         centerMode: false,
  //       },
  //     },
  //     {
  //       breakpoint: 1255,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         centerMode: false,
  //       },
  //     },
  //     {
  //       breakpoint: 935,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         centerMode: false,
  //       },
  //     },
  //     {
  //       breakpoint: 630,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         centerMode: false,
  //       },
  //     },
  //   ]
  // };
  return (
    <div className={classes.container}>
      <div className={classes.content_container}>
        {/* <div className={classes.forums_container}>
          <div className="heading_container">
            <p className="landing_page_heading">Forums</p>
            <div className="btn">
              <p>View All</p>
            </div>
          </div>
          <div className={classes.cards_container}>
            <Slider arrows={true} {...settings}>
              <ForumCard />
              <ForumCard />
              <ForumCard />
              <ForumCard />
              <ForumCard />
              <ForumCard />
              <ForumCard />
              <ForumCard />
            </Slider>
          </div>
        </div> */}

        <div className={classes.newsletter_section}>
          <div className={classes.zilaay_video_panel}>
            <img className={classes.video_bg} src={video_bg.src} alt="About us video" />
            <div className={classes.video_content}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/u31qwQUeGuM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className={classes.newsletter_panel}>
            <div className={classes.newsletter_content}>
              <p className={classes.newsletter_title}>Newsletter</p>
              <p className={classes.newsletter_description}>
                Subscribe to our newsleter and stay updated with 4Devari.com.
              </p>
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                id="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className={`${emailErr.length > 0 && classes.error_field}`}
              />
              <div
                style={{ width: "88%", borderRadius: "100px" }}
                className={classes.forum_btn}
                onClick={handleSubmit}
              >
                <p>Subscribe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumsAndNewsletters;
