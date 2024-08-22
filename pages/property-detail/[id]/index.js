import React, { useRef, useEffect, useState } from "react";
import TrendingLinks from "../../../components/trending-links";
import ListedProperties from "../../../components/homepage/properties-for-sale";
import PropertyDetailContent from "../../../components/property-detail/components/index";
import classes from "./property-detail.module.css";
import PropertyContactModal from "../../../components/common/modals/property-contact-modal";
import useModal from "../../../hooks/useModal";
import { wrapper } from "../../../redux/store";
import { fetchPropertyById, fetchRecommendedProperties, fetchSimilarProperties } from "../../../redux/property";
import { useDispatch, useSelector } from "react-redux";
import PropertyImagesModal from "../../../components/common/modals/property-images-modal";
import { addEvent } from "../../../redux/analytic";
import { useRouter } from "next/router";

function PropertyDetail() {
  const dispatch = useDispatch()
  const [imageOpen, setImageOpen] = useState("");
  const router = useRouter()
  const stickyDivRef = useRef(null);
  const otherDivRef = useRef(null);
  const isPropertyContactModal = useModal();
  const isPropertyImgModal = useModal();
  const { propertyById, similarProperties, recommendedProperties } = useSelector(
    (state) => state.property
  );
  useEffect(() => {
    const stickyDiv = stickyDivRef.current;
    const otherDiv = otherDivRef.current;
    const otherDivTop = otherDiv.offsetTop - stickyDiv.offsetHeight;

    const handleScroll = () => {
      if (window.pageYOffset >= otherDivTop) {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = `0px`;
        stickyDiv.style.right = `0px`;
      } else {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = "0";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchSimilarProperties(`purpose=${propertyById?.property?.purpose}&type=${propertyById?.property?.type}`));
    dispatch(fetchRecommendedProperties(`purpose=${propertyById?.property?.purpose}`));
    dispatch(addEvent({
      userId: propertyById?.property?.user,
      payload: {
        category: "view",
        name: "property-view",
        property: router?.query?.id,
        staffId: propertyById?.property?.staff ? propertyById?.property?.staff : null,
      }
    }))
  },[])

  return (
    <>
      <PropertyContactModal {...isPropertyContactModal} />
      <PropertyImagesModal
        {...isPropertyImgModal}
        property={propertyById}
        imageOpen={imageOpen}
      />
      <div
        className={classes.container}
      >
        <PropertyDetailContent
          stickyDivRef={stickyDivRef}
          isPropertyContactModal={isPropertyContactModal}
          isPropertyImgModal={isPropertyImgModal}
          property={propertyById}
          setImageOpen={setImageOpen}
        />
        <ListedProperties
          otherDivRef={otherDivRef}
          hideBtnContainer={true}
          textColor={"#0549c7"}
          color={"#fff8d0a3"}
          title={"Similar Properties"}
          property={similarProperties}
        />
        <ListedProperties
          hideBtnContainer={true}
          color={"#0061fdb8"}
          title={"Properties Recommended By 4Devari"}
          property={recommendedProperties}
        />
        <div style={{ width: "90%", margin: "auto" }}>
          <TrendingLinks />
        </div>
      </div>
    </>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    console.log("PARAMS ID", ctx.params?.id);
    await Promise.all([
      store.dispatch(fetchPropertyById(ctx.params?.id))
    ]);
  }
);
export default PropertyDetail;
