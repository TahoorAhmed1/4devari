import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import AllAgencies from "../components/homepage/all-agencies";
import Banner from "../components/homepage/banner";
import Blogs from "../components/homepage/blogs";
import EliteAgencies from "../components/homepage/elite-agencies";
import EliteDevelopers from "../components/homepage/elite-developers";
import FeaturedDevelopers from "../components/homepage/featured-developers";
import ForumsAndNewsletters from "../components/homepage/forums-newsletters";
import HotProjects from "../components/homepage/hot-projects";
import Map from "../components/homepage/map";
import ListedProperties from "../components/homepage/properties-for-sale";
import TrendingLinks from "../components/trending-links";
import styles from "../styles/Home.module.css";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/navbar";
import back_top from "../public/assets/icons/back_top.svg";
import chat_bot from "../public/assets/icons/chat_bot.svg";
import {
  fetchPoints,
  fetchProperties,
  fetchPropertiesForRent,
  fetchPropertiesForSale,
  fetchPropertiesForShare,
} from "../redux/property";
import { useWindowSize } from "../utils";
import { useRouter } from "next/router";
import { useAuth } from "../contextApi";
import { useDispatch, useSelector } from "react-redux";
import useModal from "../hooks/useModal";
import PropertyAdvertiseModal from "../components/common/modals/property-advertise-modal";
import { PURPOSE } from "../utils/constants";
import { fetchUsersById, sendContactDetail } from "../redux/users";

