import qs from "qs";
import { logout } from "../auth_provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

/**
 *
 * @param endPoint
 * @param data
 * @param token
 * @param others
 */
export const http = async (
  endPoint: string,
  { data, token, ...others }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...others,
  };
  if (config.method.toUpperCase() === "GET") {
    endPoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endPoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const result = await response.json();
      if (response.ok) {
        return result;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return async (...[endPoint, config]: Parameters<typeof http>) =>
    await http(endPoint, { ...config, token: user?.token });
};
