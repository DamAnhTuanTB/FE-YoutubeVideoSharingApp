import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { ROUTES } from "../../routes/routes";
import { eraseCookie } from "../../utils/cookies";
import {
  Content,
  Email,
  Intro,
  ItemLogo,
  Login,
  LogoImg,
  Logout,
  Register,
  TextLogo,
  TextWelcome,
  WelcomeItem,
  Wrapper,
  TextEmailMobile,
  TextEmailDesktop
} from "./style";

export default function Header({
  user,
  setUser,
  isLogin,
  setIsLogin,
}: {
  user: any;
  isLogin: boolean;
  setUser: (user: any) => void;
  setIsLogin: (login: boolean) => void;
}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(undefined);
    eraseCookie("token");
    setIsLogin(false);
  };
  return (
    <Wrapper>
      <Content>
        <ItemLogo>
          <LogoImg src={Logo} alt="" />
          <TextLogo>Youtube Video Sharing App</TextLogo>
        </ItemLogo>
        {user && isLogin && (
          <WelcomeItem>
            <Email>
              <TextWelcome>Welcome</TextWelcome>{" "}
              <TextEmailMobile>
                {user?.email?.length > 16
                  ? user?.email?.substring(0, 16).concat("...")
                  : user?.email}
              </TextEmailMobile>
              <TextEmailDesktop>{user?.email}</TextEmailDesktop>
            </Email>
            <Logout onClick={handleLogout}>LOGOUT</Logout>
          </WelcomeItem>
        )}
        {!isLogin && (
          <Intro>
            <Login onClick={() => navigate(ROUTES.LOGIN)}>LOGIN</Login>
            <Register onClick={() => navigate(ROUTES.REGISTER)}>
              REGISTER
            </Register>
          </Intro>
        )}
      </Content>
    </Wrapper>
  );
}
