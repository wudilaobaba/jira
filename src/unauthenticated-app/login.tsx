import { FormEvent } from "react";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { user, login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止默认行为
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    try {
      // 登录
      const result = await login({ username, password });
      console.log(result);

      // 注册
      // const rg = await register({ username, password });
      // console.log(rg);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{user?.name}</h1>
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