function Home() {
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [enlargeTrailer, setEnlargeTrailer] = useState(false);
  const isAdvertiseModal = useModal();
  const videoContainerRef = useRef(null);
  const { width } = useWindowSize();
  const router = useRouter();
  const { signUp, user } = useAuth();
  const dispatch = useDispatch();
  const {
    propertiesForSale,
    loadingPropertiesForSale,
    propertiesForRent,
    loadingPropertiesForRent,
    propertiesForShare,
    loadingPropertiesForShare,
  } = useSelector((state) => state.property);

  const [hideTVC, setHideTVC] = useState(false);
  const { ref: microBuyRef, inView: microBuyInView } = useInView({
    threshold: 0,
  });
  const { ref: eliteBuildersRef } = useInView({
    threshold: 0,
  });
  const { ref: bannerRef, inView: bannerInView } = useInView({
    threshold: 0,
  });
  const [showNavbar, setShowNavbar] = useState();

  const contactFormRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPropertiesForSale());
    dispatch(fetchPropertiesForRent());
    dispatch(fetchPropertiesForShare());
    dispatch(fetchProperties(`purpose=buy&type=residential`));
    dispatch(fetchPoints(`purpose=buy&type=residential`));
  }, []);

  useEffect(() => {
    if (router?.query?.social_user_id && router?.query?.userId) {
      signUp(router.query);
      router.replace("/");
    }
  }, [router.query]);

  useEffect(() => {
    if (microBuyInView === false && bannerInView === false) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [microBuyInView, bannerInView]);

  let listener;

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (document !== null) {
        let scrolled = document.scrollingElement.scrollTop;

        if (scrolled > 130) {
          setHideTVC(true);
        } else if (scrolled <= 130) {
          setHideTVC(false);
        }

        if (scrolled > 2500) {
          setShowScrollToTop(true);
        } else if (scrolled <= 2500) {
          setShowScrollToTop(false);
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        contactFormRef.current &&
        !contactFormRef.current.contains(event.target)
      ) {
        setShowContactForm(false);
      }
    }

    // Bind the event listener
    window.addEventListener("click", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [contactFormRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        videoContainerRef.current &&
        !videoContainerRef.current.contains(event.target)
      ) {
        setEnlargeTrailer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [videoContainerRef]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUsersById(user?.id));
    }
  }, [user]);

  const handleMoreSaleCard = (size) => {
    dispatch(fetchPropertiesForSale(`nPerPage=${size}`));
  };
  const handleMoreRentCard = (size) => {
    dispatch(fetchPropertiesForRent(`nPerPage=${size}`));
  };
  const handleMoreShareLivingCard = (size) => {
    dispatch(fetchPropertiesForShare(`nPerPage=${size}`));
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    dispatch(sendContactDetail({ payload: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    }})).then(() => {
      handleOpenContactForm();
      setFormData({ name: "", email: "", phone: "", message: "" });
    })
  };
  return (
    <div>
      <PropertyAdvertiseModal {...isAdvertiseModal} />
      <div
        style={{ opacity: isDropdownEnabled ? "1" : "0" }}
        className={styles.overlay}
      ></div>

      <div
        style={{ right: hideTVC ? "-24%" : "-10px" }}
        className={
          enlargeTrailer
            ? styles.large_trailer_container
            : styles.trailer_container
        }
        ref={videoContainerRef}
      >
        <div
          onClick={() => {
            setEnlargeTrailer(!enlargeTrailer);
          }}
          className={styles.video_placeholder_container}
        >
          <iframe
            onClick={() => {
              setEnlargeTrailer(!enlargeTrailer);
            }}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/CHVy5h-uALw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <p>
          4Devari.com <span>New</span> Ad
        </p>
      </div>

      <img
        style={{
          right: showScrollToTop ? "1%" : "-20%",
          pointerEvents: showScrollToTop ? "all" : "none",
        }}
        onClick={() => {
          if (showScrollToTop) {
            handleClick();
          }
        }}
        src={back_top.src}
        className={styles.top_icon}
        alt="back_top"
      />

      <div
        className={styles.chat_icon}
        id="chat_icon"
        style={{
          bottom: showScrollToTop && width > 1020 ? "13%" : "2%",
        }}
      >
        <div className={styles.contact_form_container}>
          <div
            className={
              showContactForm ? styles.contact_form : styles.contact_form_hidden
            }
          >
            <form
              onSubmit={handleSubmit}
              className={styles.contact_form_content}
            >
              <h2>Contact Us</h2>
              <p className={styles.form_text}>
                Use the form below to contact us
              </p>
              {/* <input placeholder="Your Name" className={styles.input_field} />
              <input placeholder="Your Email" className={styles.input_field} />
              <input placeholder="Your Phone" className={styles.input_field} />
              <input placeholder="Your Name" className={styles.input_field} />
              <textarea
                placeholder="Type your message"
                className={styles.input_field_textarea}
              /> */}

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={styles.input_field}
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className={styles.input_field}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className={styles.input_field}
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Type your message"
                className={styles.input_field_textarea}
                value={formData.message}
                onChange={handleChange}
                required
                style={{ resize: "none", outline: "none" }}
              />

              <button type="submit" className={styles.btn_filled}>
                Submit
              </button>
              {/* <div className={styles.btn_filled}>
                <p>Send</p>
              </div> */}
            </form>
          </div>
        </div>
        <img
          onClick={() => {
            handleOpenContactForm();
          }}
          src={chat_bot.src}
          alt="chatbot"
        />
      </div>

      <Head>
        <title>4Devari | Pakistan's One-Stop Real Estate Marketplace</title>
      </Head>
      <Navbar showNavbar={showNavbar} isTransparent={true} />

      <Banner
        setIsDropdown={setIsDropdownEnabled}
        refInstance={bannerRef}
        isAdvertiseModal={isAdvertiseModal}
      />

      <Map refInstance={microBuyRef} />
      <div className={styles.ad_container}>
        <div className={styles.ad_placehodler}>
          <h1>928 x 250 AD HERE</h1>
          <h2>Premium Billboard Ad Goes Here</h2>
        </div>
      </div>
      <HotProjects />
      <EliteDevelopers passedRef={eliteBuildersRef} />
      <FeaturedDevelopers />
      <div className={styles.ad_container}>
        <div className={styles.ad_placehodler}>
          <h1>928 x 250 AD HERE</h1>
          <h2>Premium Billboard Ad Goes Here</h2>
        </div>
      </div>
      <EliteAgencies />
      <AllAgencies />
      <ListedProperties
        title={"Properties For Sale"}
        property={propertiesForSale}
        prop_purpose={PURPOSE.buy}
        color={"#aa4ff1"}
        handleMoreCard={handleMoreSaleCard}
        isLoading={loadingPropertiesForSale}
      />
      <ListedProperties
        title={"Properties For Rent"}
        color={"rgba(98, 157, 96, 1)"}
        property={propertiesForRent}
        prop_purpose={PURPOSE.rent}
        handleMoreCard={handleMoreRentCard}
        isLoading={loadingPropertiesForRent}
      />
      <ListedProperties
        title={"Properties For Sharing"}
        color={"rgba(100, 160, 231, 1"}
        property={propertiesForShare}
        prop_purpose={PURPOSE.coliving}
        handleMoreCard={handleMoreShareLivingCard}
        isLoading={loadingPropertiesForShare}
      />
      <Blogs />
      <ForumsAndNewsletters />
      <div style={{ width: "90%", margin: "auto" }}>
        <TrendingLinks />
      </div>
    </div>
  );
}

export default Home;
