import { message } from "antd";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import IconImageIntro from "../../assets/images/intro-login.png";
import IconLogo from "../../assets/images/logo.png";
import AppContext from "../../contexts";
import { ROUTES } from "../../routes/routes";
import { authService } from "../../services/authService";
import { setCookie } from "../../utils/cookies";
import {
  Account,
  ButtonCustom,
  Content,
  ContentAccount,
  ContentWrapper,
  CreateNewText,
  ExampleAccount,
  FormCustom,
  FormItem,
  ImageIntro,
  ImageWrapper,
  InputEmail,
  InputPassword,
  Logo,
  LogoItem,
  NoticeItem,
  PleaseItem,
  SpanRequired,
  TextLogo,
  TitleAccount,
  TitleInput,
  WelcomeItem,
  Wrapper,
} from "./style";

export default function Login() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [form] = FormCustom.useForm();

  const handleFinish = (values: { email: string; password: string }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    authService
      .login(payload)
      .then((data) => {
        setCookie("token", data?.token);
        appContext?.setLogin(true);
        navigate(ROUTES.LIST_SHARED_VIDEOS);
      })
      .catch((error) => {
        if (error?.status === 400) {
          message.error("Email or password is incorrect. Please check again.");
        } else {
          message.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <Wrapper>
      <ImageWrapper>
        <ImageIntro src={IconImageIntro} alt="" />
      </ImageWrapper>
      <ContentWrapper>
        <Content>
          <LogoItem>
            <Logo src={IconLogo} alt="" />
            <TextLogo>Youtube Video Sharing App</TextLogo>
          </LogoItem>
          <WelcomeItem>Welcome 👋🏻</WelcomeItem>
          <PleaseItem>
            Please sign-in to your account and start the adventure!
          </PleaseItem>
          <ExampleAccount>
            <Account>
              <TitleAccount>Email:</TitleAccount>
              <ContentAccount>client@gmail.com</ContentAccount>
            </Account>
            <Account>
              <TitleAccount>Password:</TitleAccount>
              <ContentAccount>client</ContentAccount>
            </Account>
          </ExampleAccount>
          <FormCustom form={form} onFinish={handleFinish}>
            <TitleInput>
              <SpanRequired>*</SpanRequired> Email
            </TitleInput>
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is a required field",
                },
                {
                  type: "email",
                  message: "Invalid email",
                },
              ]}
            >
              <InputEmail placeholder="Your email" />
            </FormItem>
            <TitleInput>
              <SpanRequired>*</SpanRequired> Password
            </TitleInput>
            <FormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is a required field",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <InputPassword placeholder="Your password" />
            </FormItem>
          </FormCustom>
          <ButtonCustom onClick={() => form.submit()}>LOGIN</ButtonCustom>
          <NoticeItem>
            New on our platform?{" "}
            <CreateNewText onClick={() => navigate(ROUTES.REGISTER)}>
              Create an account
            </CreateNewText>
          </NoticeItem>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
}
