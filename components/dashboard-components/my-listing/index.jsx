import React, { useEffect } from "react";
import OutputPropertyCard from "./output-property-card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectsByUserId,
  fetchUserProperties,
} from "../../../redux/property";
import { useAuth } from "../../../contextApi";
import Paginate from "../../common/pagination";
import Loader from "../../common/loader";
import OutputProjectCard from "./output-project-card";
import { fetchUsersById } from "../../../redux/users";

const MyListing = () => {
  const dispatch = useDispatch();

  const { projectsByUserId, loadingProjectsByUserId } = useSelector(
    (state) => state.property
  );
  const { userProperties, loadingUserProperties } = useSelector(
    (state) => state.property
  );
  const { user } = useAuth();
  const userData =
    user?.type === "builder" ? projectsByUserId?.data : userProperties?.data;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUsersById(user?.id));
    }
    if (user?.type === "builder") {
      dispatch(
        fetchProjectsByUserId({ userId: user?.id, query: `nPerPage=10` })
      );
    } else {
      dispatch(fetchUserProperties({ id: user?.id, query: `nPerPage=10` }));
    }
  }, []);

  const handlePageChange = (n) => {
    if (user?.type === "builder") {
      if (n !== projectsByUserId?.meta?.currentPage) {
        dispatch(
          fetchProjectsByUserId({
            userId: user?.id,
            query: `nPerPage=10&pageNumber=${n}`,
          })
        );
      }
    } else {
      if (n !== userProperties?.meta?.currentPage) {
        dispatch(
          fetchUserProperties({
            id: user?.id,
            query: `nPerPage=10&pageNumber=${n}`,
          })
        );
      }
    }
  };
  return (
    <div className="main_listing_container">
      <div className="overlay" />
      <h3 className="mob_heading d_none">My Listing</h3>
      <div className="details_container">
        <div className="left_panel_container">
          <Loader
            loading={
              user?.type === "builder"
                ? loadingProjectsByUserId
                : loadingUserProperties
            }
          >
            <div className="left_panel">
              {userData?.length > 0 &&
                userData?.map((e) => {
                  return user?.type === "builder" ? (
                    <OutputProjectCard data={e} hideLikeIcon />
                  ) : (
                    <OutputPropertyCard data={e} hideLikeIcon />
                  );
                })}
            </div>
          </Loader>
          <div className="blog_cards_num_container">
            <Paginate
              handlePageChange={handlePageChange}
              data={user?.type === "builder" ? projectsByUserId : userProperties}
              align="center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyListing;
