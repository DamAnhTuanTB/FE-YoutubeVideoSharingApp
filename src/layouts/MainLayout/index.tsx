import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import AppContext from "../../contexts";
import { authService } from "../../services/authService";
import { getCookie } from "../../utils/cookies";
import { Content, Wrapper } from "./style";

export default function MainLayout() {
  const appContext = useContext(AppContext);
  useEffect(() => {
    if (getCookie("token")) {
      authService.getProfile().then((data) => {
        if (data?.data) {
          appContext?.setUser(data?.data);
        }
      });
    }
  }, []);
  return (
    <Wrapper>
      <Header />
      <Content data-testid="content-element">
        <Outlet />
      </Content>
    </Wrapper>
  );
}
