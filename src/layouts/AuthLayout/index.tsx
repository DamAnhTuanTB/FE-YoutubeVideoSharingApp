import { Navigate, Outlet } from "react-router";
import { ROUTES } from "../../routes/routes";
import { getCookie } from "../../utils/cookies";
import { Content } from "./style";

export default function AuthLayout() {
  return !!getCookie("token") ? (
    <Navigate to={ROUTES.LIST_SHARED_VIDEOS} />
  ) : (
    <Content data-testid="content-auth-layout">
      <Outlet />
    </Content>
  );
}
