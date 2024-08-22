import React, { useEffect, useState } from "react";
import classes from "./hot-project-card.module.css";
// import Image from "next/image";
// import bg from "../../../public/assets/component-assets/hot-project-card-assets/bg.png";
import home from "../../../public/assets/component-assets/hot-project-card-assets/home.svg";
import size from "../../../public/assets/component-assets/hot-project-card-assets/size.svg";
// import logo from "../../../public/assets/component-assets/hot-project-card-assets/logo.svg";
// import hot_tag from "../../../public/assets/tags/hot-ribbon.svg";
import heart_card from "../../../public/assets/icons/heart_card.svg";
import Link from "next/link";
import { convertNumberToWords } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { updateLikedSearch } from "../../../redux/users";
import { HeartFilled } from "@ant-design/icons";
import { useAuth } from "../../../contextApi";

function HotProjectCard({ data, onLikeTap, refetchQuery }) {
  const { user } = useAuth();
  const { userData } = useSelector((state) => state.users);
  const [showHeartIcon, setShowHeartIcon] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const userObj = userData?.user || userData || {};

  const handleChecks = () => {
    if (user?.id && data?.user) {
      if (data?.user?._id === user?.id) {
        setShowHeartIcon(false);
      } else if (data?.user === user?.id) {
        setShowHeartIcon(false);
      } else {
        setShowHeartIcon(true);
      }
    } else {
      setShowHeartIcon(false);
    }
    if (userObj?.likedProjects?.includes(data?._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    console.log("called");
    handleChecks();
  }, [userObj, user]);

  const handleLikeTap = (e) => {
    e.preventDefault(); // Stop default behavior if any
    e.stopPropagation(); // Stop event propagation
    if (user?.id) {
      if (onLikeTap) {
        dispatch(
          updateLikedSearch({
            userId: user.id,
            accessToken: user?.accessToken,
            payload: {
              likedProjects: data?._id,
            },
            refetchQuery,
          })
        ).then(onLikeTap().then(handleChecks()));
      } else {
        dispatch(
          updateLikedSearch({
            userId: user.id,
            accessToken: user?.accessToken,
            payload: {
              likedProjects: data?._id,
            },
            refetchQuery,
          })
        ).then(handleChecks());
      }
    }
  };
  return (
    <div className={classes.card_body}>
      {/* <img src={hot_tag.src} className={classes.tag} /> */}

      <Link href={`/project/${data?._id}`} className={classes.card_img}>
        {showHeartIcon && (
          <div onClick={handleLikeTap} className={classes.heart_cont}>
            <img src={heart_card.src} className={classes.heart} alt="heart" />
            {isLiked && <HeartFilled className={classes.heart_filled} />}
          </div>
        )}
        <img className={classes.img} fill="true" src={data?.images?.[0]} alt="Heart" />
      </Link>

      <div className={classes.content_container}>
        <img
          src={data?.projectLogo || "No Logo"}
          className={classes.developer_logo}
          alt="Hot Card"
        />
        <div className={classes.content_section}>
          {/* <p className={classes.price_tag}>PKR {data?.price} to 56 Lakh</p> */}
          <p className={classes.price_tag}>PKR {convertNumberToWords(data?.price)}</p>
          {/* <p className={classes.address}>Musa Garden Housing Scheme, Lahore</p> */}
          <p className={`${classes.address} text-one-line`}>{data?.name}</p>
          {/* <p className={classes.city}>{data?.city}, Batapur</p> */}
          {/* <p className={classes.city}>{data?.city}</p> */}

          <div className={classes.single_detail} style={{ marginTop: "10px" }}>
            <img src={home.src} alt="Office"/>
            {/* <p>Residential Plots, Commercial Plots</p> */}
            <p>Office: {data?.bookingOrSiteOfficeAddress}</p>
          </div>

          <div className={classes.single_detail}>
            <img src={size.src} alt="More Info" />
            {/* <p>450sqft to 900sqft</p> */}
            <p className=" text-two-line">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotProjectCard;
