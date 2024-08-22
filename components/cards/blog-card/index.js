import Image from "next/image";
import React from "react";
import classes from "./blog-card.module.css";
import bg from "../../../public/assets/component-assets/blog-card-assets/bg.png";

function BlogCard() {
  return (
    <div className={classes.card_body}>
      <div className={classes.img_container}>
        <Image src={bg} fill="true" alt="Main Blog" />
      </div>
      <p className={classes.date}>Jan 11, 2023 | Blogs</p>
      <p>Exploring the Head-turning Features of Sparco Tower, Islamabad...</p>
    </div>
  );
}

export default BlogCard;
