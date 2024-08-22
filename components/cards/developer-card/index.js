import React from "react";
import classes from "./developer-card.module.css";
import logo from "../../../public/assets/component-assets/developer-card-assets/logo.svg";
import property_bg from "../../../public/assets/component-assets/developer-card-assets/property-bg.png";
import Image from "next/image";
import elite_tag from "../../../public/assets/icons/elite_tag.svg";

function DeveloperCard() {
  return (
    <div className={classes.card_body}>
      <img src={elite_tag.src} className={classes.tag} alt="Developer" />

      <div className={classes.content_container}>
        <div className={classes.developer_info_container}>
          <div className={classes.logo_container}>
            <img src={logo.src} alt="Developer logo" />
          </div>
          <div className={classes.info_container}>
            <h2>GFC Group</h2>
            <div className={classes.stats_container}>
              <div className={classes.single_stat_container}>
                <p>1989</p>
                <p>Year estd.</p>
              </div>
              <div className={classes.single_stat_container}>
                <p>15</p>
                <p>Projects</p>
              </div>
            </div>
          </div>
        </div>
        <p className={classes.description}>
          Suspendisse condimentum faucibus elementum. Pellentesque...
        </p>

        <div className={classes.imgs_container}>
          <div className={classes.img_container}>
            <div className={classes.overlay}>
              <div className={classes.img_content_container}>
                <p>Musa Gardens</p>
                <p>Lahore, Batapur</p>
                <p>PKR 13.5 Lakh to 56 Lakh</p>
              </div>
            </div>
            <Image fill="true" src={property_bg} alt="add bg" />
          </div>
          <div className={classes.img_container}>
            <div className={classes.overlay} />
            <Image fill="true" src={property_bg} alt="add bg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperCard;
