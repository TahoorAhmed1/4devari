import React from "react";
import classes from "./map-info.card.module.css";
import bg from "../../../public/assets/component-assets/map-card-assets/map-card-bg.png";
import Image from "next/image";
import Link from "next/link";
import { convertNumberToWords } from "../../../utils";

function ProjectMapInfoCard({p}) {
  return (
    <Link href={`/project/${p?._id}`}>
      <div className={classes.card_body} id={p._id}>
        {/* <img src={hot_tag.src} className={classes.tag} /> */}
        <div className={classes.card_img}>
          {p?.images?.[0] ? (
              <img
                className={classes.img}
                fill="true"
                src={p?.images?.[0]}
                alt="Project Info Promo"
              />
            ) : (
              <Image className={classes.img} fill="true" src={bg} alt="Project Placholder" />
            )}
        </div>
        <div className={classes.content_container}>
          {/* <img src={developer_logo.src} className={classes.developer_logo} /> */}
          <div className={classes.content_section}>
            <h2 className={`${classes.property_title} text-one-line`}>
              {p?.title
                  ? p?.title
                  : "Prperty"}
            </h2>
            <h2 className={classes.price}>
            {p?.priceUnit || "PKR"} {convertNumberToWords(p?.price) || "0"}
            </h2> 
            <p className={classes.description_text}>Location</p>
            <div className={classes.details_row}>
              <p className="text-two-line">
                {p?.location}
              </p>
            </div>
            <p className={`${classes.address} text-one-line`}>{p?.address}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectMapInfoCard;
