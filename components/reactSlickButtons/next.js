import React from "react";
import classes from "./styles.module.css";
import arrow from "../../public/assets/icons/right_arrow.svg";
import Image from "next/image";

function next(props) {
  const { onClick, xPosition, yPosition, width } = props;

  return (
    <div
      className={classes.arrow}
      onClick={onClick}
      style={{
        position: "absolute",
        right: xPosition ? xPosition : "-18px",
        top: yPosition ? yPosition : "40%",
        display: "block",
      }}
    >
      <Image
        className={classes.arrow}
        src={arrow}
        height={"50"}
        width={"50"}
        style={{ cursor: "pointer", width: width ? width : "auto" }}
        alt="Next"
      />
    </div>
  );
}

export default next;
