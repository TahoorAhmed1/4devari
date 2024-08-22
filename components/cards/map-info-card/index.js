import React from "react";
import classes from "./map-info.card.module.css";
import bg from "../../../public/assets/component-assets/map-card-assets/map-card-bg.png";
import Image from "next/image";
import Link from "next/link";
import { convertNumberToWords } from "../../../utils";

function MapInfoCard({p}) {
  return (
    <Link href={`/property-detail/${p?.property?._id}`}>
      <div className={classes.card_body} id={p?.property._id}>
        {/* <img src={hot_tag.src} className={classes.tag} /> */}
        <div className={classes.card_img}>
          {p?.property?.images?.[0] ? (
              <img
                className={classes.img}
                fill="true"
                src={p?.property?.images?.[0]}
                alt="Map Promo"
              />
            ) : (
              <Image className={classes.img} fill="true" src={bg} alt="Map placholder" />
            )}
        </div>
        <div className={classes.content_container}>
          {/* <img src={developer_logo.src} className={classes.developer_logo} /> */}
          <div className={classes.content_section}>
            <h2 className={`${classes.property_title} text-one-line`}>
              {p?.property?.title
                  ? p?.property?.title
                  : "Prperty"}
            </h2>
            <h2 className={classes.price}>
            {p?.priceUnit || "PKR"} {convertNumberToWords(p?.price) || "75"}
            </h2> 
            <p className={classes.description_text}>Description</p>
            <div className={classes.details_row}>
              <p>{p?.noOfBedrooms ? p?.noOfBedrooms : 0} Bed</p>
              <p>{p?.noOfBathrooms ? p?.noOfBathrooms : 0} Bath</p>
              <p className="text-one-line">
                {p?.property?.areaSize || "500"}{" "}
                {p?.property?.areaSizeUnit || "Sq. Yd"}
              </p>
            </div>
            <p className={`${classes.address} text-one-line`}>{p?.address}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MapInfoCard;
