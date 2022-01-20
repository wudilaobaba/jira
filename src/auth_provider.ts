import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";
export const getToken = (): string | null =>
  window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (param: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  const result = await response.json();
  if (response.ok) {
    return handleUserResponse(result);
  } else {
    return Promise.reject(result);
  }
};

export const register = async (param: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param),
  });
  const result = await response.json();
  if (response.ok) {
    return handleUserResponse(result);
  } else {
    return Promise.reject(result);
  }
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
