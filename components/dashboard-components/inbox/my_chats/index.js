import React, { useEffect, useRef, useState } from "react";
import classes from "../inbox.module.css";
import {
  svg_chat_file,
  svg_chat_mic,
  svg_chat_msg_send,
  svg_site_logo_primary,
} from "../../../../public/Svgs";
import { showUsersType, useWindowSize } from "../../../../utils";
import CHATCard from "../chat-card";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInbox,
  messagesByChatId,
  messagesByUserIds,
  postMessage,
} from "../../../../redux/chats";
import { useAuth } from "../../../../contextApi";
import { fetchProjectById, fetchPropertyById } from "../../../../redux/property";
import Loader from "../../../common/loader";
import ProjectCHATCard from "../chat-card/project-chat-card";

const My_chats = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [refProperty, setRefProperty] = useState({});
  const [refProject, setRefProject] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const scrollRef = useRef();
  const { messagesByUserIdsData, loadingChats, userInbox } = useSelector(
    (state) => state.chat
  );
  const [text, setText] = useState("");

  useEffect(() => {
    if (router?.query?.chat_id) {
      setText("");
    }
  }, [router?.query?.chat_id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messagesByUserIdsData]);

  useEffect(() => {
    if (
      (messagesByUserIdsData?.referencePrperties?.[0] ||
        router?.query?.property_ref_id) &&
      router.isReady
    ) {
      console.log("called");
      dispatch(
        fetchPropertyById(
          messagesByUserIdsData?.referencePrperties?.[0] ||
            router?.query?.property_ref_id
        )
      ).then((val) => {
        if (val?.payload?.property) {
          setRefProperty(val?.payload);
        } else {
          setRefProperty({});
        }
      });
    } else {
      setRefProperty({});
    }
  }, [router?.query && router.isReady, messagesByUserIdsData]);

  useEffect(() => {
    if (
      messagesByUserIdsData?.referenceProjects?.[0] ||
      router?.query?.project_ref_id
    ) {
      // will change it when imlement projects
      dispatch(
        fetchProjectById(
          messagesByUserIdsData?.referenceProjects?.[0] ||
            router?.query?.project_ref_id
        )
      ).then((val) => {
        if (val?.payload?._id) {
          setRefProject(val?.payload);
        } else {
          setRefProject({});
        }
      });
    } else {
      setRefProject({});
    }
  }, [router?.query && router.isReady, messagesByUserIdsData]);

  const handleMsgSend = () => {
    if (text) {
      const isUserInInbox = userInbox?.inboxUsers?.find(
        (u) => u?._id === router?.query?.user_id
      );
      let data = {
        sender: user?.id,
        receiver: router?.query?.user_id,
        message: text,
        timestamp: new Date().getTime(),
      };
      if (!messagesByUserIdsData?.referencePrperties?.[0] && refProperty?._id) {
        data.referencePrperties = refProperty?.property?._id;
      }
      if (!messagesByUserIdsData?.referenceProjects?.[0] && refProject?._id) {
        data.referenceProjects = refProject?._id;
      }
      dispatch(postMessage(data)).then((d) => {
        dispatch(
          messagesByUserIds({ user1: user?.id, user2: router?.query?.user_id })
        );
        setText("");
        if (!isUserInInbox) {
          dispatch(getUserInbox(user?.id));
        }
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMsgSend();
    }
  };

  return (
    <div className={classes.single_chat_section_container}>
      {router?.query?.user_id ? (
        <>
          <div className={classes.chat_section} ref={scrollRef}>
            {refProperty?._id && <CHATCard data={refProperty} />}
            {refProject?._id && <ProjectCHATCard data={refProject} />}

            {/* <div className={classes.date_container}>
              <p>Today, May 13th</p>
            </div> */}

            {messagesByUserIdsData?.messages?.length > 0 &&
              messagesByUserIdsData?.messages?.map((m, index) => {
                let isOwnMsg = m?.sender?._id === user?.id;
                let showProfile = true;
                let showTimestamp = true;

                // Check if it's not the first message and the sender is the same as the previous one
                if (
                  index > 0 &&
                  m?.sender?._id ===
                    messagesByUserIdsData?.messages[index - 1]?.sender?._id
                ) {
                  showProfile = false;
                }

                // Check if it's not the first message and the date is the same as the previous one
                if (
                  index > 0 &&
                  new Date(m.timestamp).toDateString() ===
                    new Date(
                      messagesByUserIdsData?.messages[index - 1]?.timestamp
                    ).toDateString()
                ) {
                  showTimestamp = false;
                }

                return (
                  <div
                    key={`message-${m?._id}`}
                    className={`${
                      isOwnMsg
                        ? classes.msg_left_container
                        : classes.msg_right_container
                    }`}
                  >
                    {showTimestamp && (
                      <div
                        style={{
                          textAlign: "center",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className={classes.date_container}>
                          {new Date(m.timestamp).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    )}
                    {showProfile && (
                      <div className={classes.message_profile}>
                        <div
                          className={classes.message_profile_picture}
                          style={{
                            background: `url(${
                              m?.sender?.picture ||
                              "/assets/agency-detail/staff.jpeg"
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className={classes.message_profile_name_section}>
                          <h3 className={classes.message_name}>
                            {m?.sender?.username}
                          </h3>
                          <p className={classes.message_name_title}>
                            {showUsersType(m?.sender?.type) || "User"}
                          </p>
                        </div>
                      </div>
                    )}
                    <div
                      className={`${
                        isOwnMsg
                          ? classes.right_msg_container
                          : classes.left_msg_container
                      }`}
                    >
                      <p>{m?.message}</p>
                    </div>
                  </div>
                );
              })}

            <br />
          </div>
          <div className={classes.message_typewriter_area}>
            <div className={classes.message_section}>
              <textarea
                placeholder="Write a message here.."
                className={classes.msg_input_field}
                onChange={(e) => setText(e.target?.value)}
                value={text}
                onKeyDown={handleKeyPress}
              />
              <div className={classes.btns_container}>
                <div
                  className={`${classes.user_btns} ${classes.mesasage_user_btns}`}
                >
                  {/* <span>{svg_chat_file}</span>
                  <span>{svg_chat_mic}</span> */}
                  {width > 375 && (
                    <div className={classes.send_btn} onClick={handleMsgSend}>
                      <p>Send</p>
                      {svg_chat_msg_send}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {width < 376 && (
              <div className={classes.send_btn} onClick={handleMsgSend}>
                <p>Send</p>
                {svg_chat_msg_send}
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {svg_site_logo_primary}
          <p className={classes.Select_para}>Select chat to get started</p>
        </div>
      )}
    </div>
  );
};

export default My_chats;
