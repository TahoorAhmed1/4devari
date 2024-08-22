import React from "react";
import classes from "./chat-section.card.module.css";
import bg from "/public/assets/component-assets/map-card-assets/map-card-bg.png";
import Image from "next/image";
// import hot_tag from "/public/assets/tags/hot-ribbon.svg";
import Link from "next/link";

import video_card from "/public/assets/icons/video_card.svg";
import camera_card from "/public/assets/icons/camera_card.svg";
import { convertNumberToWords } from "../../../../utils";

function CHATCard({ data }) {
  let property = data?.property;
  return (
    <Link
      href={`/property-detail/${property?._id}`}
      className={classes.card_body}
    >
      {/* <img src={hot_tag.src} className={classes.tag} /> */}
      <div className={classes.card_img}>
        <div className={classes.icons_container}>
          {property?.videos?.length > 0 && (
            <div className={classes.single_tab}>
              <img src={video_card.src} className={classes.video} />
              <p>{property?.videos?.length}</p>
            </div>
          )}
          {property?.images?.length > 0 && (
            <div className={classes.single_tab}>
              <img src={camera_card.src} className={classes.camera} />
              <p>{property?.images?.length}</p>
            </div>
          )}
        </div>
        <Image className={classes.img} fill="true" src={property?.images?.[0] || bg} />
      </div>
      <div className={classes.content_container}>
        {/* <img src={developer_logo.src} className={classes.developer_logo} /> */}
        <div className={classes.content_section}>
          <h2 className={classes.property_title}>
            {property?.title ||
              property?.name ||
              "House For Sale in DHA Karachi"}
          </h2>
          <h2 className={classes.price}>
            {data?.priceUnit || "PKR"}{" "}
            {convertNumberToWords(data?.price) || "25"}
          </h2>
          <div className={classes.details_row}>
            <p>{data?.noOfBedrooms ? data?.noOfBedrooms : 1} Bed</p>
            <p>{data?.noOfBathrooms ? data?.noOfBathrooms : 1} Bath</p>
            <p className="text-one-line">
              {data?.property?.areaSize || "500"}{" "}
              {data?.property?.areaSizeUnit || "Sq. Yd"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CHATCard;
