import Image from "next/image";
import React from "react";
import tick from "../../../public/assets/advertise-assets/tick.png";
import refresh from "../../../public/assets/advertise-assets/refresh.png";
import listing from "../../../public/assets/advertise-assets/listing.png";
import hot from "../../../public/assets/advertise-assets/hot.png";
import { useRouter } from "next/router";

function OwnerPlans() {
  const router = useRouter()
  return (
    <div className="owner_plans_container">
      <div className="details_container" id="owner-plans" style={{ scrollMargin: "100px"}}>
        <h3 className="main_heading">Owner Plans</h3>
        <div className="owner_plans">
          <div className="plan_card">
            <div className="circle_img style1">
              <Image src={listing} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Premium Listing</h3>
            <div className="cards_lists">
              <div className="list_inner_data">
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Get up to 59% Visibility</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>
                    5X Buyers due to high visibility of property across 4Devari
                  </p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Premium Listing Design</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Larger photos and slideshow</p>
                </div>
              </div>
            </div>
            <div className="prices_data">
              <span className="color_change">PKR</span>&nbsp;
              <h3>1,000</h3>&nbsp;
              <p>Currently Free</p>
            </div>
            <button className="plans_buy_btn" onClick={() => router.push("/dashboard/user/my-orders")}>Buy Now</button>
          </div>
          <div className="plan_card">
            <div className="circle_img style2">
              <Image src={hot} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Hot Listing</h3>
            <div className="cards_lists">
              <div className="list_inner_data">
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Get up to 73% visibility</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>
                  8X Buyers due to higher visibility across 4Devari with 1 Facebook Ad, plus all the Hot Listing Benefits
                  </p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Hot Listing Badge</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Plus all benefits of premium listing</p>
                </div>
              </div>
            </div>
            <div className="prices_data">
              <span className="color_change">PKR</span>&nbsp;
              <h3>3,000</h3>&nbsp;
              <p>Currently Pkr 1,500</p>
            </div>
            <button className="plans_buy_btn" onClick={() => router.push("/dashboard/user/my-orders")}>Buy Now</button>
          </div>
          <div className="plan_card">
            <div className="circle_img style3">
              <Image src={refresh} alt="No Image" width={40} height={40} />
            </div>
            <h3 className="plan_card_heading">Premium Listing</h3>
            <div className="cards_lists">
              <div className="list_inner_data">
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>Refresh the time of your posted listing</p>
                </div>
                <div className="list_data">
                  <Image src={tick} alt="No Image" width={20} height={20} />
                  <p>
                  Bring them to top again
                  </p>
                </div>
              </div>
            </div>
            <div className="prices_data">
              <span className="color_change">PKR</span>&nbsp;
              <h3>100</h3>&nbsp;
              <span>Currently Free</span>
            </div>
            <button className="plans_buy_btn" onClick={() => router.push("/dashboard/user/my-orders")}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerPlans;
