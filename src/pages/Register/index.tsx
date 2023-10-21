import { Form, message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import IconImageIntro from "../../assets/images/intro-register.png";
import IconLogo from "../../assets/images/logo.png";
import { ROUTES } from "../../routes/routes";
import { authService } from "../../services/authService";
import { DataErrorAxios } from "../../types";
import {
  ButtonCustom,
  Content,
  ContentWrapper,
  FormCustom,
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
  const [form] = Form.useForm();

  const handleFinish = (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    authService
      .register(payload)
      .then((response: AxiosResponse) => {
        message.success(response.data?.message);
        navigate(ROUTES.LOGIN);
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
          <WelcomeItem>Adventure starts here 🚀</WelcomeItem>
          <PleaseItem>
            An excellent platform for sharing online videos!
          </PleaseItem>
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
            <TitleInput>Confirm password</TitleInput>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Password confirmation is a required field",
                },
                ({ getFieldValue }) => ({
                  validator(_, value: string) {
                    if (!value) {
                      return Promise.resolve();
                    }

                    if (getFieldValue("password") !== value) {
                      return Promise.reject(
                        new Error("Password confirmation does not match")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <InputPassword />
            </Form.Item>
          </FormCustom>
          <NoticeRegister>
            By clicking on Register, you agree to{" "}
            <TermsAndConditions>
              Our Terms and Conditions of Use
            </TermsAndConditions>
          </NoticeRegister>
          <ButtonCustom onClick={() => form.submit()}>REGISTER</ButtonCustom>
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
