import { Button, Input, Modal } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Modal)``;

export const Title = styled.div`
  color: rgba(50, 71, 92);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const InfoIcon = styled.img`
  width: 14px;
  position: relative;
  top: -3px;
`;

export const InputItem = styled(Input)`
  height: 50px;
  font-size: 16px;
  color: rgba(50, 71, 92, 0.9);
`;

export const TextAreaItem = styled(Input.TextArea)`
  font-size: 16px;
  color: rgba(50, 71, 92, 0.9);
`;

export const ButtonCustom = styled(Button)`
  background-color: rgba(105, 108, 255, 0.8);
  color: white !important;
  height: 45px;
  width: 150px;
  margin: auto;
  display: block;
  margin-top: 18px;
  /* width: 100%; */
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: rgba(105, 108, 255);
  }
`;

export const ButtonAutoFillTitle = styled(Button)`
  display: inline-block;
  background-color: rgba(192, 51, 51, 0.7);
  color: white !important;
  height: 25px;
  padding: 0px 7px;
  margin: auto;
  margin-top: 18px;
  /* width: 100%; */
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  &:hover {
    background-color: rgba(192, 51, 51, 0.9);
  }
  margin-bottom: 5px;
`;
