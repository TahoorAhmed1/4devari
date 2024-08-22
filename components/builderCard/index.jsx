import Image from "next/image";
import React from "react";
// import cardImg from "../../public/assets/agency_search_output/cardImg1.png";
import logoImg from "../../public/assets/agency_search_output/agency_logo.png";
import Link from "next/link";
const BuilderCard = ({
  name,
  bgImg,
  number,
  whatsapp,
  email,
  locate,
  totalProjects,
  // no_property_rent,
  logo,
  id,
}) => {
  return (
    <div className="zilaay_agency_card" id={id}>
      <Link
        href={`/builder/${id}`}
        className="cardImg"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      />
      <div className="agency_logo">
        <Image src={logo || logoImg} width={50} height={50} />
      </div>
      <div className="text_content">
        <h4>{name}</h4>
        <p>
          {number} {locate && `| ${locate}`}
        </p>
        <div className="line" />
        <div className="count_text">
          <div className="count">
            <h4>{totalProjects || 0}</h4>
            <span>Total No. of Projects</span>
          </div>
          {/* <div className="count">
            <h4>{no_property_rent}</h4>
            <span>Properties for Rent</span>
          </div> */}
        </div>
        <div className="btn_container">
          {whatsapp && (
            <a
              href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
              target="_blank"
            >
              Whatsapp
            </a>
          )}
          <a href={`mailto: ${email}`}>Email</a>
          <a href={`tel: ${number}`}>Call</a>
        </div>
      </div>
    </div>
  );
};

export default BuilderCard;
