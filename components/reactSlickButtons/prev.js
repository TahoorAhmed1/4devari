import React from "react";
import arrow from "../../public/assets/icons/left_arrow.svg";
import Image from "next/image";

function prev(props) {
  const { onClick, xPosition, yPosition, width } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: xPosition ? xPosition : "-23px",
        top: yPosition ? yPosition : "40%",
        display: "block",
        zIndex: "+10",
      }}
    >
      <Image
        src={arrow}
        height={"50"}
        width={"50"}
        style={{ cursor: "pointer", width: width ? width : "auto" }}
        alt="Previous"
      />
    </div>
  );
}

export default prev;
