import React from "react";
import { svg_blog_search } from "../../public/Svgs";
import profile_img from "../../public/assets/blog/image5.png";
import Image from "next/image";
import { BLOG_CARDS_DATA, BLOG_CARDS_DATA3 } from "../../data";
import Next from "../../public/assets/icons/right_arrow.svg";
import Prev from "../../public/assets/icons/left_arrow.svg";
import { Pagination } from "antd";
import Coming_soon from "../../components/coming-soon";
const Blog = () => {
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image src={Prev} width={36} height={36} />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <Image src={Next} width={36} height={36} />
        </a>
      );
    }
    return originalElement;
  };
  return (
    <div className="blog__page_container">
      <Coming_soon />
      <div className="blog_banner">
        <div className="banner_overlay">
          <div className="banner_content">Blogs</div>
        </div>
      </div>
      <div className="blogs_tags_container">
        <div className="tag tag_active">Real Estate Trends</div>
        <div className="tag">Laws and Taxes</div>
        <div className="tag">Home Decor</div>
        <div className="tag">Lifestyle</div>
        <div className="tags_search">
          <input type="text" placeholder="Search blog here..." />
          {svg_blog_search}
        </div>
      </div>
      <div className="discover_more_container">
        <div className="discover_more_content">
          <div className="btns_tags_container">
            <button>Featured</button>
            <button>Real Estate Trends</button>
            <button>June 24, 2023 | 11:45 am</button>
          </div>
          <div className="para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </div>
          <div className="discover_btn_container">
            <button>Discover More</button>
            <span>5 Min Read</span>
          </div>
        </div>
        <div className="discover_profile">
          <Image src={profile_img} alt="profil_img" />
          <p>
            Smith Wall <span>Builder </span>
          </p>
        </div>
      </div>
      <div className="blog_ad" />
      <div className="blog_cards_container">
        <div className="blogs_card_content">
          {BLOG_CARDS_DATA.map((e) => {
            return (
              <div className="cards_content" key={e.id}>
                <Image className="cardImg" src={e.Cimg} alt="cardImg1" />
                <div className="content_btns">
                  <button>Real Estate Trends</button>
                  <button>June 24, 2023 | 11:45 am</button>
                </div>
                <div className="text_content">{e.para}</div>
                <div
                  className="discover_profile"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Image src={profile_img} alt="profil_img" />
                  <p style={{ color: "#004439" }}>
                    Smith Wall{" "}
                    <span style={{ color: "#151515", opacity: 0.5 }}>
                      Builder{" "}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="blog_ad" />
      <div className="blog_cards_container">
        <div className="blogs_card_content">
          {BLOG_CARDS_DATA.map((e) => {
            return (
              <div className="cards_content" key={e.id}>
                <Image className="cardImg" src={e.Cimg} alt="cardImg1" />
                <div className="content_btns">
                  <button>Real Estate Trends</button>
                  <button>June 24, 2023 | 11:45 am</button>
                </div>
                <div className="text_content">{e.para}</div>
                <div
                  className="discover_profile"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Image src={profile_img} alt="profil_img" />
                  <p style={{ color: "#004439" }}>
                    Smith Wall{" "}
                    <span style={{ color: "#151515", opacity: 0.5 }}>
                      Builder{" "}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="blog_ad" />
      <div className="blog_cards_container">
        <div className="blogs_card_content">
          {BLOG_CARDS_DATA3.map((e) => {
            return (
              <div className="cards_content" key={e.id}>
                <Image className="cardImg" src={e.Cimg} alt="cardImg1" />
                <div className="content_btns">
                  <button>Real Estate Trends</button>
                  <button>June 24, 2023 | 11:45 am</button>
                </div>
                <div className="text_content">{e.para}</div>
                <div
                  className="discover_profile"
                  style={{ justifyContent: "flex-start" }}
                >
                  <Image src={profile_img} alt="profil_img" />
                  <p style={{ color: "#004439" }}>
                    Smith Wall{" "}
                    <span style={{ color: "#151515", opacity: 0.5 }}>
                      Builder{" "}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="blog_cards_num_container">
        <Pagination
          showSizeChanger={false}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          total={200}
          itemRender={itemRender}
        />
      </div>
      <div className="blog_ad" />
      <div className="blog_newsletter_container">
        <h3>Newsletter</h3>
        <p className="letter_para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          rhoncus.
        </p>
        <div className="input_container">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <label className="update_me_check ">
          <input type="checkbox" name="UpdateMe" />
          <p>Update me everytime.</p>
        </label>
      </div>
    </div>
  );
};

export default Blog;
