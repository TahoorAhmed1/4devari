import React from "react";
import classes from "./footer.module.css";
import bg from "../../public/assets/component-assets/footer-assets/bg.png";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
function Footer() {
  const cities = [
    {
      label: "Islamabad",
      link: "/buy/residential?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356",
    },
    {
      label: "Lahore",
      link: "/buy/residential?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462",
    },
    {
      label: "Karachi",
      link: "/buy/residential?lng=67.0011364&lat=24.8607343&radius=70.80875090113182",
    },
    {
      label: "Rawalpindi",
      link: "/buy/residential?lng=73.0169135&lat=33.5651107&radius=16.583152964339543",
    },
    {
      label: "Faislabad",
      link: "/buy/residential?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485",
    },
    {
      label: "Multan",
      link: "/buy/residential?lng=71.5249154&lat=30.157458&radius=21.832574474123714",
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.picture_container}>
        <Image className={classes.bg} src={bg} />
      </div>
      <div className={classes.footer_body}>
        <div className={classes.footer_content}>
          {/* Blogs, News, Forum, Real Estate Agents, Add property  */}
          <div className={classes.col}>
            <h2>Company</h2>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            {/* <p>Terms of Use</p> */}
            {/* <p>Privacy Policy</p> */}
            <p>Advertise with 4Devari.com</p>
            {/* <p>Jobs at 4Devari.com</p> */}
          </div>

          <div className={classes.col}>
            <h2>Connect</h2>
            <Link href="/blog">Blogs</Link>
            {/* <p>News</p> */}
            {/* <p>Forums</p> */}
            <Link href={"/agency"} className={classes.real_estate}>
              Real Estate Agents
            </Link>
            <Link href={"/dashboard/user/add-property"}>Add property</Link>
          </div>

          <div className={classes.col}>
            <h2>Cities</h2>
            {cities.map((c, i) => (
              <p key={`footer-cities-${i}`} onClick={() => Router.push(c.link)}>
                {c.label}
              </p>
            ))}
          </div>
          <div className={classes.col}>
            <h2>Head Office</h2>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.54 22.351L11.61 22.391L11.638 22.407C11.749 22.467 11.8733 22.4985 11.9995 22.4985C12.1257 22.4985 12.25 22.467 12.361 22.407L12.389 22.392L12.46 22.351C12.8511 22.1191 13.2328 21.8716 13.604 21.609C14.5651 20.9305 15.463 20.1667 16.287 19.327C18.231 17.337 20.25 14.347 20.25 10.5C20.25 8.31196 19.3808 6.21354 17.8336 4.66637C16.2865 3.11919 14.188 2.25 12 2.25C9.81196 2.25 7.71354 3.11919 6.16637 4.66637C4.61919 6.21354 3.75 8.31196 3.75 10.5C3.75 14.346 5.77 17.337 7.713 19.327C8.53664 20.1667 9.43427 20.9304 10.395 21.609C10.7666 21.8716 11.1485 22.1191 11.54 22.351ZM12 13.5C12.7956 13.5 13.5587 13.1839 14.1213 12.6213C14.6839 12.0587 15 11.2956 15 10.5C15 9.70435 14.6839 8.94129 14.1213 8.37868C13.5587 7.81607 12.7956 7.5 12 7.5C11.2044 7.5 10.4413 7.81607 9.87868 8.37868C9.31607 8.94129 9 9.70435 9 10.5C9 11.2956 9.31607 12.0587 9.87868 12.6213C10.4413 13.1839 11.2044 13.5 12 13.5Z"
                  fill="#004439"
                />
              </svg>{" "}
              <p style={{ cursor: "auto" }}>
                {" "}
                9621 Oak Meadow Street Patchogue, NY 11772
              </p>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.77199 2.43881L8.84799 2.09481C9.85699 1.77281 10.935 2.29381 11.367 3.31181L12.227 5.33981C12.601 6.22281 12.393 7.26181 11.713 7.90781L9.81799 9.70581C9.93499 10.7818 10.297 11.8408 10.903 12.8828C11.4785 13.8909 12.2504 14.7734 13.173 15.4778L15.449 14.7178C16.311 14.4308 17.251 14.7618 17.779 15.5388L19.012 17.3488C19.627 18.2528 19.516 19.4988 18.753 20.2648L17.936 21.0858C17.122 21.9028 15.959 22.1998 14.884 21.8638C12.344 21.0718 10.011 18.7208 7.88099 14.8108C5.74799 10.8948 4.99499 7.57081 5.62299 4.84281C5.88699 3.69481 6.70399 2.77981 7.77199 2.43881Z"
                  fill="#004439"
                />
              </svg>{" "}
              <a href="tel:+923333215657">+92 333 3215657</a>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H19C19.7956 20 20.5587 19.6839 21.1213 19.1213C21.6839 18.5587 22 17.7956 22 17V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM18.33 6L12 10.75L5.67 6H18.33ZM19 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V7.25L11.4 12.8C11.5731 12.9298 11.7836 13 12 13C12.2164 13 12.4269 12.9298 12.6 12.8L20 7.25V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18Z"
                  fill="#004439"
                />
              </svg>
              <a href="mailto:abc.gmail.com">Email Us</a>
            </span>
          </div>
          <div className={classes.col}>
            <h2>Get Connected</h2>
            <Link href="https://www.facebook.com" target="_blank">
              Facebook
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              Twitter
            </Link>
            <Link href="https://www.linkedin.com" target="_blank">
              Linkedin
            </Link>
            <Link href="https://www.instagram.com" target="_blank">
              Instagram
            </Link>
            <Link href="https://www.youtube.com" target="_blank">
              Youtube
            </Link>
          </div>
        </div>
        <div className={classes.copyWrite_container}>
          <div className={classes.copy_content}>
            <p>© Copyright 2023 4Devari.com. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
