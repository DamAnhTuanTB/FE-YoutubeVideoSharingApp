import { Button } from "antd";
import { styled } from "styled-components";
import { breakpoints } from "../../configs/breakpoints";
export const Wrapper = styled.div`
  padding: 6px 20px;
  background-color: #f5f5f9;
`;

export const Content = styled.div`
  max-width: 1024px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const ItemLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 24px;
  color: rgba(50, 71, 92, 0.9);
  cursor: pointer;
`;

export const TextLogo = styled.div`
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const LogoImg = styled.img`
  width: 55px;
  @media screen and (max-width: ${breakpoints.md}) {
    width: 50px;
  }
`;

export const WelcomeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media screen and (max-width: ${breakpoints.md}) {
    gap: 6px;
  }
`;

export const TextWelcome = styled.div`
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const Email = styled.div`
  color: rgba(50, 71, 92, 0.9);
  display: flex;
  gap: 5px;
`;

export const TextEmailMobile = styled.span`
  font-weight: 700;
  font-size: 14px;
  @media screen and (min-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const TextEmailDesktop = styled.span`
  font-weight: 700;
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const Logout = styled(Button)`
  background-color: rgba(105, 108, 255, 0.8);
  color: white !important;
  padding: 0 15px;
  font-weight: 700;
  height: 35px;
  border: none;
  &:hover {
    background-color: rgba(105, 108, 255, 1);
  }
  @media screen and (max-width: ${breakpoints.md}) {
    height: 30px;
    font-size: 12px;
    padding: 0px 12px;
  }
`;

export const Intro = styled.div`
  display: flex;
  gap: 8px;
`;

export const Login = styled(Button)`
  background-color: rgba(105, 108, 255, 0.8);
  color: white !important;
  padding: 0 15px;
  font-weight: 700;
  height: 35px;
  border: none;
  &:hover {
    background-color: rgba(105, 108, 255, 1);
  }
  @media screen and (max-width: ${breakpoints.md}) {
    height: 30px;
    font-size: 12px;
    padding: 0px 12px;
  }
`;

export const Register = styled(Button)`
  background-color: rgba(105, 108, 255, 0.8);
  color: white !important;
  padding: 0 15px;
  font-weight: 700;
  height: 35px;
  border: none;
  &:hover {
    background-color: rgba(105, 108, 255, 1);
  }
  @media screen and (max-width: ${breakpoints.md}) {
    height: 30px;
    font-size: 12px;
    padding: 0px 12px;
  }
`;
