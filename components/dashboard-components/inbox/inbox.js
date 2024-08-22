import React, { useEffect, useState } from "react";
import classes from "./inbox.module.css";

import { showUsersType, useWindowSize } from "../../../utils";
import My_chats from "./my_chats";
import Chat_list from "./chat_list";
import {
  svg_chat_back_arrow,
  svg_chat_call,
  svg_chat_del,
  // svg_chat_search,
  // svg_chat_tag_search,
  // svg_chat_video,
  // svg_three_dots_black,
} from "../../../public/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  deleteChat,
  fetchIUserById,
  getUserInbox,
  messagesByUserIds,
  updateChatState,
} from "../../../redux/chats";
import { useAuth } from "../../../contextApi";
import Loader from "../../common/loader";

function Inbox() {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedInboxUser, setSelectedInboxUser] = useState({});
  const [tagChat, setTagChat] = useState(1);
  const sInboxUser = useSelector((state) => state.chat.iUserData);
  const { loadingChats, userInbox } = useSelector((state) => state.chat);
  const { loadingUser } = useSelector((state) => state.users);
  const openChat = router?.query?.user_id ? true : false;
  useEffect(() => {
    if (user?.id) {
      dispatch(getUserInbox(user?.id));
    }
  }, []);

  useEffect(() => {
    if (sInboxUser?.user?._id) {
      setSelectedInboxUser(sInboxUser.user);
    } else if (sInboxUser?._id) {
      setSelectedInboxUser(sInboxUser);
    } else {
      setSelectedInboxUser({});
    }
  }, [sInboxUser?._id]);

  useEffect(() => {
    if (router?.query?.user_id && router?.query?.user_id !== user?.id) {
      dispatch(fetchIUserById(router?.query?.user_id));
      dispatch(
        messagesByUserIds({ user1: user?.id, user2: router?.query?.user_id })
      );
    } else {
      dispatch(updateChatState({ key: "iUserData", value: {} }));
    }
  }, [router?.isReady && router?.query?.user_id]);

  const handleResetAll = () => {
    dispatch(updateChatState({ key: "iUserData", value: {} }));
    setSelectedInboxUser({});
    router.push({
      pathname: router.pathname,
      query: {
        id: "zilaay-chats",
      },
    });
  };

  const handleDeleteChat = (inboxUId) => {
    if (inboxUId && userInbox?.inboxUsers?.find((u) => u?._id === inboxUId)) {
      dispatch(deleteChat({ inboxUserId: inboxUId, userId: user?.id })).then(
        () => {
          handleResetAll();
          dispatch(getUserInbox(user?.id));
        }
      );
    } else {
      handleResetAll();
      dispatch(getUserInbox(user?.id));
    }
  };

  const handleback = () => {
    handleResetAll();
    dispatch(getUserInbox(user?.id));
  };

  return (
    <div className={classes.container}>
      <Loader loading={loadingChats || loadingUser}>
        <div className={classes.heading_bar}>
          <div className={classes.heading}>
            {(!openChat || width > 850) && <h2>Inbox</h2>}
          </div>
          {router?.query?.user_id && (width > 850 || openChat) ? (
            <div className={classes.heading_right_panel}>
              <div className={classes.user_profile}>
                {width < 851 && (
                  <span onClick={handleback}>{svg_chat_back_arrow}</span>
                )}
                <div
                  className={classes.profile_picture}
                  style={{
                    backgroundImage: `url(${
                      selectedInboxUser?.picture ||
                      "/assets/agency-detail/staff.jpeg"
                      // "/assets/zilaay-chats/profile_chat_img.png"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className={classes.profile_name_section}>
                  <h3 className={classes.name}>
                    {selectedInboxUser?.username}
                  </h3>
                  <p className={classes.name_title}>
                    {showUsersType(selectedInboxUser?.type) || "User"}
                  </p>
                </div>
              </div>

              <div className={classes.user_btns}>
                {/* {width > 850 ? ( */}
                <>
                  {/* <span>{svg_chat_search}</span> */}
                  <a href={`tel: ${selectedInboxUser?.mobileNumbers?.[0]}`}>
                    {svg_chat_call}
                  </a>
                  {/* <span>{svg_chat_video}</span> */}
                  <span
                    className={classes.chat_del}
                    onClick={() => handleDeleteChat(router?.query?.user_id)}
                  >
                    {svg_chat_del}
                  </span>
                </>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {!openChat && width < 850 && (
          <div className={classes.mob_tags_search}>
            <div className={classes.tags}>
              <span
                className={
                  tagChat === 1 ? `${classes.active_tag}` : `${classes.tag}`
                }
                onClick={() => setTagChat(1)}
              >
                All
              </span>
              <span
                className={
                  tagChat === 2 ? `${classes.active_tag}` : `${classes.tag}`
                }
                onClick={() => setTagChat(2)}
              >
                Today
              </span>
              <span
                className={
                  tagChat === 3 ? `${classes.active_tag}` : `${classes.tag}`
                }
                onClick={() => setTagChat(3)}
              >
                {(width > 425 && "Last 7 Days") ||
                  (width < 375 && "7Days") ||
                  (width < 426 && "7 Days")}
              </span>
              {/* <span
              className={
                tagChat === 4 ? `${classes.active_tag}` : `${classes.tag}`
              }
              onClick={() => setTagChat(4)}
            >
              Trash
            </span> */}
            </div>
          </div>
        )}

        <div
          className={classes.inbox_section}
          style={
            openChat && width < 851 ? { overflowY: "hidden" } : { padding: "0" }
          }
        >
          {(!openChat || width > 850) && (
            <Chat_list
              selectedInboxUser={selectedInboxUser}
              handleDeleteChat={handleDeleteChat}
              tagChat={tagChat}
            />
          )}
          {width > 850 || openChat ? <My_chats /> : ""}
        </div>
      </Loader>
    </div>
  );
}

export default Inbox;
