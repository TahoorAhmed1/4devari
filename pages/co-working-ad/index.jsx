import React, { useRef, useEffect, useState } from "react";
import TrendingLinks from "../../components/trending-links";
import ListedProject from "../../components/homepage/project_show";
import classes from "./single_project.module.css";
import PropertyContactModal from "../../components/common/modals/property-contact-modal";
import useModal from "../../hooks/useModal";
import ProjectDetailContent from "../../components/co-working-ad-detail/components";
import RightPanel from "../../components/co-working-ad-detail/right_panel";
import { useWindowSize } from "../../utils";
import HotProjects from "../../components/homepage/hot-projects";

function Co_workingAd() {
  const stickyDivRef = useRef(null);
  const otherDivRef = useRef(null);
  const isPropertyContactModal = useModal();
  const width = useWindowSize().width;
  useEffect(() => {
    const stickyDiv = stickyDivRef.current;
    const otherDiv = otherDivRef.current;
    const otherDivTop = otherDiv.offsetTop - stickyDiv.offsetHeight;

    const handleScroll = () => {
      if (window.pageYOffset >= otherDivTop) {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = `90px`;
        stickyDiv.style.right = `0px`;
      } else {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = "90px";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* onClick={isPropertyContactModal.onOpen} */}
      <PropertyContactModal {...isPropertyContactModal} />
      <div
        className={classes.container}
        // onClick={isPropertyContactModal.onOpen}
      >
        <ProjectDetailContent
          stickyDivRef={stickyDivRef}
          isPropertyContactModal={isPropertyContactModal}
        />
        <ListedProject
          otherDivRef={otherDivRef}
          hideBtnContainer={true}
          hidetags={true}
          textColor={"#65AD86"}
          color={"#65AD86"}
          title={"Show more Similar Coworking Spaces"}
        />
        {/* {width < 1024 && <RightPanel />} */}
        <div style={{ width: "90%", margin: "auto" }}>
          <TrendingLinks />
        </div>
      </div>
    </>
  );
}

export default Co_workingAd;
