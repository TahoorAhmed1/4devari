import React, { useState, useEffect } from "react";
import classes from "./layout.module.css";
import Head from "next/head";
import Navbar from "../navbar";
import Footer from "../footer";
import { useRouter } from "next/router";
import { useAuth } from "../../contextApi";
import jwt_decode from "jwt-decode";
// import { useWindowSize } from "../../utils";

function Layout({ children }) {
  const router = useRouter();
  const { user, removeUser } = useAuth();
  // const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    if (router.pathname) {
      const page = router.pathname.split("/");
      setCurrentPage(page[1]);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (user) {
      const decoded = jwt_decode(user?.accessToken);
      const exp = new Date(decoded?.exp * 1000);
      const current = new Date();
      if (current > exp) {
        console.log("Logout Called");
        removeUser();
      }
    }
  })


  return (
    <div className={classes.container}>
      {/* Adds goes here */}
      {/* <h1>Hellooooooooooooooooooooo</h1> */}
      <>
        {currentPage === "" ? (
          <>
            <div className={classes.main}>{children}</div>
            <Footer />
          </>
        ) : currentPage === "dashboard" ? (
          <>
            <div className={classes.main}>{children}</div>
          </>
        ) : currentPage === "about" ? (
          <>
            <Navbar isTransparent={true} />
            <div className={classes.main}>{children}</div>
            <Footer />
          </>
        ) : currentPage === "contact" ? (
          <>
            <Navbar isTransparent={true} />
            <div className={classes.main}>{children}</div>
            <Footer />
          </>
        ) : currentPage === "buy" ||
          currentPage === "login" ||
          currentPage === "signup" ||
          currentPage === "reset" ? (
          <>
            <Navbar />
            <div className={classes.main}>{children}</div>
          </>
        ) : (
          <>
            <Navbar />
            <div className={classes.main}>
              {/* <div className={classes.coming_soon_overlay}>
                <h2>Coming Soon</h2>
              </div> */}
              {children}
            </div>
            <Footer />
          </>
        )}
      </>
    </div>
  );
}

export default Layout;
