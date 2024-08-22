import React from "react";
import CommonSearchSection from "../../../components/common/commonSearchSection";

const PropertyTypeDetail = (props) => {
  return (
    <div>
      <CommonSearchSection type={props?.type} purpose={props?.purpose} />
    </div>
  );
};

export async function getServerSideProps({ req, res, query }) {
  if(query.purpose){
    return {
      props: {
        type: query.type,
        purpose: query.purpose
      }
    };
  }
  return {
    props: {},
  };
}

export default PropertyTypeDetail;
