import { ProjectListScreen } from "screens/peoject-list";
import { useAuth } from "./context/auth-context";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <>
      <button onClick={logout}>退出登录</button>
      <ProjectListScreen />
    </>
  );
};
