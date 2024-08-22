import React, { useState } from "react";
import account_settings from "../../../../public/assets/dashboard/account-settings.svg";
import add_property from "../../../../public/assets/dashboard/add-property.svg";
import my_activity from "../../../../public/assets/dashboard/my-activity.svg";
import my_listing from "../../../../public/assets/dashboard/my-listings.svg";
import my_orders from "../../../../public/assets/dashboard/my-orders.svg";
import overview from "../../../../public/assets/dashboard/overview.svg";
import zilaay_chats from "../../../../public/assets/dashboard/zilaay-chats.svg";
import account_settings_blue from "../../../../public/assets/dashboard/account_settings_blue.svg";
import add_property_blue from "../../../../public/assets/dashboard/add_property_blue.svg";
import my_activity_blue from "../../../../public/assets/dashboard/my_activity_blue.svg";
import my_listings_blue from "../../../../public/assets/dashboard/my_listings_blue.svg";
import my_orders_blue from "../../../../public/assets/dashboard/my_orders_blue.svg";
import overview_blue from "../../../../public/assets/dashboard/overview_blue.svg";
import zilaay_chats_blue from "../../../../public/assets/dashboard/zilaay_chats_blue.svg";
import Inbox from "../../../../components/dashboard-components/inbox/inbox";
import AddProperty from "../../../../components/dashboard-components/builder/add-property";
import Overview from "../../../../components/dashboard-components/overview";
import AccountSetting from "../../../../components/dashboard-components/account-setting";
import Report_summary from "../../../../components/dashboard-components/reports/summary";
import { getCookie } from "cookies-next";
import { validatePageByUserRole } from "../../../../utils";
import Reach_reports from "../../../../components/dashboard-components/reports/report_reach";
import CommonDashboard from "../../../../components/dashboard-components/common-dashboard";
import BuilderAccountSetting from "../../../../components/dashboard-components/account-setting/builder";
import { useAuth } from "../../../../contextApi";
import MyListing from "../../../../components/dashboard-components/my-listing";
import MyOrders from "../../../../components/dashboard-components/my-orders";

function BuilderDashboard() {
  const [currentPage, setCurrentPage] = useState();
  const {user} = useAuth()
console.log("user",user)
  const menu_list = [
    {
      id: 1,
      name: "Overview",
      src: overview.src,
      src_2: my_listings_blue.src,
      link: "overview",
    },
    {
      id: 2,
      name: "Add Project",
      src: add_property.src,
      src_2: add_property_blue.src,
      link: "add-project",
    },
    {
      id: 3,
      name: "My Listing",
      src: my_listing.src,
      src_2: overview_blue.src,
      link: "my-listing",
    },
    // {
    //   id: 4,
    //   name: "My Activity",
    //   src: my_activity.src,
    //   src_2: my_activity_blue.src,
    //   link: "my-activity",
    // },
    {
      id: 5,
      name: "My Orders",
      src: my_orders.src,
      src_2: my_orders_blue.src,
      link: "my-orders",
    },
    {
      id: 6,
      name: "4Devari Chats",
      src: zilaay_chats.src,
      src_2: zilaay_chats_blue.src,
      link: "zilaay-chats",
    },
    {
      id: 7,
      name: "Reports",
      src: account_settings.src,
      src_2: account_settings_blue.src,
      link: "",
      sub_head: true,
      heading: [
        {
          sub_name: "Summary",
          sub_link: "report_summary",
        },
        {
          sub_name: "Reach Report",
          sub_link: "report_reach",
        },
      ],
    },
    {
      id: 8,
      name: "Account Settings",
      src: account_settings.src,
      src_2: account_settings_blue.src,
      link: "account-settings",
    },
  ];

  return (
    <CommonDashboard
      setCurrentPage={setCurrentPage}
      role="builder"
      menu_list={menu_list}
    >
      <>
        {currentPage === "overview" ? (
          <Overview />
        ) : currentPage === "add-project" ? (
          <AddProperty />
          // <EditProperty />
        ) : currentPage === "account-settings" ? (
          <BuilderAccountSetting />
        ) : currentPage === "report_summary" ? (
          <Report_summary />
        ) : currentPage === "my-listing" ? (
          <MyListing />
        ) : currentPage === "report_reach" ? (
          <Reach_reports />
        ) : currentPage === "my-orders" ? (
          <MyOrders />
        ) : (
          currentPage === "zilaay-chats" && <Inbox />
        )}
      </>
    </CommonDashboard>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const isUser = getCookie("user", { req, res });
  return validatePageByUserRole(isUser, "builder", query?.id);
}

export default BuilderDashboard;
