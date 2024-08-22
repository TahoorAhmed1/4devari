import React from "react";
import logo from "/public/assets/component-assets/developer-card-assets/logo.svg";
import property_bg from "/public/assets/component-assets/developer-card-assets/property-bg.png";
import Image from "next/image";
import Link from "next/link";
const Top_builders = ({ data }) => {
  return (
    <div className="cards">
      <div className="card_body">
        <div className="content_container">
          <div className="developer_info_container">
            <Link
              href={`/builder/${data?.user?._id}`}
              className="logo_container"
            >
              <img src={data?.builderLogo || logo.src} alt="Builder logo" />
            </Link>
            <div className="info_container">
              <h3 className="text-one-line">{data?.builderName}</h3>
              <div className="stats_container">
                <div className="single_stat_container">
                  <p>{data?.experienceYears || "2 years"}</p>
                  <p>Experience</p>
                </div>

                {/* <div className="single_stat_container">
                  <p>15</p>
                  <p>Projects</p>
                </div> */}
              </div>
            </div>
          </div>
          <p className="description text-two-line">
            {data?.aboutUs ||
              "Suspendisse condimentum faucibus elementum. Pellentesque..."}
          </p>

          <Link href={`/builder/${data?.user?._id}`} className="imgs_container">
            <div className="img_container">
              <div className="overlay">
                <div className="img_content_container">
                  <p>{data?.user?.city || "Lahore"}</p>
                  <p>{data?.user?.country || "Pakistan"}</p>
                  {/* <p>PKR 13.5 Lakh to 56 Lakh</p> */}
                </div>
              </div>
              <Image fill="true" src={data?.builderCoverPicture || property_bg} alt="Card bg"/>
            </div>
            {/* <div className="img_container d-none">
              <div className="overlay" />
              <Image fill src={property_bg} />
            </div> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Top_builders;
