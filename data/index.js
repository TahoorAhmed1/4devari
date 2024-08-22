import {
  svg_about_info_launch,
  svg_about_info_logo,
  svg_about_info_mission,
  svg_about_info_research,
  svg_about_info_vision,
  svg_summary_clicks,
  svg_summary_lead1,
  svg_summary_lead2,
  svg_summary_lead3,
  svg_summary_lead4,
  svg_summary_lead5,
  svg_summary_list_1,
  svg_summary_list_2,
  svg_summary_list_3,
  svg_summary_list_4,
  svg_summary_list_5,
  svg_summary_list_6,
  svg_summary_status_below,
} from "../public/Svgs";
import about_card1 from "../public/assets/about/about_card1.jpg";
import about_card2 from "../public/assets/about/about_card2.jpg";
import about_card3 from "../public/assets/about/about_card3.png";
import about_card4 from "../public/assets/about/about_card4.png";
import about_card5 from "../public/assets/about/about_card3.png";
import cardImg from "../public/assets/blog/blog_card_img.png";
import builder_cardImg from "../public/assets/builder/card_img.png";
import agent_Img from "../public/assets/agency-detail/agency_profile_img.png";
import logoImg from "../public/assets/agency_search_output/agency_logo.png";
import { PURPOSE } from "../utils/constants";

