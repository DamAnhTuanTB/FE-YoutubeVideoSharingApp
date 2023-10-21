import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { authService } from "../../services/authService";
import { getCookie } from "../../utils/cookies";
import { Content, Wrapper } from "./style";

export default function MainLayout() {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(!!getCookie("token"));
  useEffect(() => {
    if (getCookie("token")) {
      authService.getProfile().then((res: AxiosResponse) => {
        setUser(res.data?.data);
      });
    }
  }, []);
  return (
    <Wrapper>
      <Header
        user={user}
        setUser={setUser}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Wrapper>
  );
}
