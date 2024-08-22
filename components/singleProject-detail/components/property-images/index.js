import React, { useEffect, useState } from "react";
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

function divideArrayIntoSections(arr) {
  if (typeof window !== "undefined" && window?.innerWidth) {
    const dividedSections = [];
    const firstSectionLength = window?.innerWidth > 1024 ? 5 : 1;
    const otherSectionsLength = window?.innerWidth > 1024 ? 3 : 1;

    // Create the first section
    const firstSection = arr.slice(0, firstSectionLength);
    dividedSections.push(firstSection);

    // Create other sections
    for (let i = firstSectionLength; i < arr.length; i += otherSectionsLength) {
      const currentSection = arr.slice(i, i + otherSectionsLength);
      dividedSections.push(currentSection);
    }

    return dividedSections;
  }
  return [];
}

function PropertyImages({
  setIsTopPanelSticky,
  isPropertyImgModal,
  property_images,
  setImageOpen,
}) {
  const { ref: topPanelRef, inView: topPanelInView } = useInView({
    threshold: 0.07,
  });
  const [parentImgsArray, setParentImgsArray] = useState([]);

  useEffect(() => {
    setIsTopPanelSticky(!topPanelInView);
  }, [topPanelInView]);

  useEffect(() => {
    if (property_images) {
      setParentImgsArray(divideArrayIntoSections(property_images));
    }
  }, [property_images]);

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
      {typeof window !== "undefined" && parentImgsArray?.length > 0 && (
        <Slider arrows={true} {...settings}>
          {parentImgsArray?.length > 0 &&
            parentImgsArray?.map((pImg, pI) => {
              if (pI === 0 && window?.innerWidth > 1024) {
                return (
                  <div key={`d-slider-${pI}`} className={classes.container}>
                    <div className={classes.img_container}>
                      <Image
                        fill="true"
                        onClick={() => {
                          setImageOpen(pImg[0]);
                          isPropertyImgModal.onOpen();
                        }}
                        className={classes.img_1}
                        src={pImg[0] || img_1.src}
                      />
                    </div>
                    <div className={classes.right_panel}>
                      <div className={classes.single_row}>
                        <div className={classes.img_container}>
                          <Image
                            fill="true"
                            className={classes.img_1}
                            src={pImg[1] || img_2.src}
                            onClick={() => {
                              setImageOpen(pImg[1] || pImg[0]);
                              isPropertyImgModal.onOpen();
                            }}
                          />
                        </div>
                        <div className={classes.img_container}>
                          <Image
                            fill="true"
                            className={classes.img_1}
                            src={pImg[2] || img_4.src}
                            onClick={() => {
                              setImageOpen(pImg[2] || pImg[0]);
                              isPropertyImgModal.onOpen();
                            }}
                          />
                        </div>
                      </div>
                      <div className={classes.single_row}>
                        <div className={classes.img_container}>
                          <Image
                            fill="true"
                            className={classes.img_1}
                            src={pImg[3] || img_3.src}
                            onClick={() => {
                              setImageOpen(pImg[3] || pImg[0]);
                              isPropertyImgModal.onOpen();
                            }}
                          />
                        </div>
                        <div className={classes.img_container}>
                          <Image
                            fill="true"
                            className={classes.img_1}
                            onClick={() => {
                              setImageOpen(pImg[4] || pImg[0]);
                              isPropertyImgModal.onOpen();
                            }}
                            src={pImg[4] || img_5.src}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={`d-slider-${pI}`} className={classes.i_container}>
                  <div className={classes.img_row}>
                    {pImg?.length > 0 &&
                      pImg?.map((cImg, cI) => (
                        <div
                          key={`dc-slider-${cI}`}
                          className={classes.img_container}
                        >
                          <Image
                            fill="true"
                            className={classes.img_1}
                            onClick={() => {
                              setImageOpen(cImg);
                              isPropertyImgModal.onOpen();
                            }}
                            src={cImg || img_2.src}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
        </Slider>
      )}
    </div>
  );
}

export default PropertyImages;
