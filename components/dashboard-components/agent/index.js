import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getAllAgent } from "../../../api/auth/auth";
const Agent = () => {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    let data = await getAllAgent();

    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, []);

  const columns = [
    {
      title: "index",
      render: (text, record, index) => <p className="">{index + 1}</p>,
    },
    {
      title: "username",
      dataIndex: "username",

      render: (text, record, index) => (
        <p style={{ width: 200 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record, index) => (
        <p style={{ width: 300 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => (
        <p style={{ width: 100 }} className="">
          {text}
        </p>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record, index) => (
        <p style={{ width: 100 }} className="">
          {text}
        </p>
      ),
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
          style={{ width: "100%" }}
          className="userTable"
        />
      </div>
    </div>
  );
};

export default Agent;
