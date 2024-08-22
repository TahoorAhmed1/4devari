import React, { useEffect } from "react";
import classes from "./property-images.module.css";
import img_1 from "../../../../public/assets/property-detail-assets/img_1.png";
import img_2 from "../../../../public/assets/property-detail-assets/img_2.png";
import img_3 from "../../../../public/assets/property-detail-assets/img_3.png";
import img_4 from "../../../../public/assets/property-detail-assets/img_4.png";
import img_5 from "../../../../public/assets/property-detail-assets/img_5.png";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Next from "../../../reactSlickButtons/next";
import Prev from "../../../reactSlickButtons/prev";
import { useInView } from "react-intersection-observer";

function PropertyImages({ setIsTopPanelSticky }) {
  const { ref: topPanelRef, inView: topPanelInView } = useInView({
    threshold: 0.07,
  });

  useEffect(() => {
    setIsTopPanelSticky(!topPanelInView);
  }, [topPanelInView]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    // centerMode: true,
    nextArrow: <Next yPosition={"45%"} xPosition={"10px"} />,
    prevArrow: <Prev yPosition={"45%"} xPosition={"10px"} />,
  };

  return (
    <div ref={topPanelRef} className={classes.wrapper}>
      <Slider arrows={true} {...settings}>
        <div className={classes.container}>
          <div className={classes.img_container}>
            <Image fill="true" className={classes.img_1} src={img_1.src} />
          </div>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_2.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_4.src} />
              </div>
            </div>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_3.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_2.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_4.src} />
              </div>
            </div>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_3.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>
          </div>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_2.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_4.src} />
              </div>
            </div>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_3.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_2.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_4.src} />
              </div>
            </div>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_3.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>
          </div>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_2.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_4.src} />
              </div>
            </div>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_3.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_2.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_4.src} />
              </div>
            </div>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_3.src} />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>
          </div>
          <div className={classes.right_panel}>
            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <video
                  controls
                  fill="true"
                  className={classes.video}
                  src={
                    "https://2050today.org/wp-content/uploads/2020/07/Video-Placeholder.mp4?_=1"
                  }
                />
              </div>
              <div className={classes.img_container}>
                <Image fill="true" className={classes.img_1} src={img_5.src} />
              </div>
            </div>

            <div className={classes.single_row}>
              <div className={classes.img_container}>
                <div className={classes.placeholder} />
              </div>
              <div className={classes.img_container}>
                <div className={classes.placeholder} />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default PropertyImages;
