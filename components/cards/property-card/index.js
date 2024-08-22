import React, { useEffect, useState } from "react";
import classes from "./property-card.module.css";
import bg from "../../../public/assets/component-assets/map-card-assets/map-card-bg.png";
import bath from "../../../public/assets/component-assets/proprerty-card-assets/bath.svg";
import bed from "../../../public/assets/component-assets/proprerty-card-assets/bed.svg";
import size from "../../../public/assets/component-assets/proprerty-card-assets/size.svg";
import Image from "next/image";
import whatsapp_blue from "../../../public/assets/icons/whatsapp_blue.svg";
import ad from "../../../public/assets/icons/ad.png";
import heart_card from "../../../public/assets/icons/heart_card.svg";
import Link from "next/link";
import { convertNumberToWords } from "../../../utils";
import { HeartFilled } from '@ant-design/icons'
import { useAuth } from "../../../contextApi";
import { useDispatch, useSelector } from "react-redux";
import { updateLikedSearch } from "../../../redux/users";

function PropertyCard({ isAd, data }) {
  const {user} = useAuth()
  const {userData} = useSelector((state) => state.users)
  const [showHeartIcon , setShowHeartIcon] = useState(false)
  const [isLiked , setIsLiked] = useState(false)
  const dispatch = useDispatch()
  const userObj = userData?.user || userData || {}

  useEffect(() => {
    if(user?.id && data?.property?.user){
      if(data?.property?.user?._id === user?.id){
        setShowHeartIcon(false)
      }else if (data?.property?.user === user?.id){
        setShowHeartIcon(false)
      }else {
        setShowHeartIcon(true)
      }
    }else {
      setShowHeartIcon(false) 
    }
    if(userObj?.likedProperties?.includes(data?.property?._id)){
      setIsLiked(true)
    }else{
      setIsLiked(false)
    }
  },[userObj, user])

  const handleLikeTap = (e) => {
    e.preventDefault();  // Stop default behavior if any
    e.stopPropagation(); // Stop event propagation
    if(user?.id){
      dispatch(updateLikedSearch({
        userId: user.id,
        accessToken: user?.accessToken,
        payload: {
          likedProperties: data?.property?._id
        }
      }))
    }

  }
  return (
    <Link
      className={classes.card_body}
      href={`/property-detail/${data?.property?._id}`}
      id={data?.property?._id}
    >
      {isAd ? (
        <>
          <Image className={classes.ad_img} src={ad} fill="true" alt="Property hero add" />
          <div className={classes.ad_content}>
            <p>Some random Ad text</p>
            <div className={classes.btn_filled}>
              <p>View Property</p>
            </div>
          </div>

          <div className={classes.ad_tag}>
            <p>ADS</p>
          </div>

          {showHeartIcon && (
            <div onClick={handleLikeTap} className={classes.heart_cont}>
              <img src={heart_card.src} className={classes.heart} alt="Heart" />
              {isLiked && (
                <HeartFilled className={classes.heart_filled} />
              )}
            </div>
          ) }
        </>
      ) : (
        <>
          {showHeartIcon && (
            <div onClick={handleLikeTap} className={classes.heart_cont}>
              <img src={heart_card.src} className={classes.heart} alt="Heart" />
              {isLiked && (
                <HeartFilled className={classes.heart_filled} />
              )}
            </div>
          ) }

          <div className={classes.card_img}>
            {data?.property?.images?.[0] ? (
              <img
                className={classes.img}
                fill="true"
                src={data?.property?.images?.[0]}
                alt="Property hero card"
              />
            ) : (
              <Image className={classes.img} fill="true" src={bg} alt="Property placholder" />
            )}
          </div>
          <div className={classes.content_container}>
            <div className={classes.content_section}>
              <h2 className={`${classes.property_title} text-one-line`}>
                {data?.property?.title
                  ? data?.property?.title
                  : "Beautiful House"}
              </h2>
              <h2 className={classes.price}>
                {data?.priceUnit || "PKR"} {convertNumberToWords(data?.price) || "75"}
              </h2>
              <div className={classes.details_row}>
                <div className={classes.single_detail}>
                  <img src={bed.src} alt="beds" />
                  <p>{data?.noOfBedrooms ? data?.noOfBedrooms : 1}</p>
                </div>
                <div className={classes.single_detail}>
                  <img src={bath.src} alt="baths" />
                  <p>{data?.noOfBathrooms ? data?.noOfBathrooms : 1}</p>
                </div>
                <div className={`${classes.single_detail}`}>
                  <img src={size.src} alt="size" />
                  <p className="text-one-line">
                    {data?.property?.areaSize || "500"}{" "}
                    {data?.property?.areaSizeUnit || "Sq. Yd"}
                  </p>
                </div>
              </div>

              <div className={classes.btns_container}>
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
                    <img src={whatsapp_blue.src} alt="whatsapp" />
                  </div>

                  <div
                    style={{ width: "100%", height: "23px" }}
                    className="btn"
                  >
                    <p style={{ fontSize: "10px" }}>Email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Link>
  );
}

export default PropertyCard;
