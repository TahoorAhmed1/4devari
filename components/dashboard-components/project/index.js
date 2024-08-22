import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../redux/request";
import Loader from "react-icons/ai";
const Project = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/project`);
      console.log(res);

      const transformedData = res.data.data.map((item) => ({
        key: item._id,
        contactPerson: item.contactPerson,
        email: item.email,
        status: item.status,
        type: item.user.type,
        city: item.city,
        location: item.location,
        bookingOrSiteOfficeAddress: item.bookingOrSiteOfficeAddress.join(", "),
        mapPin: JSON.parse(item.mapPin), // Parsing the stringified mapPin
        geoLocation: `${item.geoLocation.coordinates[1]}, ${item.geoLocation.coordinates[0]}`, // Reversing lat and lng for proper display
        price: item.price,
        description: item.description,
        image: item.images[0],
        videoLink: item.videoLink,
        videoTitle: item.videoTitle,
        videoHost: item.videoHost,
        landlineNumber: item.landlineNumber,
        mobileNumbers: item.mobileNumbers.join(", "),
        whatsapp: item.whatsapp,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
        updatedAt: new Date(item.updatedAt).toLocaleDateString(),
      }));

      setUser(transformedData); // Update the state with transformed data
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => (
        <img
          src={url}
          alt="Property"
          style={{ width: "100px", height: "auto", objectFit: "cover" }} // Adjust size as needed
        />
      ),
    },
    {
      title: "Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (text) => <p style={{ width: 120 }}>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (text) => <p style={{ width: 120 }}>{text}</p>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <p style={{ width: 300 }}>{text}</p>,
    },
    {
      title: "Address",
      dataIndex: "bookingOrSiteOfficeAddress",
      key: "bookingOrSiteOfficeAddress",
      render: (text) => <p style={{ width: 300 }}>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Geo Location",
      dataIndex: "geoLocation",
      key: "geoLocation",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p style={{ width: 200 }}>{text}</p>,
    },
    {
      title: "Landline Number",
      dataIndex: "landlineNumber",
      key: "landlineNumber",
      render: (text) => <p style={{ width: 150 }}>{text}</p>,
    },
    {
      title: "Mobile Numbers",
      dataIndex: "mobileNumbers",
      key: "mobileNumbers",
      render: (text) => <p style={{ width: 150 }}>{text}</p>,
    },
    {
      title: "WhatsApp",
      dataIndex: "whatsapp",
      key: "whatsapp",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <p style={{ width: 100 }}>{text}</p>,
    },
  ];

  return (
    <div className="my_orders_section">
      <div className="overlay" />
      <h3 className="mob_heading d_none">My Orders</h3>
      <div className="orders_content_container">
        <Table
          dataSource={user}
          columns={columns}
          style={{ width: "100%", overflowX: "hidden" }}
          className="userTable"
          rowKey="key" // Unique key for each row
        />
      </div>
    </div>
  );
};

export default Project;
