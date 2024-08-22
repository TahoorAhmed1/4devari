import React from "react";
import BlogCard from "../../cards/blog-card";
import classes from "./blogs.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Next from "../../reactSlickButtons/next";
import Prev from "../../reactSlickButtons/prev";
import Link from "next/link";

function Blogs() {
  const settings = {
    className: "blogs-slider",
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    // centerMode: true,
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
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 923,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 743,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 700,
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
    <div className={classes.container}>
      <div className={classes.blogs_content_container}>
        <div className="heading_container">
          <p className="landing_page_heading">Blogs</p>
          <Link href={"/blog"} className="btn">
            <p>View all Blogs</p>
          </Link>
        </div>
        <div className={classes.blogs_container}>
          <Slider arrows={true} {...settings}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
