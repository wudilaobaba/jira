import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { useState } from "react";
import { Button, Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button type={"primary"} onClick={() => setIsRegister(!isRegister)}>
          去{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};
