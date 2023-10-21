import { AxiosResponse } from "axios";
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
      authService.getProfile().then((res: AxiosResponse) => {
        if (res.data?.data) {
          appContext?.setUser(res.data?.data);
        }
      });
    }
  }, []);
  return (
    <Wrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      {/* <Footer /> */}
    </Wrapper>
  );
}
