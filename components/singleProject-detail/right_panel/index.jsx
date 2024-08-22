import React from "react";
import {
  convertNumberToWords,
  createDashboardUrlByUserRole,
  useWindowSize,
} from "../../../utils";
import {
  svg_builder_call,
  svg_builder_message,
  svg_builder_report,
  svg_builder_whatsapp,
  svg_builder_zilaay_chat,
} from "../../../public/Svgs";
import { useAuth } from "../../../contextApi";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../redux/analytic";

const RightPanel = ({ data }) => {
  const width = useWindowSize().width;
  const { user } = useAuth();
  const dispatch = useDispatch()

  // Analytics
  const handleWhatsAppEvent = () => {
    dispatch(
      addEvent({
        userId: data?.user?._id,
        payload: {
          category: "click",
          name: "whatsapp-click",
          project: data?._id,
        },
      })
    );
  };
  const handleChatClickEvent = () => {
    dispatch(
      addEvent({
        userId: data?.user?._id,
        payload: {
          category: "click",
          name: "chat-click",
          project: data?._id,
        },
      })
    );
  };
  const handleEmailClickEvent = () => {
    dispatch(
      addEvent({
        userId: data?.user?._id,
        payload: {
          category: "click",
          name: "email-click",
          project: data?._id,
        },
      })
    );
  };

  return (
    <div className="right_panel_container">
      {data ? (
        <>
          <div className="right_panel_project_price">
            <div className="right_panel_price">
              <p>Project Price</p>
              <h5>
                PKR {convertNumberToWords(data?.price) || "43.5 Lac to 4 Cr"}
              </h5>
            </div>
            <div className="right_panel_status">
              <p>Project Status</p>
              <h5>{data?.status}</h5>
            </div>
          </div>

          <div className="top_btn_container">
            <a href={`tel: ${data?.mobileNumbers[0]}`}>
              {svg_builder_call}Call
            </a>
            <a href={`mailto: ${data?.email}`} onClick={handleEmailClickEvent}>{svg_builder_message}Email</a>
            <a
              href={createDashboardUrlByUserRole(user?.type, {
                id: "zilaay-chats",
                user_id: data?.user?._id,
                project_ref_id: data?._id,
              })}
              onClick={handleChatClickEvent}
            >
              {svg_builder_zilaay_chat}4Devari Chat
            </a>

            {/* id: "zilaay-chats",
                user_id: data?.user?._id,
                project_ref_id: data._id, */}
            {data?.whatsapp && (
              <a href={`https://api.whatsapp.com/send?phone=${data?.whatsapp}`} onClick={handleWhatsAppEvent}>
                {svg_builder_whatsapp}Whatsapp
              </a>
            )}
          </div>
          <a
            className="inquire"
            href={`tel: ${data?.landlineNumber || data?.mobileNumbers[0]}`}
          >
            {svg_builder_call}Inquire/Request a Call Back
          </a>
          <a className="report" href={`mailto: ${data?.email}`}>
            {svg_builder_report}Report Listing
          </a>
        </>
      ) : (
        <>
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
          <a className="inquire">
            {svg_builder_call}Inquire/Request a Call Back
          </a>
          <a className="report">{svg_builder_report}Report Listing</a>
        </>
      )}
    </div>
  );
};

export default RightPanel;
