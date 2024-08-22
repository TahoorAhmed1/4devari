import { useEffect, useRef } from "react";
import { Button, Modal } from "antd";
import Next from "../../../reactSlickButtons/next";
import Prev from "../../../reactSlickButtons/prev";
import Image from "next/image";
import Slider from "react-slick";

const PropertyImagesModal = ({
  isOpen,
  onOpen,
  property,
  project,
  onClose,
  imageOpen,
  ...props
}) => {
  const slickSliderRef = useRef();
  const settings = {
    // key: sliderKey,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    // centerMode: true,
    nextArrow: <Next yPosition={"45%"} xPosition={"0px"} width="40px" />,
    prevArrow: <Prev yPosition={"43%"} xPosition={"-10px"} width="40px" />,
  };
  const property_img = project ? project?.images : property?.property?.images;

  useEffect(() => {
    if (slickSliderRef.current && imageOpen && property_img?.length > 0) {
      let selectedIndex = property_img.findIndex((v) => v === imageOpen);
      if (selectedIndex > -1) {
        slickSliderRef.current?.slickGoTo(selectedIndex);
      }
    }
  }, [imageOpen, isOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        wrapClassName="zilaay__property-img-modal"
        onCancel={() => {
          onClose();
        }}
        centered
        width={1206}
        footer={false}
        closeIcon={<Button className="close">⨉</Button>}
        {...props}
      >
        <div className="property_modal_container">
          <div className="property_modal_content">
            <Slider arrows={true} {...settings} ref={slickSliderRef}>
              {property_img?.map((im, i) => (
                <Image
                  key={`d-m-${i}`}
                  className="img_1"
                  src={im}
                  width={100}
                  height={100}
                  unoptimized
                />
              ))}
            </Slider>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PropertyImagesModal;
