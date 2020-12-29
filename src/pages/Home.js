import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import patients from "../static/patients";
import Highlighter from "react-highlight-words";
import { createServer } from "miragejs";
import { Input, Table, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

let server = createServer();
server.get("/api/patients", {
  patients,
});

export default function Home() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });

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

  let searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender"),
    },
  ];

  const history = useHistory();

  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            // Navigate to patient details
            history.push(`/patient/${record.guid}`);
          }, // click row
        };
      }}
      dataSource={patients}
      columns={columns}
      loading={loading}
      rowKey={(record) => record.guid}
    />
  );
}
