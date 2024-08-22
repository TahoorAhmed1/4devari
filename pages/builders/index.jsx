import React, { useEffect } from "react";
import Builder_output_content from "../../components/builder_output";
import TrendingLinks from "../../components/trending-links";
import { fetchbuilders } from "../../redux/users";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/loader";

const Builder_output = () => {
  const dispatch = useDispatch();
  const { builders, loadingBuilders } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchbuilders());
  }, []);

  return (
    <div className="zilaay_builder_output">
      <Loader loading={loadingBuilders} minHeight={200}>
        <Builder_output_content
          builders={builders}
        />
      </Loader>
      <div style={{ width: "90%", margin: "auto" }}>
        <TrendingLinks />
      </div>
    </div>
  );
};

export default Builder_output;
