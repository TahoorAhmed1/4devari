import React from "react";
import CommonSearchSection from "../../components/common/commonSearchSection";

function PropertyCategory(props) {
  return <CommonSearchSection purpose={props?.purpose} />;
}

export async function getServerSideProps({ req, res, query }) {
  if(query.purpose){
    return {
      props: {
        purpose: query.purpose
      }
    };
  }
  return {
    props: {},
  };
}

export default PropertyCategory;
