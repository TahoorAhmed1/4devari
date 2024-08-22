import React from "react";
import classes from "./chat-section.card.module.css";
import bg from "/public/assets/component-assets/map-card-assets/map-card-bg.png";
import Image from "next/image";
// import hot_tag from "/public/assets/tags/hot-ribbon.svg";
import Link from "next/link";

import video_card from "/public/assets/icons/video_card.svg";
import camera_card from "/public/assets/icons/camera_card.svg";
import { convertNumberToWords } from "../../../../utils";

function ProjectCHATCard({ data }) {
  let project = data;
  return (
    <Link
      href={`/project/${project?._id}`}
      className={classes.card_body}
    >
      {/* <img src={hot_tag.src} className={classes.tag} /> */}
      <div className={classes.card_img}>
        <div className={classes.icons_container}>
          {project?.videos?.length > 0 && (
            <div className={classes.single_tab}>
              <img src={video_card.src} className={classes.video} />
              <p>{project?.videos?.length}</p>
            </div>
          )}
          {project?.images?.length > 0 && (
            <div className={classes.single_tab}>
              <img src={camera_card.src} className={classes.camera} />
              <p>{project?.images?.length}</p>
            </div>
          )}
        </div>
        <Image className={classes.img} fill="true" src={project?.images?.[0] || bg} />
      </div>
      <div className={classes.content_container}>
        <img src={project?.projectLogo} className={classes.developer_logo} />
        <div className={classes.content_section}>
          <h2 className={classes.property_title}>
            {project?.name ||
              "N/A"}
          </h2>
          <h2 className={classes.price}>
            {project?.priceUnit || "PKR"}{" "}
            {convertNumberToWords(project?.price) || "0"}
          </h2>
          <div className={classes.details_row}>
            <p className="text-one-line">
              {project?.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCHATCard;
