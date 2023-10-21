import { Form, message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import IconImageIntro from "../../assets/images/intro-login.png";
import IconLogo from "../../assets/images/logo.png";
import { ROUTES } from "../../routes/routes";
import { authService } from "../../services/authService";
import { DataErrorAxios } from "../../types";
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
  ImageIntro,
  ImageWrapper,
  InputEmail,
  InputPassword,
  Logo,
  LogoItem,
  NoticeItem,
  PleaseItem,
  TextLogo,
  TitleAccount,
  TitleInput,
  WelcomeItem,
  Wrapper,
} from "./style";

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleFinish = (values: { email: string; password: string }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    authService
      .login(payload)
      .then((response: AxiosResponse) => {
        setCookie("token", response.data?.token);
        navigate(ROUTES.LIST_SHARED_VIDEOS);
      })
      .catch((error: AxiosError<DataErrorAxios>) => {
        message.error(error?.response?.data?.message);
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
            <TitleInput>Email</TitleInput>
            <Form.Item
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
              <InputEmail placeholder="client@gmail.com" />
            </Form.Item>
            <TitleInput>Password</TitleInput>
            <Form.Item
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
              <InputPassword />
            </Form.Item>
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
