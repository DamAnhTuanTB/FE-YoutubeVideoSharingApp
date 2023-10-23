import { Button, Form, Input } from "antd";
import { styled } from "styled-components";
import { breakpoints } from "../../configs/breakpoints";
export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const ImageWrapper = styled.div`
  flex: 1;
  background-color: #f5f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const ImageIntro = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
`;

export const ContentWrapper = styled.div`
  width: 500px;
  padding: 10px 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: ${breakpoints.lg}) {
    max-width: 500px;
    margin: auto;
    padding: 10px 20px;
  }
`;

export const Content = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export const LogoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(50, 71, 92, 0.87);
  font-size: 24px;
`;

export const Logo = styled.img`
  width: 55px;
`;

export const TextLogo = styled.div`
  font-weight: 700;
  letter-spacing: -0.45px;
`;

export const WelcomeItem = styled.div`
  color: rgba(50, 71, 92, 0.87);
  font-weight: 500;
  font-size: 20px;
  margin-top: 20px;
`;

export const PleaseItem = styled.div`
  color: rgba(50, 71, 92, 0.6);
  font-weight: 400;
  margin-top: 12px;
`;

export const ExampleAccount = styled.div`
  color: rgb(105, 108, 255);
  background-color: rgba(105, 108, 255, 0.16);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 7px;
  margin: 25px 0px;
`;

export const Account = styled.div`
  display: flex;
  gap: 5px;
  font-size: 13px;
`;

export const TitleAccount = styled.div``;

export const ContentAccount = styled.div`
  font-weight: 700;
`;

export const FormCustom = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
`;

export const FormItem = styled(Form.Item)``;

export const InputEmail = styled(Input)`
  height: 50px;
  font-size: 16px;
  color: rgba(50, 71, 92, 0.9);
`;

export const InputPassword = styled(Input.Password)`
  height: 50px;
  font-size: 16px;
  color: rgba(50, 71, 92, 0.9);
`;

export const TitleInput = styled.div`
  color: rgba(50, 71, 92, 0.8);
  font-weight: 500;
  font-size: 15px;
`;

export const SpanRequired = styled.span`
  color: #ff3131
`;

export const ButtonCustom = styled(Button)`
  margin-top: 18px;
  background-color: rgba(105, 108, 255, 0.8);
  color: white !important;
  height: 45px;
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: rgba(105, 108, 255);
  }
`;

export const NoticeItem = styled.div`
  text-align: center;
  color: rgba(50, 71, 92, 0.6);
  font-size: 14px;
  margin-top: 10px;
`;

export const CreateNewText = styled.span`
  color: rgb(105, 108, 255);
  cursor: pointer;
`;
