import React, { useState, useEffect } from "react";
import "./Home.css";
import patients from "../static/patients";

import { createServer } from "miragejs";
import { Table } from "antd";

let server = createServer();
server.get("/api/patients", {
  patients,
});

export default function Home() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/patients")
      .then((res) => res.json())
      .then((json) => {
        setPatients(json.patients);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
  ];

  return <Table dataSource={patients} columns={columns} loading={loading} />;
}
