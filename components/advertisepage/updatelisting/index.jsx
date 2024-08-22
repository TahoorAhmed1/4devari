import Image from "next/image";
import React from "react";
import media from "../../../public/assets/advertise-assets/media.png";
import trending from "../../../public/assets/advertise-assets/trending.png";
import searches from "../../../public/assets/advertise-assets/searches.png";
import { CardSlider } from "../../common";

function UpdateListing() {
  return (
    <div className="update_listing_container">
      <div className="details_container">
        <h3 className="main_heading">Upgrade your listings on 4Devari to</h3>
        <div className="owner_plans">
          <div className="plan_card">
            <div className="circle_img">
              <Image src={searches} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Appear higher in searches</h3>
            <p className="plan_card_text">
              Upgraded listings appear higher in search results giving your
              listing more views and responses
            </p>
          </div>
          <div className="plan_card">
            <div className="circle_img">
              <Image src={trending} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Hassle free selling/renting</h3>
            <p className="plan_card_text">Relax and sell faster</p>
          </div>
          <div className="plan_card">
            <div className="circle_img">
              <Image src={media} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Reach users on social media</h3>
            <p className="plan_card_text">
              More relevant buyers with Facebook and google marketing
            </p>
          </div>
        </div>
        <div className="owner_plans_carousel">
          <CardSlider
          dots={true}
            show={1}
            arrows={false}
            totalLength={3}
            // handleMoreCard={() => null}
            // handleMoreCard={handleMoreSaleCard}
            disableInfinite
            // responsive={responsive2}
          >
           <div className="plan_card">
            <div className="circle_img">
              <Image src={searches} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Appear higher in searches</h3>
            <p className="plan_card_text">
              Upgraded listings appear higher in search results giving your
              listing more views and responses
            </p>
          </div>
          <div className="plan_card">
            <div className="circle_img">
              <Image src={trending} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Hassle free selling/renting</h3>
            <p className="plan_card_text">Relax and sell faster</p>
          </div>
          <div className="plan_card">
            <div className="circle_img">
              <Image src={media} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Reach users on social media</h3>
            <p className="plan_card_text">
              More relevant buyers with Facebook and google marketing
            </p>
          </div>
          </CardSlider>
        </div>
        <div className="update_plan_btn">
          <button className="plans_buy_btn">
            Become a member of <span>4Devari.com today!</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateListing;
