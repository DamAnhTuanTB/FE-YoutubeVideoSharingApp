import { Button } from "antd";
import styled from "styled-components";
import { breakpoints } from "../../configs/breakpoints";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  overflow-y: auto;
`;

export const Content = styled.div`
  max-width: 918px;
  margin: auto;
  padding-top: 15px;
`;

export const Video = styled.iframe`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  flex-shrink: 0;
  @media screen and (max-width: ${breakpoints.md}) {
    height: 250px;
  }
`;

export const ListComment = styled.div`
  margin-top: 20px;
  border-top: 1px solid gray;
  padding: 10px 0px;
`;

export const NumberComment = styled.div`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const ButtonComment = styled(Button)`
  background-color: rgba(105, 108, 255, 0.8);
  color: white !important;
  height: 40px;
  width: 120px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: rgba(105, 108, 255);
  }
  &:disabled {
    background-color: rgba(105, 108, 255, 0.8);
    filter: brightness(0.8);
  }
`;

export const CommentItem = styled.div`
  margin-top: 10px;
`;

export const HeaderComment = styled.div`
  font-weight: 700;
`;

export const DateComment = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

export const ContentComment = styled.div`
  margin-top: 3px;
`;
