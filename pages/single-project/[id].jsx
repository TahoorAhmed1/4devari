import React, { useRef, useEffect, useState } from "react";
import TrendingLinks from "../../components/trending-links";
import ListedProject from "../../components/homepage/project_show";
import classes from "./single_project.module.css";
import PropertyContactModal from "../../components/common/modals/property-contact-modal";
import useModal from "../../hooks/useModal";
import ProjectDetailContent from "../../components/singleProject-detail/components";
import RightPanel from "../../components/singleProject-detail/right_panel";
import { useWindowSize } from "../../utils";
import HotProjects from "../../components/homepage/hot-projects";
import { fetchProjectById } from "../../redux/property";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import PropertyImagesModal from "../../components/common/modals/property-images-modal";

function SingleProject() {
  const stickyDivRef = useRef(null);
  const otherDivRef = useRef(null);
  const isPropertyContactModal = useModal();
  const isPropertyImgModal = useModal();
  const [imageOpen, setImageOpen] = useState("");
  const width = useWindowSize().width;
  const router = useRouter();
  const { projectById } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  useEffect(() => {
    const stickyDiv = stickyDivRef.current;
    const otherDiv = otherDivRef.current;
    const otherDivTop = otherDiv.offsetTop - stickyDiv.offsetHeight;
    const handleScroll = () => {
      if (window.pageYOffset >= otherDivTop) {
        stickyDiv.style.position = "sticky";
        stickyDiv.style.top = `90px`;
        stickyDiv.style.right = `0px`;
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
    dispatch(fetchProjectById(router?.query?.id));
  }, [router?.query?.id]);
  console.log(projectById);

  return (
    <>
      {/* onClick={isPropertyContactModal.onOpen} */}
      <PropertyContactModal {...isPropertyContactModal} />

      <PropertyImagesModal
        {...isPropertyImgModal}
        project={projectById}
        imageOpen={imageOpen}
      />
      <div
        className={classes.container}
        // onClick={isPropertyContactModal.onOpen}
      >
        <ProjectDetailContent
          stickyDivRef={stickyDivRef}
          isPropertyContactModal={isPropertyContactModal}
          data={projectById}
          isPropertyImgModal={isPropertyImgModal}
          setImageOpen={setImageOpen}
        />
        <HotProjects hideBtnContainer={true} title={"Other Projects"} />
        <ListedProject
          otherDivRef={otherDivRef}
          hideBtnContainer={true}
          textColor={"#8461A0"}
          hidetags={true}
          color={
            // "linear-gradient(86deg, rgba(132, 97, 160, 0.75) 0%, rgba(132, 97, 160, 0.50) 100%);"
            "#8461A0"
          }
          title={"Projects Nearby Location"}
        />
        {/* <ListedProject
          hideBtnContainer={true}
          hidetags={true}
          textColor={"#C57F16"}
          color={"#C57F16"}
          title={"Most Viewed Projects in Similar Location"}
        /> */}
        {width < 1024 && <RightPanel data={projectById} />}
        <div style={{ width: "90%", margin: "auto" }}>
          <TrendingLinks />
        </div>
      </div>
    </>
  );
}
export default SingleProject;
