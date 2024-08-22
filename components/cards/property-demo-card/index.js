import React from "react";
import classes from "./demo_card.card.module.css";
import bg from "../../../public/assets/component-assets/map-card-assets/map-card-bg.png";
// import developer_logo from "../../../public/assets/component-assets/map-card-assets/developer-logo.svg";
import Image from "next/image";
import hot_tag from "../../../public/assets/tags/hot-ribbon.svg";
// import whatsapp_blue from "../../../public/assets/icons/whatsapp_blue.svg";
// import whatsapp_color from "../../../public/assets/icons/whatsapp_color.svg";
// import Link from "next/link";

import video_card from "../../../public/assets/icons/video_card.svg";
import camera_card from "../../../public/assets/icons/camera_card.svg";
import share_card from "../../../public/assets/icons/share_card.svg";
// import heart_card from "../../../public/assets/icons/heart_card.svg";
import { convertNumberToWords, getDateWithMonthName } from "../../../utils";

function PropertyDemoCard({ width, selectedValues, images }) {
  let width1 = width || "100%";

  // console.log("selected",selectedValues)
  return (
    // <Link href={"/property-detail"}>
      <div className={classes.demo_card_container} style={{ width: width1 }}>
        <div className={classes.card_body}>
          <img src={hot_tag.src} className={classes.tag} alt="Hot" />
          <div className={classes.card_img}>
            {/* <img src={heart_card.src} className={classes.heart} /> */}
            {/* <img src={share_card.src} className={classes.share} /> */}
            <div className={classes.icons_container}>
              <div className={classes.single_tab}>
                <img src={video_card.src} className={classes.video} alt="Total Videos"/>
                <p>{selectedValues?.videos?.length > 0 ? `${selectedValues.videos.length}` : 0}</p>
              </div>
              <div className={classes.single_tab}>
                <img src={camera_card.src} className={classes.camera} alt="Total Images"/>
                <p>{selectedValues?.images?.length > 0 ? `${selectedValues?.images.length}` : 0}</p>
              </div>
            </div>
            <Image className={classes.img} fill="true" alt="property bg" src={selectedValues?.images.length > 0 ? selectedValues?.images?.[0] : bg} />
          </div>
          <div className={classes.content_container}>
            <div className={classes.content_section}>
              <h2 className={classes.property_title}>
                {/* House For Sale in {selectedValues.city ? selectedValues.city : `City`} {selectedValues.location ? selectedValues.location : `location`}  */}
                {selectedValues.title ? selectedValues.title : `Property Title`}
              </h2>
              <h2 className={classes.price}>{selectedValues.priceUnit} { selectedValues.purpose === "coliving space" ? selectedValues?.monthlyRentPerRoom ? convertNumberToWords(selectedValues?.monthlyRentPerRoom) : "0" :  selectedValues.purpose === "buy" ? selectedValues.price ? convertNumberToWords(selectedValues.price) : "0" : selectedValues.monthlyRent ? `${convertNumberToWords(selectedValues.monthlyRent)}` : "0"}</h2>
              {/* <p className={classes.address}>
                {selectedValues.title ? selectedValues.title : `Property Title`}
              </p> */}
              <p className={classes.description_text}>Description</p>
              <div className={classes.details_row}>
                <p>{selectedValues.noOfBedrooms ? `${selectedValues.noOfBedrooms} Bed` : "0 Bed"}</p>
                <p>{selectedValues.noOfBathrooms ? `${selectedValues.noOfBathrooms} Bath` : "0 Bath"}</p>
                <p>{selectedValues.areaSize ? `${selectedValues.areaSize}` : "0"} {selectedValues.areaSizeUnit}</p>
              </div>
              <p className={classes.status_text}>
                {" "}
                On 4Devari: {getDateWithMonthName()}
              </p>
              {/* <p style={{ marginBottom: "20px" }}>Property ID: </p> */}

              {/* <div className={classes.btns_container}>
              <div className={classes.non_primary_btns}>
                <div
                  style={{ width: "100%", height: "23px" }}
                  className="btn_secondary"
                >
                  <p style={{ fontSize: "10px" }}>Call</p>
                </div>
                <div
                  style={{ width: "100%", height: "23px" }}
                  className="btn_secondary"
                >
                  <p style={{ fontSize: "10px" }}>WhatsApp</p>
                  <img src={whatsapp_blue.src} />
                </div>

                <div style={{ width: "100%", height: "23px" }} className="btn">
                  <p style={{ fontSize: "10px" }}>Email</p>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    // </Link>
  );
}

export default PropertyDemoCard;
