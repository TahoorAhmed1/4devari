import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./common.module.css";
import add_property from "/public/assets/dashboard/add-property.svg";
import my_listing from "/public/assets/dashboard/my-listings.svg";
import account from "/public/assets/navbar-assets/account.png";
import zilaay_logo from "/public/assets/dashboard/zilaay_logo.svg";
// import search_icon_white from "/public/assets/navbar-assets/search_white.svg";
import Link from "next/link";
import { Dropdown, Space } from "antd";
import {
  svg_back_zilaay,
  svg_hamburger,
  svg_phone_dropdown,
} from "/public/Svgs";
import Image from "next/image";
import DashboardNav from "../dashboard_mobile_nav";
import { useAuth } from "../../../contextApi";
import { useDispatch } from "react-redux";
import { fetchUsersById } from "../../../redux/users";

function CommonDashboard({ menu_list, setCurrentPage, children }) {
  const router = useRouter();
  const [selectedMenuOption, setSelectedMenuOption] = useState(1);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [subReport, setSubReport] = useState(false);
  const { removeUser, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router?.query?.id) {
      const activeMenu = menu_list.find((m) => m.link === router?.query?.id);
      if (activeMenu?.id) setSelectedMenuOption(activeMenu.id);
      setCurrentPage(router?.query?.id);
    }
  }, [router?.query]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUsersById(user?.id));
    }
  }, [user]);

  const handleLogout = () => {
    removeUser();
    router.push("/login");
  };

  const items = [
    {
      key: "1",
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Navigate to another page
      router.push(`/dashboard/user/my-listing`);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <DashboardNav
        isMobileMenu={isMobileMenu}
        setIsMobileMenu={setIsMobileMenu}
      />
      <div className={classes.dashboard_container}>
        <div className={classes.navbar}>
          <div className={classes.left_panel}>
            <span
              className={classes.hamburger}
              onClick={() => setIsMobileMenu(!isMobileMenu)}
            >
              {" "}
              {svg_hamburger}
            </span>
            <img src={zilaay_logo.src} />
          </div>
          <div className={classes.right_panel}>
            <Link href="/" className={classes.back_zilaay}>
              {svg_back_zilaay}go to 4Devari.com
            </Link>
            {/* <div className={classes.input_with_icon}>
              <input
                placeholder="Search by ID"
                className={classes.property_id_search}
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <Link href={"/dashboard/user/my-listing"}>
                <img src={search_icon_white.src} />
              </Link>
            </div> */}
            <Link href="/dashboard/user/my-listing">
              <div className={classes.btn_with_icon}>
                <img src={my_listing.src} />
                <p>My Listings</p>
              </div>
            </Link>
            {user?.type === "builder" ? (
              <Link href="/dashboard/builder/add-project">
                <div className={classes.btn_with_icon}>
                  <img src={add_property.src} />
                  <p> Add Project</p>
                </div>
              </Link>
            ) : (
              <Link href="/dashboard/user/add-property">
                <div className={classes.btn_with_icon}>
                  <img src={add_property.src} />
                  <p> Add Property</p>
                </div>
              </Link>
            )}
          </div>
          <div className={classes.account}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <Space className={classes.account_content}>
                <Image src={account} width={24} height={24} />
                {svg_phone_dropdown}
              </Space>
            </Dropdown>
          </div>
        </div>
        <div className={classes.lower_half_container}>
          <div className={classes.menu_container}>
            <div className={classes.btns_container}>
              {menu_list?.map((menu, index) => (
                <>
                  {!menu.sub_head ? (
                    <Link
                      href={`/dashboard/user/${menu?.link}`}
                      style={{
                        borderBottom:
                          menu_list?.length - 1 === index &&
                          "1px solid transparent",
                      }}
                      key={index}
                      onClick={() => {
                        setSelectedMenuOption(menu.id);
                        router.push(`/dashboard/user/${menu?.link}`);
                      }}
                      className={
                        selectedMenuOption === menu?.id
                          ? classes.single_btn_selected
                          : classes.single_btn
                      }
                    >
                      <img
                        src={
                          selectedMenuOption === menu?.id
                            ? menu?.src_2
                            : menu?.src
                        }
                      />
                      <p>{menu?.name}</p>
                    </Link>
                  ) : (
                    <div
                      style={{
                        borderBottom:
                          menu_list?.length - 1 === index &&
                          "1px solid transparent",
                      }}
                      key={index}
                      onClick={() => {
                        setSelectedMenuOption(menu.id);
                        setSubReport(!subReport);
                      }}
                      className={
                        selectedMenuOption === menu?.id
                          ? classes.single_btn_selected
                          : classes.single_btn
                      }
                    >
                      <img
                        src={
                          selectedMenuOption === menu?.id
                            ? menu?.src_2
                            : menu?.src
                        }
                      />
                      <p>{menu?.name}</p>
                    </div>
                  )}
                  {menu.sub_head && (
                    <div
                      className={classes.report_subheadings}
                      style={
                        subReport
                          ? { height: "fit-content", overflow: "unset" }
                          : { height: "0px", overflow: "hidden" }
                      }
                    >
                      {menu.heading.map((e) => {
                        return (
                          <Link
                            href={`/dashboard/user/${e?.sub_link}`}
                            className={classes.report_head}
                          >
                            {e.sub_name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
                // <Link
                //   href={`/dashboard/${role}/${menu?.link}`}
                //   style={{
                //     borderBottom:
                //       menu_list?.length - 1 === index &&
                //       "1px solid transparent",
                //   }}
                //   key={index}
                //   className={
                //     selectedMenuOption === menu?.id
                //       ? classes.single_btn_selected
                //       : classes.single_btn
                //   }
                // >
                //   <img
                //     src={
                //       selectedMenuOption === menu?.id ? menu?.src_2 : menu?.src
                //     }
                //   />
                //   <p>{menu?.name}</p>
                // </Link>
              ))}
            </div>
            <p className={classes.contact}>
              Contact <span>4Devari.com</span>
            </p>
          </div>
          <div className={classes.component_container}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default CommonDashboard;
