import Image from "next/image";
import React from "react";
import elite from "../../../public/assets/advertise-assets/elite.png";
import tick from "../../../public/assets/advertise-assets/tick.png";
import refresh from "../../../public/assets/advertise-assets/refresh.png";
import listing from "../../../public/assets/advertise-assets/listing.png";
import hot from "../../../public/assets/advertise-assets/hot.png";
import star from "../../../public/assets/advertise-assets/star.png";
import premiem from "../../../public/assets/advertise-assets/premiem.png";
import { useRouter } from "next/router";

function BuilderyPlans() {
  const router = useRouter()
  return (
    <div className="builder_plans_container">
      <div className="details_container" id="builders-plans" style={{ scrollMargin: "100px"}}>
        <h3 className="main_heading">For Builder</h3>
        <div className="owner_plans">
          <div className="plan_card card_1">
            <h3 className="plan_card_heading">Featured Builder Package</h3>
            <div className="cards_lists">
              <div className="list_inner_data">
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Account Registration</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>
                  Yearly Account Subscription
                  </p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Builder Profile (first time in Pakistan)</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Showcase New Launch Projects</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Showcase Under Construction Project</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Showcase Past Projects</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Builder Logo on Project Ad</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Home Page Builder List Exposure</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Upto 5X increase in buyer responses</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>10 Project Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>5 Hot Project Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>50 Refresh credits</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Post any project NewLaunch/Underconstruction/Past</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Link Agency to Project</p>
                </div>
              </div>
            </div>
            <div className="bottom_box">
              <div className="circle_img_bottom style1">
                <Image src={star} alt="No Image" width={40} height={40} />
              </div>
              <div className="prices_main_white">
              <div className="prices_data">
                <span>PKR</span>&nbsp;
                <h3>200,000</h3>&nbsp;
                <span>/Year</span>
              </div>
              <div className="prices_data">
                <span>PKR</span>&nbsp;
                <h3>100,000</h3>&nbsp;
              </div>
              </div>
              <button className="plans_buy_btn" onClick={() => router.push("/dashboard/user/my-orders")}>Buy Now</button>
            </div>
          </div>
          <div className="plan_card card_2">
            <div className="circle_img">
              <Image src={elite} alt="No Image" />
            </div>
            <h3 className="plan_card_heading">Elite Builder Package</h3>
            <div className="cards_lists">
              <div className="list_inner_data">
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Account Registration</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>
                  Yearly Account Subscription
                  </p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Builder Profile (first time in Pakistan)</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Showcase New Launch Projects</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Showcase Under Construction Project</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Showcase Past Projects</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Builder Logo on Project Ad</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Elite Builder Ribbon on Builder Profile and Project Ads</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Home Page Elite Builder List Exposure</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Home Page Hot Project List Exposure</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Top in Invest Page List</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Project Listing Above All</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Priority Listing Approvals</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Upto 10X increase in buyer responses</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>20 Project Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>10 Hot Project Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>100 Refresh Credits</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Post any project NewLaunch/Underconstruction/Past</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Link Agency to Project</p>
                </div>
                
              </div>
            </div>
            <div className="bottom_box">
              <div className="circle_img_bottom style2">
                <Image src={premiem} alt="No Image" width={40} height={40} />
              </div>
              <div className="prices_main_black">
              <div className="prices_data">
                <span>PKR</span>&nbsp;
                <h3>350,000</h3>&nbsp;
                <span>/Year</span>
              </div>
              <div className="prices_data">
                <span>PKR</span>&nbsp;
                <h3>200,000</h3>&nbsp;
              </div>
              </div>
              <button className="plans_buy_btn" onClick={() => router.push("/dashboard/user/my-orders")}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderyPlans;

// 5X Buyers due to high visibility of property across 4Devari
// Premium Listing Design
// Larger photos and slideshow
// Get up to 73% visibility
// 8X Buyers due to higher visibility across 4Devari with 1 Facebook Ad, plus all the Hot Listing Benefits
// Hot Listing Badge
// Plus all benefits of premium listing
// Refresh the time of your posted listing
// Bring them to top again
