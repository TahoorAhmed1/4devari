import React from "react";
import classes from "./property-card.module.css";
import bg from "/public/assets/component-assets/map-card-assets/map-card-bg.png";
import bath from "/public/assets/component-assets/proprerty-card-assets/bath.svg";
import bed from "/public/assets/component-assets/proprerty-card-assets/bed.svg";
import size from "/public/assets/component-assets/proprerty-card-assets/size.svg";
import Image from "next/image";
import whatsapp_blue from "/public/assets/icons/whatsapp_blue.svg";
import ad from "/public/assets/icons/ad.png";
import heart_card from "/public/assets/icons/heart_card.svg";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  deleteProperty,
  fetchUserProperties,
} from "../../../../redux/property";
import { useAuth } from "../../../../contextApi";
import { svg_delete_card, svg_update_card } from "../../../../public/Svgs";
import { convertNumberToWords, createDashboardUrlByUserRole } from "../../../../utils";

function OutputPropertyCard({ isAd, data, hideLikeIcon }) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleDelete = () => {
    dispatch(deleteProperty(data.property._id)).then(() => {
      dispatch(fetchUserProperties({ id: user?.id, query: `nPerPage=10` }));
    });
    console.log("data", data);
  };

  return (
    <>
      {isAd ? (
        <Link
          className={classes.card_body}
          href={`/property-detail/${data?.property?._id}`}
          id={data?.property?._id}
        >
          <>
            <Image className={classes.ad_img} src={ad} fill="true" />
            <div className={classes.ad_content}>
              <p>Some random Ad text</p>
              <div className={classes.btn_filled}>
                <p>View Property</p>
              </div>
            </div>

            <div className={classes.ad_tag}>
              <p>ADS</p>
            </div>

            {!hideLikeIcon && (
              <img src={heart_card.src} className={classes.heart} />
            )}
            
          </>
        </Link>
      ) : (
        <div className={classes.card_body} id={data?.property?._id}>
          <>
            {!hideLikeIcon && (
              <img src={heart_card.src} className={classes.heart} />
            )}
            <Link href={`/property-detail/${data?.property?._id}`}>
              <div className={classes.card_img}>
                {data?.property?.images?.[0] ? (
                  <img
                    className={classes.img}
                    fill="true"
                    src={data?.property?.images?.[0]}
                  />
                ) : (
                  <Image className={classes.img} fill="true" src={bg} />
                )}
              </div>
            </Link>
            <div className={classes.content_container}>
              <div className={classes.content_section}>
                <h2 className={`${classes.property_title} text-one-line`}>
                  {data?.property?.title
                    ? data?.property?.title
                    : "Beautiful House"}
                </h2>
                <h2 className={classes.price}>
                  {data?.priceUnit || "PKR"} {convertNumberToWords(data?.price) || "0"}
                </h2>
                <div className={classes.details_row}>
                  <div className={classes.single_detail}>
                    <img src={bed.src} />
                    <p>{data?.noOfBedrooms ? data?.noOfBedrooms : 1}</p>
                  </div>
                  <div className={classes.single_detail}>
                    <img src={bath.src} />
                    <p>{data?.noOfBathrooms ? data?.noOfBathrooms : 1}</p>
                  </div>
                  <div className={`${classes.single_detail}`}>
                    <img src={size.src} />
                    <p className="text-one-line">
                      {data?.property?.areaSize || "500"}{" "}
                      {data?.property?.areaSizeUnit || "Sq. Yd"}
                    </p>
                  </div>
                </div>

                <div className={classes.btns_container}>
                  <div className={classes.non_primary_btns}>
                    <Link
                      href={`${createDashboardUrlByUserRole(user?.type, {id: 'edit'})}/${data.property._id}`}
                      className={classes.btn_secondary_update}
                    >
                      <p style={{ fontSize: "10px" }}>Update</p>
                    </Link>
                    <div
                      onClick={handleDelete}
                      className={classes.btn_secondary_delete}
                    >
                      {svg_delete_card}
                      <p style={{ fontSize: "10px" }}>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default OutputPropertyCard;
