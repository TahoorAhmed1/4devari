import React from "react";
import classes from "./dashboard_nav.module.css";
import { useState } from "react";
import { useWindowSize } from "../../../utils";
import { Collapse, Typography } from "antd";
import { DASHBOARD_MENU_DATA } from "../../../data/index";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contextApi";
import zilaay_logo from "/public/assets/dashboard/zilaay_logo.svg";
import Image from "next/image";
import { svg_account } from "/public/Svgs";
import Link from "next/link";

const DashboardNav = ({ isMobileMenu, setIsMobileMenu }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [disabledDropdown, setDisabledDropdown] = useState();
  const { width } = useWindowSize();
  const router = useRouter();
  const { user, removeUser } = useAuth();

  const dropIcon = (val) => {
    if (val?.isActive) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="white"
        >
          <path
            d="M4.35859 0.999707L0.458587 4.89971C-0.0164127 5.37471 -0.122413 5.91821 0.140587 6.53021C0.402587 7.14321 0.871088 7.44971 1.54609 7.44971L9.27109 7.44971C9.94609 7.44971 10.4146 7.14321 10.6766 6.53021C10.9396 5.91821 10.8336 5.37471 10.3586 4.89971L6.45859 0.999707C6.30859 0.849707 6.14609 0.737207 5.97109 0.662208C5.79609 0.587208 5.60859 0.549706 5.40859 0.549706C5.20859 0.549706 5.02109 0.587208 4.84609 0.662208C4.67109 0.737207 4.50859 0.849707 4.35859 0.999707Z"
            fill="white"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
        >
          <path
            d="M4.35859 6.45L0.458587 2.55C-0.0164127 2.075 -0.122413 1.5315 0.140587 0.9195C0.402587 0.3065 0.871088 0 1.54609 0L9.27109 0C9.94609 0 10.4146 0.3065 10.6766 0.9195C10.9396 1.5315 10.8336 2.075 10.3586 2.55L6.45859 6.45C6.30859 6.6 6.14609 6.7125 5.97109 6.7875C5.79609 6.8625 5.60859 6.9 5.40859 6.9C5.20859 6.9 5.02109 6.8625 4.84609 6.7875C4.67109 6.7125 4.50859 6.6 4.35859 6.45Z"
            fill="white"
          />
        </svg>
      );
    }
  };

  const handledropChange = (val, id) => {
    if (val.length > 0) {
      setDisabledDropdown(id);
    } else {
      setDisabledDropdown();
    }
  };
  return (
    <div>
      <div
        className={`${classes.Mobile_menu} ${
          isMobileMenu && width < 1024 && classes.show_mobile_menu
        }`}
      >
        <div className={classes.Mobile_menu_header}>
          <div className={classes.left_menu}>
            {/* ////////////////////left_menu svg1////////////////////// */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
              cursor="pointer"
              onClick={() => {
                setIsMobileMenu(false);
              }}
            >
              <path
                d="M7.75 1.25L1 8L7.75 14.75"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* ////////////////////left_menu svg2////////////////////// */}
            <Image
              className={classes.zilaay_drafter_logo}
              src={zilaay_logo}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className={classes.Mobile_menu_content}>
          {/* Customize login////////////////////////////////////////////////////// */}
          <div className={`${classes.login_drop_down_menu}`}>
            <div
              className={classes.login_head}
              onClick={() => {
                setIsDropdown(!isDropdown);
              }}
            >
              <div className={classes.login_logo}>
                {svg_account}
                {user ? user?.username?.split(" ")[0] : "Account"}
              </div>
              {!isDropdown ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                >
                  <path
                    d="M4.35859 6.45L0.458587 2.55C-0.0164127 2.075 -0.122413 1.5315 0.140587 0.9195C0.402587 0.3065 0.871088 0 1.54609 0L9.27109 0C9.94609 0 10.4146 0.3065 10.6766 0.9195C10.9396 1.5315 10.8336 2.075 10.3586 2.55L6.45859 6.45C6.30859 6.6 6.14609 6.7125 5.97109 6.7875C5.79609 6.8625 5.60859 6.9 5.40859 6.9C5.20859 6.9 5.02109 6.8625 4.84609 6.7875C4.67109 6.7125 4.50859 6.6 4.35859 6.45Z"
                    fill="#004439"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                >
                  <path
                    d="M4.35859 0.999707L0.458587 4.89971C-0.0164127 5.37471 -0.122413 5.91821 0.140587 6.53021C0.402587 7.14321 0.871088 7.44971 1.54609 7.44971L9.27109 7.44971C9.94609 7.44971 10.4146 7.14321 10.6766 6.53021C10.9396 5.91821 10.8336 5.37471 10.3586 4.89971L6.45859 0.999707C6.30859 0.849707 6.14609 0.737207 5.97109 0.662208C5.79609 0.587208 5.60859 0.549706 5.40859 0.549706C5.20859 0.549706 5.02109 0.587208 4.84609 0.662208C4.67109 0.737207 4.50859 0.849707 4.35859 0.999707Z"
                    fill="#004439"
                  />
                </svg>
              )}
            </div>

            <div
              className={`${classes.login_content}`}
              style={{
                height:
                  !user && isDropdown
                    ? "44px"
                    : isDropdown && user
                    ? "264px"
                    : "0px",
              }}
            >
              {!user ? (
                <span
                  style={{ borderBottom: "0px" }}
                  onClick={() => router.push("/login", { shallow: true })}
                >
                  <h1>Logout</h1>
                </span>
              ) : (
                <>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/dashboard/user/my-listing"),
                        setIsMobileMenu(false);
                    }}
                  >
                    <h2>My Listings</h2>
                  </span>
                  <div className={classes.menu_activities}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push("/dashboard/user/overview"),
                          setIsMobileMenu(false);
                      }}
                    >
                      Dashboard
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push("/dashboard/user/report_reach"),
                          setIsMobileMenu(false);
                      }}
                    >
                      Reports
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push("/dashboard/user/zilaay-chats"),
                          setIsMobileMenu(false);
                      }}
                    >
                      Contacted
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        router.push("/dashboard/user/account-settings"),
                          setIsMobileMenu(false);
                      }}
                    >
                      Settings
                    </span>
                  </div>
                  <span
                    style={{
                      borderBottom: "0px",
                      borderTop: "0.5px solid rgba(156, 156, 156, 0.26)",
                    }}
                    onClick={removeUser}
                  >
                    <h2 style={{ color: "#004439" }}>Logout</h2>
                  </span>
                </>
              )}
            </div>
          </div>{" "}
          {/* Customize login////////////////////////////////////////////////////// */}
          <div className={classes.dropDownWrapper}>
            {DASHBOARD_MENU_DATA.map((e) => {
              if (e.isDropdown === false) {
                return (
                  <Link
                    href={`${e.link}`}
                    onClick={() => setIsMobileMenu(false)}
                    className={classes.mobile_menu_collapse}
                  >
                    <div className={classes.dashboard_menu_head}>{e.name}</div>
                  </Link>
                );
              } else if (e.isDropdown === true) {
                return (
                  <Collapse
                    ghost
                    expandIconPosition="end"
                    expandIcon={(val) => dropIcon(val)}
                    className={classes.mobile_menu_collapse}
                    onChange={(val) => handledropChange(val, e.id)}
                    key={e.id}
                    activeKey={[`${disabledDropdown}`]}
                  >
                    <Collapse.Panel
                      header={e.name}
                      className={`${classes.mobile_menu_collapse_head} ${
                        disabledDropdown === e.id &&
                        `${classes.disabled_dropdown}`
                      }`}
                      key={e.id}
                    >
                      {e.child?.length > 0 &&
                        e.child?.map((c, i) => (
                          <Link
                            href={`${c.link}`}
                            onClick={() => setIsMobileMenu(false)}
                          >
                            <Collapse
                              ghost
                              expandIconPosition="end"
                              expandIcon={
                                c.is_child_dropdown
                                  ? (val) => dropIcon(val)
                                  : () => null
                              }
                              key={`child-collapse-${i}`}
                              className={classes.mobile_menu_subcollapse}
                            >
                              <Collapse.Panel
                                header={c.sub_name}
                                // onClick={() =>
                                //   !c.is_child_dropdown
                                //     ? router.push(c?.link)
                                //     : null
                                // }
                                className={classes.mobile_menu_child_head}
                              >
                                <div className={classes.collapse_content}>
                                  {c.is_child_dropdown &&
                                    c.sub_child.map((sub, i) => (
                                      <Typography.Text
                                        key={`sub-child-text-${i}`}
                                      >
                                        {" "}
                                        <h2>{sub.sub_child_name}</h2>
                                      </Typography.Text>
                                    ))}
                                </div>
                              </Collapse.Panel>
                            </Collapse>
                          </Link>
                        ))}
                    </Collapse.Panel>
                  </Collapse>
                );
              }
            })}
          </div>
          <div className={classes.copy_write}>
            <p>
              Contact <Link href={"/"}>4Devari.com</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
