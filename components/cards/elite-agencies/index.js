import React from "react";
import classes from "./elite-agencies-card.module.css";
import logo from "../../../public/assets/component-assets/agency-card-assets/logo.png";
import Image from "next/image";
import elite_tag from "../../../public/assets/tags/elite_tag.svg";
import Link from "next/link";

function EliteAgencyCard({ data }) {
  return (
    <Link
      href={`/agency/profile/${data?.user?._id}`}
      className={classes.card_body}
    >
      <img src={elite_tag.src} className={classes.tag} alt="Elite card" />
      <div className={classes.img_container}>
        <img className={classes.logo} src={data?.agencyLogo || logo.src} alt="Elite card display" />
      </div>
      <div className={classes.content_container}>
        <p>{data?.user?.city || "Karachi"}</p>
        <p>No. of Properties Available</p>
        <p>({data?.totalProperties || 0})</p>
      </div>
    </Link>
  );
}

export default EliteAgencyCard;
