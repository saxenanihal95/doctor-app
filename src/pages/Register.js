import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { openNotificationWithIcon } from "../utils/helpers";
import "./Register.css";

export default function Register() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { email } = values;
    console.log("Received values of form: ", values);
    localStorage.setItem(email, JSON.stringify(values));
    openNotificationWithIcon({
      type: "success",
      message: "Registered Successfully, you can now login",
    });
  };

  return (
    <div className="RegisterContainer">
      <div className="FormContainer">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
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
            <Input placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
