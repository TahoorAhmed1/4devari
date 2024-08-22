import { Collapse } from "antd";
import React, { useState } from "react";
import { FAQ_DATA } from "../../data";
import { svg_faq_Inactive, svg_faq_active } from "../../public/Svgs";
import TrendingLinks from "../../components/trending-links";
const FAQs = () => {
  const [dropActive, setdropActive] = useState("");
  const dropIcon = (val) => {
    if (val?.isActive) {
      return <div className="dropicon">{svg_faq_active}</div>;
    } else {
      return <div className="dropicon">{svg_faq_Inactive}</div>;
    }
    const vals = val;
  };
  return (
    <div className="zilaay__FAQs">
      <div className="faq_banner">
        <div className="faq_banner_content containers">
          <div className="banner_text">
            <h1>
              Do You Have
              <br />
              Any Questions For Us?
            </h1>
            <p>We Are Here To Help!</p>
          </div>
          <div className="banner_img"></div>
        </div>
      </div>
      <div className="faq_ad1 containers" />
      <div className="faqs containers">
        <Collapse
          ghost
          expandIconPosition="end"
          expandIcon={(val) => dropIcon(val)}
          accordion={true}
          onChange={(val) => {
            val?.[0] ? setdropActive(val[0]) : setdropActive("");
          }}
        >
          {FAQ_DATA.map((e) => {
            return (
              <Collapse.Panel
                header={
                  <h3 className={dropActive === `${e.id}` ? "active" : ""}>
                    {e.qna}
                  </h3>
                }
                key={e.id}
                className="faq_content"
              >
                <p>{e.ans}</p>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </div>
      <div className="line containers" />
      <div className="faq_ad containers" />
      <div className="containers">
        <TrendingLinks />
      </div>
    </div>
  );
};

export default FAQs;
