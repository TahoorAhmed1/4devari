import Image from "next/image";
import React from "react";
// import cardImg from "../../public/assets/agency_search_output/cardImg1.png";
import logoImg from "../../public/assets/agency_search_output/agency_logo.png";
import Link from "next/link";
const AgencyCard = ({
  name,
  bgImg,
  number,
  whatsapp,
  email,
  locate,
  totalProperties,
  logo,
  id,
}) => {
  return (
    <div className="zilaay_agency_card" id={id}>
      <Link
        href={`/agency/profile/${id}`}
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
            <h4>{totalProperties}</h4>
            <span>Total No. of Properties</span>
          </div>
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

export default AgencyCard;
