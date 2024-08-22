import React from "react";
import { useWindowSize } from "../../../utils";
import {
  svg_builder_call,
  svg_builder_message,
  svg_builder_report,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
} from "../../../public/Svgs";

const RightPanel = () => {
  const width = useWindowSize().width;
  return (
    <div className="right_panel_container">
      {width < 1024 && (
        <div className="right_panel_project_price">
          <div className="right_panel_price">
            <p>Project Price</p>
            <h5>PKR 43.5 Lac to 4 Cr</h5>
          </div>
          <div className="right_panel_status">
            <p>Project Status</p>
            <h5>Under Construction</h5>
          </div>
        </div>
      )}
      <div className="top_btn_container">
        <button>{svg_builder_call}Call</button>
        <button>{svg_builder_message}Message</button>
        <button>{svg_builder_zilaay_chat}Zilaay Chat</button>
        <button>{svg_builder_whatsapp}Whatsapp</button>
      </div>
      <button className="inquire">
        {svg_builder_call}Inquire/Request a Call Back
      </button>
      <button className="report">{svg_builder_report}Report Listing</button>
    </div>
  );
};

export default RightPanel;
