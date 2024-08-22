import Image from "next/image";
import React from "react";
import elite from "../../../public/assets/advertise-assets/elite.png";
import tick from "../../../public/assets/advertise-assets/tick.png";
import star from "../../../public/assets/advertise-assets/star.png";
import premiem from "../../../public/assets/advertise-assets/premiem.png";
import { useRouter } from "next/router";

function AgencyPlans() {
  const router = useRouter()
  return (
    <div className="agency_plans_container">
      <div className="details_container" id="agency-plans" style={{ scrollMargin: "100px"}}>
        <h3 className="main_heading">For Agency</h3>
        <div className="owner_plans">
          <div className="plan_card card_1">
            <h3 className="plan_card_heading">Premium Package</h3>
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
                  <p>Agency Logo on Property Ad</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Agency Profile</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Agency Staff Profiles</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Upto 5X increase in buyer responses</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>80 Premium Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>50 Hot Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>300 Refresh credits</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>24/7 Support</p>
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
                <h3>100,000</h3>&nbsp;
                <span>/Year</span>
              </div>
              <div className="prices_data">
                <span>PKR</span>&nbsp;
                <h3>50,000</h3>&nbsp;
              </div>
              </div>
              <button className="plans_buy_btn" onClick={() => router.push("/dashboard/user/my-orders")}>Buy Now</button>
            </div>
          </div>
          <div className="plan_card card_2">
            <div className="circle_img">
              <Image src={elite} alt="No Image" />
            </div>
            <h3 className="plan_card_heading">Elite Package</h3>
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
                  <p>Agency Logo on Property Ad</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Home Page Elite Agency List Exposure</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Top In Agency Finder Listing</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Property Ad Above all</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Elite agency Ribbon on Agency profile and every property ad</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Priorty Listing Approvals</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Agency Profile</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Agency Staff Profiles</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>125 Premium Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>75 Hot Listings</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>500 Refresh credits</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Elite Agency Badge</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Free Verification</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>24/7 Support</p>
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
        </div>
      </div>
    </div>
  );
}

export default AgencyPlans;
