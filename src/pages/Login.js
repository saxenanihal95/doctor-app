import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from "../utils/helpers";

export default function Login() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const user = localStorage.getItem(values.email);
    if (user) {
      const existingUser = JSON.parse(user);
      if (existingUser.password === values.password) {
        // Login
      } else {
        openNotificationWithIcon({
          type: "error",
          message: "please check the provided creditials again",
        });
      }
    } else {
      openNotificationWithIcon({
        type: "error",
        message: "please check the provided creditials again",
      });
    }
  };
  return (
    <div className="LoginContainer">
      <div className="FormContainer">
        <Form name="normal_login" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
