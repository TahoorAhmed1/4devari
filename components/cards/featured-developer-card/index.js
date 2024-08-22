import React from "react";
import classes from "./developer-card.module.css";
import logo from "../../../public/assets/component-assets/featured-developer-card-assets/logo.svg";
// import Image from "next/image";
import Link from "next/link";

function FeaturedDeveloper({ data, link }) {
  return (
    <Link
      href={`${link || "/"}`}
      className={classes.card_body}
    >
      <img src={data?.agencyLogo || data?.builderLogo || logo.src} alt="Featured Developer" />
    </Link>
  );
}

export default FeaturedDeveloper;
