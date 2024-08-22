import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../redux/request";

const User = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/property`);
      console.log(res);

      const transformedData = res.data.data.map((item) => ({
        key: item._id,
        contactPerson: item.property.contactPerson,
        email: item.property.email,
        status: item.property.status,
        type: item.property.user.type,
        subtype: item.property.subtype,
        installmentAvailable: item.property.installmentAvailable ? "Yes" : "No",
        possessionStatus: item.property.possessionStatus ? "Yes" : "No",
        availableFrom: new Date(
          item.property.availableFrom
        ).toLocaleDateString(),
        address: item.property.location,
        image: item.property.images[0],
        price: item.property.price,
        priceUnit: item.property.priceUnit,
        minimumContractPeriod: item.property.minimumContractPeriod,
        monthlyRent: item.property.monthlyRent,
        areaSize: item.property.areaSize,
        areaSizeUnit: item.property.areaSizeUnit,
        listingExpiry: item.property.listingExpiry,
        geoLocation: `${item.property.geoLocation.coordinates[0]}, ${item.property.geoLocation.coordinates[1]}`,
        title: item.property.title,
        description: item.property.description,
        createdAt: new Date(item.property.createdAt).toLocaleDateString(),
        updatedAt: new Date(item.property.updatedAt).toLocaleDateString(),
      }));
      setUser(transformedData); // Update the state with transformed data
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUser(); // Fetch user data when component mounts
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
          style={{ width: "90px", height: "70px", objectFit: "cover" }} // Adjust size as needed
        />
      ),
    },
    {
      title: " Person",
      dataIndex: "contactPerson",
      render: (text) => (
        <p style={{ width: 120 }} className="">
          {text}
        </p>
      ),
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
      title: "Available From",
      dataIndex: "availableFrom",
      render: (text) => (
        <p style={{ width: 120 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => (
        <p style={{ width: 300 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Area Size",
      dataIndex: "areaSize",
      key: "areaSize",
    },
    {
      title: "Area Size",
      dataIndex: "areaSizeUnit",
      render: (text) => (
        <p style={{ width: 80 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Listing Expiry",
      dataIndex: "listingExpiry",
      render: (text) => (
        <p style={{ width: 100 }} className="">
          {text}
        </p>
      ),
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
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => (
        <p style={{ width: 80 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (text) => (
        <p style={{ width: 80 }} className="">
          {text}
        </p>
      ),
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  return (
    <div className="my_orders_section property">
      <div className="overlay" />
      <h3 className="mob_heading d_none">My Orders</h3>
      <div className="orders_content_container property_content_container">
        <Table
          pagination={tableParams.pagination}
          dataSource={user}
          columns={columns}
          style={{ width: "100%", overflow: "hidden" }}
          className="userTable"
          rowKey="key" // Unique key for each row
        />
      </div>
    </div>
  );
};

export default User;
