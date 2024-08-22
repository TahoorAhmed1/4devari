import React, { useRef, useEffect, useState } from "react";
import TrendingLinks from "../../../components/trending-links";
import ListedProject from "../../../components/homepage/project_show";
import useModal from "../../../hooks/useModal";
import RightPanel from "../../../components/singleProject-detail/right_panel";
import { useWindowSize } from "../../../utils";
import HotProjects from "../../../components/homepage/hot-projects";
import AgencyDetailContent from "../../../components/agencyProfile-detail";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../contextApi";
import { fetchAllStaff, fetchUsersById } from "../../../redux/users";
import { useRouter } from "next/router";
import {
  fetchUserProperties,
  fetchUserPropertiesForRent,
  fetchUserPropertiesForSale,
  fetchUserPropertiesForShareLiving,
} from "../../../redux/property";
import { PURPOSE } from "../../../utils/constants";
import { addEvent } from "../../../redux/analytic";

function AgencyProfile() {
  const stickyDivRef = useRef(null);
  const otherDivRef = useRef(null);
  const isPropertyContactModal = useModal();
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = user?.id;
  const { userData, allStaff, loadingAllStaff, loadingUser } = useSelector(
    (state) => state.users
  );
  const userInfo = userData?.user;
  const {
    userProperties,
    loadingUserProperties,
    userPropertiesForSale,
    userPropertiesForRent,
    userPropertiesForShareLiving,
  } = useSelector((state) => state.property);
  useEffect(() => {
    const stickyDiv = stickyDivRef.current;
    const otherDiv = otherDivRef.current;
    const otherDivTop = otherDiv.offsetTop - stickyDiv.offsetHeight;

    const handleScroll = () => {
      if (window.pageYOffset >= otherDivTop) {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = `90px`;
        stickyDiv.style.right = `0px`;
        stickyDiv.style.bottom = `65px`;
      } else {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = "90px";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if(router?.query?.id){
      dispatch(
        fetchUserPropertiesForSale({
          id: router?.query?.id,
          query: `purpose=${PURPOSE.buy}`,
        })
      );
      dispatch(
        fetchUserPropertiesForRent({
          id: router?.query?.id,
          query: `purpose=${PURPOSE.rent}`,
        })
      );
      dispatch(
        fetchUserPropertiesForShareLiving({
          id: router?.query?.id,
          query: `purpose=${PURPOSE.coliving}`,
        })
      );
      dispatch(addEvent({
        userId: router?.query?.id,
        payload: {
          category: "view",
          name: "profile-view",
        }
      }))
    }
  }, [router?.isReady]);
  useEffect(() => {
    if (router?.query?.id) {
      dispatch(fetchUsersById(router?.query?.id));
    }
  }, [router?.isReady]);
  useEffect(() => {
    dispatch(fetchAllStaff());
  }, []);
  const handleMoreSaleCard = (size) => {
    dispatch(
      fetchUserPropertiesForSale({
        id: router?.query?.id,
        query: `purpose=${PURPOSE.buy}&nPerPage=${size}`,
      })
    );
  };
  const handleMoreRentCard = (size) => {
    dispatch(
      fetchUserPropertiesForRent({
        id: router?.query?.id,
        query: `purpose=${PURPOSE.rent}&nPerPage=${size}`,
      })
    );
  };
  const handleMoreShareLivingCard = (size) => {
    dispatch(
      fetchUserPropertiesForShareLiving({
        id: router?.query?.id,
        query: `purpose=${PURPOSE.coliving}&nPerPage=${size}`,
      })
    );
  };
  return (
    <div className="Agency_profile">
      <AgencyDetailContent
        stickyDivRef={stickyDivRef}
        isPropertyContactModal={isPropertyContactModal}
        userInfo={userInfo}
        userData={userData}
        loadingUser={loadingUser}
        allStaff={allStaff}
        loadingAllStaff={loadingAllStaff}
        userProperties={userProperties}
        userPropertiesLoader={loadingUserProperties}
        propertiesForSale={userPropertiesForSale}
        propertiesForRent={userPropertiesForRent}
        propertiesForShare={userPropertiesForShareLiving}
        handleMoreSaleCard={handleMoreSaleCard}
        handleMoreRentCard={handleMoreRentCard}
        handleMoreShareLivingCard={handleMoreShareLivingCard}
      />
      {/* {width < 1024 && <RightPanel />} */}
      <div style={{ width: "90%", margin: "auto" }}>
        <TrendingLinks otherDivRef={otherDivRef} />
      </div>
    </div>
  );
}

export default AgencyProfile;
