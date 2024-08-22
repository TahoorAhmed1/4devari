import React, { useEffect, useState } from "react";
import Agency_output_content from "../../components/agency_output";
import TrendingLinks from "../../components/trending-links";
import { fetchAllagencies } from "../../redux/users";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/loader";

const Agency_output = () => {
  const dispatch = useDispatch();
  const { agencies, loadingAgengies } = useSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(fetchAllagencies());
  }, []);

  return (
    <div className="zilaay_agency_output">
      <Loader loading={loadingAgengies} minHeight={200}>
        <Agency_output_content
          agencies={agencies}
        />
      </Loader>
      <div style={{ width: "90%", margin: "auto" }}>
        <TrendingLinks />
      </div>
    </div>
  );
};

export default Agency_output;
