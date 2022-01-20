import { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";

export const LoginScreen = () => {
  const { user, login } = useAuth();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // 参数与Form.Item的name属性值一一对应
    try {
      const result = await login(values);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <h1>{user?.name}</h1>
      <Form.Item
        name={"username"}
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input type="text" placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        <Input type="password" placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
