import { FormEvent } from "react";
import qs from "qs";
import { cleanObject } from "../../utils";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const login = async (param: { username: string; password: string }) => {
    const response = await fetch(`${apiUrl}/login?`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止默认行为
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    await login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
