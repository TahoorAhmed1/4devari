import React, { useEffect } from "react";
import classes from "./signup.module.css";
import lower_image_signup from "../../public/assets/login-assets/artwork_signup1.png";

import clouds from "../../public/assets/login-assets/clouds.png";
import AuthPanel from "../../components/login/auth-panel/index";
import { useAuth } from "../../contextApi";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useWindowSize } from "../../utils";
import lower_cloud1_signup from "../../public/assets/login-assets/lower_cloud1_signup.png";
import lower_cloud2_signup from "../../public/assets/login-assets/lower_cloud2_signup.png";

function SignUp() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);
  const width = useWindowSize().width;

  return (
    <div className={classes.signUp_container}>
      <img src={clouds.src} className={classes.clouds} />
      <div className={classes.login_content}>
        <AuthPanel defaultActivePage="signup" />

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
            <img src={lower_image_signup.src} className={classes.lower_img} />
            <div className={classes.img_background}>
              <>
                <img
                  className={classes.lower_cloud1}
                  src={lower_cloud1_signup.src}
                />
                <img
                  src={lower_cloud2_signup.src}
                  className={classes.lower_cloud2}
                />
              </>
              <p>© Copyright 2023 4Devari.com. All Rights Reserved</p>
            </div>
          </>
        ) : (
          <>
            <div
              className={classes.img_container}
              style={{
                backgroundImage: `url(${lower_image_signup.src})`,
              }}
            ></div>
            <div className={classes.img_background}>
              <>
                <img
                  className={classes.lower_cloud1}
                  src={lower_cloud1_signup.src}
                />
                <img
                  src={lower_cloud2_signup.src}
                  className={classes.lower_cloud2}
                />
              </>
              <p>© Copyright 2023 4Devari.com. All Rights Reserved</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const isUser = getCookie("user", { req, res });
  if (isUser) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default SignUp;
