import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { useState } from "react";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        去{isRegister ? "登录" : "注册"}
      </button>
    </>
  );
};
