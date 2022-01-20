import { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Input, Form, Button } from "antd";

export const RegisterScreen = () => {
  const { user, register } = useAuth();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      // 注册
      const rg = await register(values);
      console.log(rg);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <h1>{user?.name}</h1>
      <Form.Item name={"username"}>
        <Input type="text" placeholder={"请输入username"} />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input type="password" placeholder={"请输入password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
