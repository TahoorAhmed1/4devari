import React, { useEffect } from "react";
import classes from "./login.module.css";
import lower_image from "../../public/assets/login-assets/artwork.png";

import clouds from "../../public/assets/login-assets/clouds.png";
import AuthPanel from "../../components/login/auth-panel/index";
import { useAuth } from "../../contextApi";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useWindowSize } from "../../utils";
import lower_cloud1 from "../../public/assets/login-assets/lower_clouds1.png";
import lower_cloud2 from "../../public/assets/login-assets/lower_clouds2.png";
import { BASE_URL } from "../../redux/request";
import { message } from "antd";

function Login(props) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  useEffect(() =>{
    if(props?.isVerificationErr){
      message.error("Verification failed");
      router.replace('/login');
    }else if (props?.isVerified) {
      message.success("Verification completed");
      router.replace('/login');
    }
  },[])
  const width = useWindowSize().width;

  return (
    <div className={classes.login_container}>
      <img src={clouds.src} className={classes.clouds} />
      <div className={classes.login_content}>
        <AuthPanel defaultActivePage="login" />
        <div className={classes.text_container}>
          <h2>
            Discover the Best Properties in <span>Pakistan</span> with{" "}
            <span>4Devari.com {}</span>
          </h2>
        </div>
      </div>
      <div className={classes.lower_img_wrapper}>
        {width > 1023 ? (
          <>
            <img src={lower_image.src} className={classes.lower_img} />

            <div className={classes.img_background}>
              <img src={lower_cloud1.src} className={classes.lower_cloud1} />
              <img src={lower_cloud2.src} className={classes.lower_cloud2} />

              <p>© Copyright 2023 4Devari.com. All Rights Reserved</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={classes.img_container}
              style={{
                backgroundImage: `url(${lower_image.src})`,
              }}
            ></div>
            <div className={classes.img_background}>
              <img src={lower_cloud1.src} className={classes.lower_cloud1} />
              <img src={lower_cloud2.src} className={classes.lower_cloud2} />

              <p>© Copyright 2023 4Devari.com. All Rights Reserved</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res , query }) {
  const isUser = getCookie("user", { req, res });
  const isConfirmationCode = query?.confirmationCode;

  if (isUser) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  } else {
    if(isConfirmationCode){
      try {
        const res = await fetch(`${BASE_URL}/user/verifyUser?confirmationCode=${isConfirmationCode}`,{
          method: 'PATCH',
        });

        if(res.ok){
          return {
            props: {
              isVerified: true,
            }
          };
        }else{
          return {
            props: {
              isVerificationErr: true,
            }
          };
        } 
        
      } catch (error) {
        return {
          props: {
            isVerificationErr: true,
          },
        };
      }
    }
    return {
      props: {},
    };
  }
}

export default Login;
