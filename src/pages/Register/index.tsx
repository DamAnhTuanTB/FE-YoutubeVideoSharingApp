import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconImageIntro from "../../assets/images/intro-register.png";
import IconLogo from "../../assets/images/logo.png";
import { ROUTES } from "../../routes/routes";
import { authService } from "../../services/authService";
import { SpanRequired } from "../Login/style";
import {
  ButtonCustom,
  Content,
  ContentWrapper,
  FormCustom,
  FormItem,
  ImageIntro,
  ImageWrapper,
  InputEmail,
  InputPassword,
  LoginInstead,
  Logo,
  LogoItem,
  NoticeItem,
  NoticeRegister,
  PleaseItem,
  TermsAndConditions,
  TextLogo,
  TitleInput,
  WelcomeItem,
  Wrapper,
} from "./style";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = FormCustom.useForm();

  const handleFinish = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    const payload = {
      email: values.email.toLowerCase(),
      password: values.password,
    };
    authService
      .register(payload)
      .then((data) => {
        setLoading(false);
        message.success(data?.message);
        navigate(ROUTES.LOGIN);
      })
      .catch((error) => {
        setLoading(false);
        if (error?.status === 400) {
          message.error("Email actually exists. Please check again.");
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
          <WelcomeItem>Adventure starts here 🚀</WelcomeItem>
          <PleaseItem>
            An excellent platform for sharing online videos!
          </PleaseItem>
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
            <TitleInput>
              <SpanRequired>*</SpanRequired> Confirm password
            </TitleInput>
            <FormItem
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Password confirmation is a required field",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password confirmation does not match")
                    );
                  },
                }),
              ]}
            >
              <InputPassword placeholder="Your password confirmation" />
            </FormItem>
          </FormCustom>
          <NoticeRegister>
            By clicking on Register, you agree to{" "}
            <TermsAndConditions>
              Our Terms and Conditions of Use
            </TermsAndConditions>
          </NoticeRegister>
          <ButtonCustom loading={loading} onClick={() => form.submit()}>
            REGISTER
          </ButtonCustom>
          <NoticeItem>
            Already have an account?{" "}
            <LoginInstead onClick={() => navigate(ROUTES.LOGIN)}>
              Login instead
            </LoginInstead>
          </NoticeItem>
        </Content>
      </ContentWrapper>
    </Wrapper>
  );
}
