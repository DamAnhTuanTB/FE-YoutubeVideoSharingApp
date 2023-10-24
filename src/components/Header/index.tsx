import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AppContext from "../../contexts";
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
  Share,
  TextEmail,
  TextLogo,
  TextWelcome,
  WelcomeItem,
  Wrapper,
} from "./style";

export default function Header() {
  const appContext = useContext(AppContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    appContext?.setUser(undefined);
    eraseCookie("token");
    appContext?.setLogin(false);
  };
  const handleOpenShare = () => {
    appContext?.setOpenShare(true);
  };
  return (
    <Wrapper data-testid="header-element">
      <Content>
        <ItemLogo>
          <LogoImg src={Logo} alt="" />
          <TextLogo>Youtube Video Sharing App</TextLogo>
        </ItemLogo>
        {appContext?.user && appContext?.login && (
          <WelcomeItem>
            <Email>
              <TextWelcome>Welcome</TextWelcome>{" "}
              <TextEmail>{appContext?.user?.email}</TextEmail>
            </Email>
            <Share onClick={handleOpenShare}>Share A Video</Share>
            <Logout onClick={handleLogout}>Log Out</Logout>
          </WelcomeItem>
        )}
        {!appContext?.login && (
          <Intro>
            <Login onClick={() => navigate(ROUTES.LOGIN)}>Log In</Login>
            <Register onClick={() => navigate(ROUTES.REGISTER)}>
              Register
            </Register>
          </Intro>
        )}
      </Content>
    </Wrapper>
  );
}
