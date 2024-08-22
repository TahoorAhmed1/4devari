import React, { useEffect, useState } from "react";
import TrendingLinks from "../../components/trending-links";
import { useWindowSize } from "../../utils";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import OwnerPlans from "../../components/advertisepage/ownerplans";
import AgencyPlans from "../../components/advertisepage/agencyplans";
import BuilderyPlans from "../../components/advertisepage/builderplans";
import UpdateListing from "../../components/advertisepage/updatelisting";

const Advertise = () => {
  const width = useWindowSize().width;
  // Function to handle button click
  const [isTopPanelSticky, setIsTopPanelSticky] = useState(false);
  const { ref: topPanelRef, inView: topPanelInView } = useInView({
    threshold: 0,
  });
  const [activeButton, setActiveButton] = useState(1);

  const handleLinkClick = (buttonId) => {
    setActiveButton(buttonId);
    // You can perform other actions here based on the link click
  };
  useEffect(() => {
    setIsTopPanelSticky(!topPanelInView);
  }, [topPanelInView]);
  const buttons = [
    { id: 1, path: "#owner-plans" },
    { id: 2, path: "#agency-plans" },
    { id: 3, path: "#builders-plans" },
    // Add more buttons with their respective paths
  ];
  return (
    <div className="zilaay_advertise_container">
      <div className="builder_banner" />
      <div ref={topPanelRef} style={{ position: "absolute", top: "310px" }} />
      <div className="container">
        <div className="content_container">
          {/* {width > 768 && ( */}
          <div
            style={{
              position: width > 768 && isTopPanelSticky && "fixed",
              top: width > 768 && isTopPanelSticky && "-1px",
              width: width > 768 && isTopPanelSticky && "100vw",
              borderRadius: width > 768 && isTopPanelSticky && "0",
              marginTop: width > 768 && isTopPanelSticky && "0px",
            }}
            className="stats_panel"
          >
            <div
              style={{
                marginLeft: isTopPanelSticky && "14px",
              }}
              className="btns_container"
            >
              <Link
                href={buttons[0].path}
                onClick={() => handleLinkClick(buttons[0].id)}
                scroll
                className={activeButton === 1 ? "blue_tag" : "white_tag "}
              >
                <p>Owner Plans</p>
              </Link>

              <Link
                href={buttons[1].path}
                onClick={() => handleLinkClick(buttons[1].id)}
                scroll
                className={activeButton === 2 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Agency Plans</p>
              </Link>

              <Link
                href={buttons[2].path}
                onClick={() => handleLinkClick(buttons[2].id)}
                scroll
                className={activeButton === 3 ? "blue_tag" : "white_tag "}
              >
                <p style={{ color: "black" }}>Builder Plans</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="back_links containers" id="scroll-to-agency-detail">
        <p>4devari</p>
        {">"}
        <p className="p_active">Advertise with 4Devari</p>
      </div>
      <OwnerPlans />
      <AgencyPlans />
      <BuilderyPlans />
      <UpdateListing />
      {/* <div style={{ width: "90%", margin: "auto" }}>
        <TrendingLinks />
      </div> */}
    </div>
  );
};

export default Advertise;
