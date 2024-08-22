import React, { useEffect } from "react";
import classes from "../inbox.module.css";
import three_dot from "/public/assets/dashboard/three_dot.svg";
// import chat_img from "../../../../public/assets/zilaay-chats/chat_img.png";
// import Image from "next/image";
// import { INBOX_CHATS_LIST } from "../../../../data";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../contextApi";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
import { HandleNotFound, useWindowSize } from "../../../../utils";
import { useFormik } from "formik";
import { svg_chat_tag_search } from "../../../../public/Svgs";

const Chat_list = ({ selectedInboxUser, handleDeleteChat, tagChat }) => {
  const { userInbox } = useSelector((state) => state.chat);
  const [inboxByUser, setInboxByUser] = useState({});
  // const selectedInboxUser = useSelector((state) => state.users.userData)
  const { user } = useAuth();
  const router = useRouter();
  const { width } = useWindowSize();

  useEffect(() => {
    if (userInbox?.inboxUsers) {
      setInboxByUser({ ...userInbox });
    }
  }, [userInbox?.inboxUsers]);

  useEffect(() => {
    if (
      selectedInboxUser?._id &&
      selectedInboxUser?._id !== user?.id &&
      inboxByUser?.inboxUsers
    ) {
      const isUserExist =
        inboxByUser?.inboxUsers?.length > 0 &&
        inboxByUser?.inboxUsers?.find((u) => u?._id === router?.query?.user_id);
      if (!isUserExist) {
        setInboxByUser({
          ...inboxByUser,
          inboxUsers: [...inboxByUser?.inboxUsers, selectedInboxUser],
        });
      }
    }
  }, [selectedInboxUser]);

  // Helper function to check if a timestamp is from today
  const isToday = (timestamp) => {
    const today = new Date();
    const date = new Date(timestamp);
    return date.toDateString() === today.toDateString();
  };

  // Helper function to check if a timestamp is within the last 7 days
  const isWithinLast7Days = (timestamp) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const date = new Date(timestamp);
    return date >= sevenDaysAgo;
  };

  useEffect(() => {
    if (tagChat === 2) {
      const filterInboxUsers = userInbox?.inboxUsers?.filter((u) => {
        return u?.lastChat?.timestamp && isToday(u.lastChat.timestamp);
      });
      setInboxByUser({
        ...userInbox,
        inboxUsers: filterInboxUsers,
      });
    } else if (tagChat === 3) {
      const filterInboxUsers = userInbox?.inboxUsers?.filter((u) => {
        return (
          u?.lastChat?.timestamp && isWithinLast7Days(u.lastChat.timestamp)
        );
      });
      setInboxByUser({
        ...userInbox,
        inboxUsers: filterInboxUsers,
      });
    } else {
      setInboxByUser({
        ...userInbox,
      });
    }
  }, [tagChat]);

  const initialValues = {
    searchValue: "",
  };
  const formik = useFormik({
    initialValues,

    onSubmit: (values) => {
      if (inboxByUser?.inboxUsers && values?.searchValue?.length > 0) {
        let searchedInbox = userInbox?.inboxUsers?.filter((u) =>
          u?.username
            ?.toLowerCase()
            .includes(values?.searchValue?.toLowerCase())
        );
        setInboxByUser({
          ...userInbox,
          inboxUsers: searchedInbox,
        });
      } else {
        setInboxByUser(userInbox);
      }
      // You can perform additional actions here, like submitting the data to a server
    },
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <div className={classes.inbox_list}>
      <div className={classes.overlay} />
      {/* <div
        style={{ marginTop: "20px" }}
        className={classes.single_inbox_selected}
      >
        <div className={classes.inbox_content}>
          <img src={three_dot.src} className={classes.three_dot} />
          <div className={classes.single_inbox_profile_picture}></div>
          <div className={classes.single_inbox_profile_name_section}>
            <div>
              <h3 className={classes.single_inbox_name}>Mike</h3>
              <p className={classes.single_inbox_name_title}>Agent</p>
            </div>
            <p className={classes.single_inbox_message}>Type message here..</p>
          </div>
        </div>
      </div> */}
      {/* {width > 850 && ( */}
      <div
        className={classes.tag_search}
        style={{ width: "calc(100% - 30px)", marginTop: "15px" }}
      >
        {" "}
        <input
          type="text"
          placeholder="Search..."
          name="searchValue"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values?.searchValue}
          onKeyPress={handleKeyPress}
        />
        <span onClick={formik?.handleSubmit}>{svg_chat_tag_search}</span>
      </div>
      {/* )} */}
      <div className={classes.inbox_chat_list}>
        {inboxByUser?.inboxUsers?.length > 0 ? (
          inboxByUser?.inboxUsers?.map((u) => {
            const items = [
              {
                key: "1",
                label: <a href={`tel: ${u?.mobileNumbers?.[0]}`}>Call</a>,
              },
              {
                key: "2",
                label: (
                  <span onClick={() => handleDeleteChat(u?._id)}>Remove</span>
                ),
              },
            ];
            return (
              <div key={`chat-list-${u?._id}`} style={{ position: "relative" }}>
                <Dropdown menu={{ items }} placement="bottom">
                  <img src={three_dot.src} className={classes.three_dot} />
                </Dropdown>
                <div
                  className={
                    router?.query?.user_id === u?._id
                      ? `${classes.single_inbox_selected}`
                      : `${classes.single_inbox}`
                  }
                  onClick={() => {
                    router.push({
                      pathname: router.pathname,
                      query: {
                        // ...router.query,
                        id: "zilaay-chats",
                        user_id: u?._id,
                      },
                    });
                  }}
                >
                  <div className={classes.inbox_content}>
                    <div
                      className={classes.single_inbox_profile_picture}
                      style={{
                        backgroundImage: `url(${
                          u?.picture || "/assets/agency-detail/staff.jpeg"
                        } )`,
                        backgroundSize: `cover`,
                      }}
                    ></div>
                    <div className={classes.single_inbox_profile_name_section}>
                      <div>
                        <h3 className={classes.single_inbox_name}>
                          {u?.username}
                        </h3>
                      </div>
                      <p
                        className={`${classes.single_inbox_message} text-one-line`}
                      >
                        {u?.lastChat?.message || "Type message here.."}
                        {/* Type message here.. */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={classes.chat_divider} />
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
              height: "100%",
            }}
          >
            <HandleNotFound text={"Inbox is currently empty"} />
          </div>
        )}
        {/* {chatsByUserIdData?.length > 0 && chatsByUserIdData?.map((c) => {
          const usersWithChats = c?.members?.find((u) => u?._id !== user?.id);
          return(
            <div key={`chat-list-${c?._id}`}>
              <div
                className={
                  router?.query?.chat_id === c?._id
                    ? `${classes.single_inbox_selected}`
                    : `${classes.single_inbox}`
                }
                onClick={() => {
                  setOpenChat(true);
                  router.push({
                    pathname: router.pathname,
                    query: {
                      id: "zilaay-chats",
                      chat_id: c?._id
                    }
                  })
                }}
              >
                <div className={classes.inbox_content}>
                  <img src={three_dot.src} className={classes.three_dot} />
                  <div
                    className={classes.single_inbox_profile_picture}
                    style={{
                      backgroundImage: `url(${usersWithChats?.picture || '/assets/zilaay-chats/chat_img.png'} )`,
                      backgroundSize: `cover`,
                    }}
                  ></div>
                  <div className={classes.single_inbox_profile_name_section}>
                    <div>
                      <h3 className={classes.single_inbox_name}>{usersWithChats?.username}</h3>
                      <p className={classes.single_inbox_name_title}>
                      </p>
                    </div>
                    <p className={classes.single_inbox_message}>
                      Type message here..
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes.chat_divider} />
            </div>
          )
        })} */}
      </div>
    </div>
  );
};

export default Chat_list;