export const MENU_DATA = [
  {
    id: 1,
    name: "Buy",
    child: [
      {
        is_child_dropdown: true,
        sub_name: "Residential",
        sub_child: [
          {
            sub_child_name: "Home",
            sub_child_link: "/residential/house",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Flat",
            sub_child_link: "/residential/flat",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Lower Portion",
            sub_child_link: "/residential//lower-portion",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Upper Portion",
            sub_child_link: "/residential/upper-portion",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Pent House",
            sub_child_link: "/residential/pent-house",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Basement",
            sub_child_link: "/residential/basement-house",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Farmhouse",
            sub_child_link: "/residential/farmhouse",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Hostel",
            sub_child_link: "/residential/hostel",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Guest House",
            sub_child_link: "/residential/guest-house",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Hotel Suit",
            sub_child_link: "/residential/hotel-suit",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Beach Hut",
            sub_child_link: "/residential/beach-hut",
            sub_purpose: PURPOSE.buy,
          },
        ],
      },
      {
        is_child_dropdown: true,
        sub_name: "Commerical",
        sub_child: [
          {
            sub_child_name: "Office",
            sub_child_link: "/commerical/office",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Shop",
            sub_child_link: "/commerical/shop",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Warehouse",
            sub_child_link: "/commerical/warehouse",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Factory",
            sub_child_link: "/commerical/factory",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Building",
            sub_child_link: "/commerical/building",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Others",
            sub_child_link: "/commerical/others",
            sub_purpose: PURPOSE.buy,
          },
        ],
      },
      {
        is_child_dropdown: true,
        sub_name: "Plots",
        sub_child: [
          {
            sub_child_name: "Residential Plots",
            sub_child_link: "/plot/residential-plot",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Commercial Plots",
            sub_child_link: "/plot/commercial-plot",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Agricultral Plots",
            sub_child_link: "/plot/agricultral-plot",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Factory",
            sub_child_link: "/plot/factory",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Building",
            sub_child_link: "/plot/building",
            sub_purpose: PURPOSE.buy,
          },
          {
            sub_child_name: "Others",
            sub_child_link: "/plot/others",
            sub_purpose: PURPOSE.buy,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Rent",
    child: [
      {
        is_child_dropdown: true,
        sub_name: "Residential",
        sub_child: [
          {
            sub_child_name: "Home",
            sub_child_link: "/residential/house",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Flat",
            sub_child_link: "/residential/flat",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Lower Portion",
            sub_child_link: "/residential//lower-portion",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Upper Portion",
            sub_child_link: "/residential/upper-portion",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Pent House",
            sub_child_link: "/residential/pent-house",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Basement",
            sub_child_link: "/residential/basement-house",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Farmhouse",
            sub_child_link: "/residential/farmhouse",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Hostel",
            sub_child_link: "/residential/hostel",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Guest House",
            sub_child_link: "/residential/guest-house",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Hotel Suit",
            sub_child_link: "/residential/hotel-suit",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Beach Hut",
            sub_child_link: "/residential/beach-hut",
            sub_purpose: PURPOSE.rent,
          },
        ],
      },
      {
        is_child_dropdown: true,
        sub_name: "Commerical",
        // sub_child: [
        //   {
        //     sub_child_name: "Home",
        //     sub_child_link: "/",
        //   },
        //   {
        //     sub_child_name: "Flat",
        //     sub_child_link: "/",
        //   },
        //   {
        //     sub_child_name: "Lower Portion",
        //     sub_child_link: "/",
        //   },
        // ],
        sub_child: [
          {
            sub_child_name: "Office",
            sub_child_link: "/commerical/office",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Shop",
            sub_child_link: "/commerical/shop",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Warehouse",
            sub_child_link: "/commerical/warehouse",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Factory",
            sub_child_link: "/commerical/factory",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Building",
            sub_child_link: "/commerical/building",
            sub_purpose: PURPOSE.rent,
          },
          {
            sub_child_name: "Others",
            sub_child_link: "/commerical/others",
            sub_purpose: PURPOSE.rent,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Shared Spaces",
    child: [
      {
        is_child_dropdown: true,
        sub_name: "Shared PG/Co-living",
        sub_child: [
          {
            sub_child_name: "Share a House",
            sub_child_link: "/house",
            // sub_purpose: `/shared/${PURPOSE.coworking}`,
            sub_purpose: `/shared/coliving/residential`,
          },
          {
            sub_child_name: "Share a Flat",
            sub_child_link: "/flat",
            sub_purpose: `/shared/coliving/residential`,
          },
          {
            sub_child_name: "Share a Hostel",
            sub_child_link: "/hostel",
            sub_purpose: `/shared/coliving/residential`,
          },
        ],
      },
      {
        is_child_dropdown: true,
        sub_name: "Co-Working",
        sub_child: [
          {
            sub_child_name: "Co-Working Spaces in Karachi",
            sub_child_link: "karachi",
            sub_purpose: `/shared/coworking?city=`,
          },
          {
            sub_child_name: "Co-Working Spaces in Lahore",
            sub_child_link: "lahore",
            sub_purpose: `/shared/coworking?city=`,
          },
          {
            sub_child_name: "Co-Working Spaces in Islamabad",
            sub_child_link: "islamabad",
            sub_purpose: `/shared/coworking?city=`,
          },
          {
            sub_child_name: "Co-Working Spaces in Rawalpindi",
            sub_child_link: "rawalpindi",
            sub_purpose: `/shared/coworking?city=`,
          },
          {
            sub_child_name: "Co-Working Spaces in Peshawar",
            sub_child_link: "peshawar",
            sub_purpose: `/shared/coworking?city=`,
          },
          {
            sub_child_name: "Co-Working Spaces in Multan",
            sub_child_link: "multan",
            sub_purpose: `/shared/coworking?city=`,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Invest",
    child: [
      {
        is_child_dropdown: false,
        sub_name: "Islamabad ",
        sub_link: "?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356&ftype=link",
        purpose: "/project/invest",
      },
      {
        is_child_dropdown: false,
        sub_name: "Lahore ",
        sub_link: "?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462&ftype=link",
        purpose: "/project/invest",
      },
      {
        is_child_dropdown: false,
        sub_name: "Karachi ",
        sub_link: "?lng=67.0011364&lat=24.8607343&radius=70.80875090113182&ftype=link",
        purpose: "/project/invest",
      },
      {
        is_child_dropdown: false,
        sub_name: "Rawalpindi ",
        sub_link: "?lng=73.0169135&lat=33.5651107&radius=16.583152964339543&ftype=link",
        purpose: "/project/invest",
      },
      {
        is_child_dropdown: false,
        sub_name: "Faisalabad ",
        sub_link: "?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485&ftype=link",
        purpose: "/project/invest",
      },
      {
        is_child_dropdown: false,
        sub_name: "Multan",
        sub_link: "?lng=71.5249154&lat=30.157458&radius=21.832574474123714&ftype=link",
        purpose: "/project/invest",
      },
    ],
  },
  {
    id: 5,
    name: "Wanted",
    child: [
      {
        is_child_dropdown: false,
        sub_name: "Islamabad ",
        sub_link: "?lng=73.04788479999999&lat=33.6844202&radius=33.500792551547356&ftype=link",
        purpose: "/buy/residential",
      },
      {
        is_child_dropdown: false,
        sub_name: "Lahore ",
        sub_link: "?lng=74.35874729999999&lat=31.5203696&radius=31.72357060620462&ftype=link",
        purpose: "/buy/residential",
      },
      {
        is_child_dropdown: false,
        sub_name: "Karachi ",
        sub_link: "?lng=67.0011364&lat=24.8607343&radius=70.80875090113182&ftype=link",
        purpose: "/buy/residential",
      },
      {
        is_child_dropdown: false,
        sub_name: "Rawalpindi ",
        sub_link: "?lng=73.0169135&lat=33.5651107&radius=16.583152964339543&ftype=link",
        purpose: "/buy/residential",
      },
      {
        is_child_dropdown: false,
        sub_name: "Faisalabad ",
        sub_link: "?lng=73.13496049999999&lat=31.45036619999999&radius=20.249017626191485&ftype=link",
        purpose: "/buy/residential",
      },
      {
        is_child_dropdown: false,
        sub_name: "Multan",
        sub_link: "?lng=71.5249154&lat=30.157458&radius=21.832574474123714&ftype=link",
        purpose: "/buy/residential",
      },
    ],
  },
];
export const DASHBOARD_MENU_DATA = [
  {
    id: 1,
    name: "Overview",
    isDropdown: false,
    link: "/dashboard/user/overview",
  },
  {
    id: 2,
    name: "Add Property",
    isDropdown: false,
    link: "/dashboard/user/add-property",
  },
  {
    id: 3,
    name: "My Listings",
    isDropdown: false,
    link: "/dashboard/user/my-listing",
  },
  {
    id: 4,
    name: "My Orders",
    isDropdown: false,
    link: "/dashboard/user/my-orders",
  },
  {
    id: 5,
    name: "My Reports",
    isDropdown: true,
    child: [
      {
        is_child_dropdown: false,
        sub_name: "Report Summary",
        link: "/dashboard/user/report_summary",
      },
      {
        is_child_dropdown: false,
        sub_name: "Report Reach",
        link: "/dashboard/user/report_reach",
      },
    ],
  },
  {
    id: 6,
    name: "4Devari Chats",
    link: "/dashboard/user/zilaay-chats",
    isDropdown: false,
  },
  {
    id: 7,
    name: "My Account Settings",
    isDropdown: false,
    link: "/dashboard/user/account-settings",
  },
  // {
  //   id: 8,
  //   name: "My Orders",
  //   link: "/dashboard/user/overview",
  //   isDropdown: false,
  // },
];
export const ABOUT_INFO_ELLIPCE_DATA = [
  {
    id: 1,
    Ptop: "10%",
    Head: "Welcom to 4Devari.com",
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta massa non laoreet fringilla. Praesent porttitor dapibus tortor, eget venenatis lectus tristique eu. Donec non magna id urna tempus ullamcorper.",
    icon: svg_about_info_logo,
  },
  {
    id: 2,
    Ptop: "30%",
    Head: "Our Vision",
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta massa non laoreet fringilla. Praesent porttitor dapibus tortor, eget venenatis lectus tristique eu. Donec non magna id urna tempus ullamcorper.",
    icon: svg_about_info_vision,
  },
  {
    id: 3,
    Ptop: "50%",
    Head: "Our Mission",
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta massa non laoreet fringilla. Praesent porttitor dapibus tortor, eget venenatis lectus tristique eu. Donec non magna id urna tempus ullamcorper.",
    icon: svg_about_info_mission,
  },
  {
    id: 4,
    Ptop: "70%",
    Head: "Research & Development",
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta massa non laoreet fringilla. Praesent porttitor dapibus tortor, eget venenatis lectus tristique eu. Donec non magna id urna tempus ullamcorper.",
    icon: svg_about_info_research,
  },
  {
    id: 5,
    Ptop: "90%",
    Head: "The Launch",
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta massa non laoreet fringilla. Praesent porttitor dapibus tortor, eget venenatis lectus tristique eu. Donec non magna id urna tempus ullamcorper.",
    icon: svg_about_info_launch,
  },
];
export const ABOUT_CARDS_DATA = [
  {
    id: 1,
    img: about_card1.src,
    para: "Area Unit Converter",
    btn: "Explore More",
    grdient:
      "linear-gradient(44deg, #116B87 0%, rgba(17, 107, 135, 0.00) 100%)",
  },
  {
    id: 2,
    img: about_card2.src,
    para: "Moving & Packaging",
    btn: "Explore More",
    grdient: "linear-gradient(44deg, #5A21D3 0%, rgba(90, 33, 211, 0.00) 100%)",
  },
  {
    id: 3,
    img: about_card3.src,
    para: "Rental Agreements",
    btn: "Explore More",
    grdient:
      " linear-gradient(44deg, #948962 0%, rgba(148, 137, 98, 0.00) 100%)",
  },
  {
    id: 4,
    img: about_card4.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient: "linear-gradient(44deg, #466724 0%, rgba(70, 103, 36, 0.00) 100%)",
  },
  {
    id: 5,
    img: about_card5.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient: "linear-gradient(44deg, #E83A3A 0%, rgba(232, 58, 58, 0.00) 100%)",
  },
  {
    id: 6,
    img: about_card1.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient:
      "linear-gradient(41.96deg, #719462 0.92%, rgba(113, 148, 98, 0) 100%)",
  },
  {
    id: 7,
    img: about_card1.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient:
      "linear-gradient(41.96deg, #719462 0.92%, rgba(113, 148, 98, 0) 100%)",
  },
];
export const CONTACT_CARDS_DATA = [
  {
    id: 1,
    img: about_card1.src,
    para: "Area Unit Converter",
    btn: "Explore More",
    grdient:
      "linear-gradient(44deg, #116B87 0%, rgba(17, 107, 135, 0.00) 100%)",
  },
  {
    id: 2,
    img: about_card2.src,
    para: "Moving & Packaging",
    btn: "Explore More",
    grdient: "linear-gradient(44deg, #5A21D3 0%, rgba(90, 33, 211, 0.00) 100%)",
  },
  {
    id: 3,
    img: about_card3.src,
    para: "Rental Agreements",
    btn: "Explore More",
    grdient:
      " linear-gradient(44deg, #948962 0%, rgba(148, 137, 98, 0.00) 100%)",
  },
  {
    id: 4,
    img: about_card4.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient: "linear-gradient(44deg, #466724 0%, rgba(70, 103, 36, 0.00) 100%)",
  },
  {
    id: 5,
    img: about_card5.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient: "linear-gradient(44deg, #E83A3A 0%, rgba(232, 58, 58, 0.00) 100%)",
  },
  {
    id: 6,
    img: about_card1.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient:
      "linear-gradient(41.96deg, #719462 0.92%, rgba(113, 148, 98, 0) 100%)",
  },
  {
    id: 7,
    img: about_card1.src,
    para: "4Devari Forum",
    btn: "Explore More",
    grdient:
      "linear-gradient(41.96deg, #719462 0.92%, rgba(113, 148, 98, 0) 100%)",
  },
];
export const BLOG_CARDS_DATA = [
  {
    id: 1,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 2,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 3,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 4,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 5,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 6,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
];
export const BLOG_CARDS_DATA3 = [
  {
    id: 1,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 2,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    id: 3,
    Cimg: cardImg,
    para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
];
export const BUILDER_CARDS_DATA = [
  {
    id: 1,
    img: builder_cardImg,
    head: "GFS Project in DHA Karachi",
    para: "DHA Phase 7 Extension DHA Defence",
    price: "PKR 45 Lac to 2 Crore",
  },
  {
    id: 2,
    img: builder_cardImg,
    head: "GFS Project in DHA Karachi",
    para: "DHA Phase 7 Extension DHA Defence",
    price: "PKR 45 Lac to 2 Crore",
  },
  {
    id: 3,
    img: builder_cardImg,
    head: "GFS Project in DHA Karachi",
    para: "DHA Phase 7 Extension DHA Defence",
    price: "PKR 45 Lac to 2 Crore",
  },
  {
    id: 4,
    img: builder_cardImg,
    head: "GFS Project in DHA Karachi",
    para: "DHA Phase 7 Extension DHA Defence",
    price: "PKR 45 Lac to 2 Crore",
  },
  {
    id: 5,
    img: builder_cardImg,
    head: "GFS Project in DHA Karachi",
    para: "DHA Phase 7 Extension DHA Defence",
    price: "PKR 45 Lac to 2 Crore",
  },
  {
    id: 6,
    img: builder_cardImg,
    head: "GFS Project in DHA Karachi",
    para: "DHA Phase 7 Extension DHA Defence",
    price: "PKR 45 Lac to 2 Crore",
  },
];

export const FAQ_DATA = [
  {
    id: "1",
    qna: "What are the benefits of listing my property on 4Devari.com?",
    ans: "4Devari.com is home to thousands of people looking to buy and rent properties, your property has a better chance of getting discovered by interested buyers and tenants from here than anywhere else. Listing your property on 4Devari.com is quite simple and does not take long.",
  },
  {
    id: "2",
    qna: "How do I search for a Property on 4Devari.com?",
    ans: "4Devari.com is home to thousands of people looking to buy and rent properties, your property has a better chance of getting discovered by interested buyers and tenants from here than anywhere else. Listing your property on 4Devari.com is quite simple and does not take long.",
  },
  {
    id: "3",
    qna: "What does a real estate agent do?",
    ans: "4Devari.com is home to thousands of people looking to buy and rent properties, your property has a better chance of getting discovered by interested buyers and tenants from here than anywhere else. Listing your property on 4Devari.com is quite simple and does not take long.",
  },
  {
    id: "4",
    qna: "Is Pakistan a good investment hub for buying property?",
    ans: "4Devari.com is home to thousands of people looking to buy and rent properties, your property has a better chance of getting discovered by interested buyers and tenants from here than anywhere else. Listing your property on 4Devari.com is quite simple and does not take long.",
  },
];
export const PRICE_LIST = [
  {
    id: 1,
    project_type: "2 Bed DD Flat",
    area_sqft: "1600",
    price: "70 Lac",
    floor: "6 - 9",
    number_units: "21",
  },
  {
    id: 2,
    project_type: "3 Bed DD Flat",
    area_sqft: "1900",
    price: "85 Lac",
    floor: "9 - 14",
    number_units: "18",
  },
  {
    id: 3,
    project_type: "4 Bed DD Flat",
    area_sqft: "2500",
    price: "105 Lac",
    floor: "14 - 27",
    number_units: "8",
  },
];
export const AGENCY_DETAIL = [
  {
    id: 1,
    total_active_listings: "100",
    service_area: "Karachi",
    experience_years: "10",
    property_types: "Rent, Sale, PG, Co-Worker",
    agency_address: "DHA Phase 7 Extension, Karachi, Pakistan",
  },
];
export const AGENT_CARDS = [
  {
    id: 1,
    agent_name: "Agent Name",
    total_active_listing: "15",
    img: `${agent_Img.src}`,
  },
  {
    id: 2,
    agent_name: "Agent Name",
    total_active_listing: "15",
    img: `${agent_Img.src}`,
  },
  {
    id: 3,
    agent_name: "Agent Name",
    total_active_listing: "15",
    img: `${agent_Img.src}`,
  },
  {
    id: 4,
    agent_name: "Agent Name",
    total_active_listing: "15",
    img: `${agent_Img.src}`,
  },
  {
    id: 5,
    agent_name: "Agent Name",
    total_active_listing: "15",
    img: `${agent_Img.src}`,
  },
  {
    id: 6,
    agent_name: "Agent Name",
    total_active_listing: "15",
    img: `${agent_Img.src}`,
  },
];
export const PROPERTISE_CARDS_DATA = [
  {
    id: 1,
    img: builder_cardImg,
    head: "Musa Garden House",
    city: "Lahore, Batapur",
    property_id: "3289471",
    price: "56 Lakh",
  },
  {
    id: 2,
    img: builder_cardImg,
    head: "Musa Garden House",
    city: "Lahore, Batapur",
    property_id: "3289471",
    price: "56 Lakh",
  },
  {
    id: 3,
    img: builder_cardImg,
    head: "Musa Garden House",
    city: "Lahore, Batapur",
    property_id: "3289471",
    price: "56 Lakh",
  },
  {
    id: 4,
    img: builder_cardImg,
    head: "Musa Garden House",
    city: "Lahore, Batapur",
    property_id: "3289471",
    price: "56 Lakh",
  },
  {
    id: 5,
    img: builder_cardImg,
    head: "Musa Garden House",
    city: "Lahore, Batapur",
    property_id: "3289471",
    price: "56 Lakh",
  },
  {
    id: 6,
    img: builder_cardImg,
    head: "Musa Garden House",
    city: "Lahore, Batapur",
    property_id: "3289471",
    price: "56 Lakh",
  },
];

export const INBOX_CHATS_LIST = [
  {
    id: 1,
    name: "Mike",
    name_title: "Agent",
    img_link: "/assets/zilaay-chats/chat_img.png",
  },
  {
    id: 2,
    name: "Mike",
    name_title: "Agent",
    img_link: "/assets/zilaay-chats/chat_img.png",
  },
  {
    id: 3,
    name: "Mike",
    name_title: "Agent",
    img_link: "/assets/zilaay-chats/chat_img.png",
  },
  {
    id: 4,
    name: "Mike",
    name_title: "Agent",
    img_link: "/assets/zilaay-chats/chat_img.png",
  },
  {
    id: 5,
    name: "Mike",
    name_title: "Agent",
    img_link: "/assets/zilaay-chats/chat_img.png",
  },
  {
    id: 6,
    name: "Mike",
    name_title: "Agent",
    img_link: "/assets/zilaay-chats/chat_img.png",
  },
];
export const Summary_List_Data = [
  {
    id: 1,
    icon: svg_summary_list_1,
    num: "388",
    line: "Total Listings",
    grdient: " linear-gradient(#004439, #0044b2)",
  },
  {
    id: 2,
    icon: svg_summary_list_2,
    num: "312",
    line: "For Sale",
    grdient: " linear-gradient(#8758E7, #5E30BD)",
  },
  {
    id: 3,
    icon: svg_summary_list_3,
    num: "325",
    line: "For Rent",
    grdient: " linear-gradient(#629D60, #276325)",
  },
  {
    id: 4,
    icon: svg_summary_list_4,
    num: "234",
    line: "PG / Shared Living",
    grdient: " linear-gradient(#FC8165, #D45948)",
  },
  {
    id: 5,
    icon: svg_summary_list_5,
    num: "435",
    line: "Co-Working",
    grdient: " linear-gradient(#48C0D8, #21869A)",
  },
  {
    id: 6,
    icon: svg_summary_list_6,
    num: "536",
    line: "Hot",
    grdient: " linear-gradient(#E83A3A, #B41D1D)",
  },
];

export const SUMMARY_ANALYTICS = [
  {
    id: 1,
    icon: svg_summary_lead1,
    num: "12",
    word: "Leads",
  },
  {
    id: 2,
    icon: svg_summary_lead2,
    num: "123",
    word: "Reach",
  },
  {
    id: 3,
    icon: svg_summary_lead3,
    num: "121",
    word: "Whatsapp",
  },
  {
    id: 4,
    icon: svg_summary_lead4,
    num: "443",
    word: "4DevariChat",
  },
  {
    id: 5,
    icon: svg_summary_lead5,
    num: "10",
    word: "Emails",
  },
];
export const REACH_ANALYTICS = [
  {
    id: 1,
    icon: svg_summary_lead2,
    num: "123",
    word: "Reach",
    status: "0.00",
    status_icon: svg_summary_status_below,
    IsStatus: true,
  },
  {
    id: 2,
    icon: svg_summary_lead2,
    num: "121",
    word: "Views",
    status: "0.00",
    status_icon: svg_summary_status_below,
    IsStatus: true,
  },
  {
    id: 3,
    icon: svg_summary_clicks,
    num: "443",
    word: "Clicks",
    status: "0.00",
    status_icon: svg_summary_status_below,
    IsStatus: true,
  },
  {
    id: 4,
    icon: svg_summary_lead2,
    num: "10",
    word: "Click through Rate",
    status: "0.00",
    status_icon: svg_summary_status_below,
    IsStatus: false,
  },
];
export const OUTPUT_AGENCY_CARD = [
  {
    id: 1,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 2,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 3,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate Agency Lahore",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 4,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 5,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 6,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 7,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 8,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
  {
    id: 9,
    agency_bg: "/assets/agency_search_output/cardImg1.png",
    agency_logo: logoImg,
    agency_name: "Zamil Real Estate",
    no_property_sale: "125",
    no_property_rent: "50",
    number: "03445656438",
    location: "Bahria, Karachi",
  },
];
