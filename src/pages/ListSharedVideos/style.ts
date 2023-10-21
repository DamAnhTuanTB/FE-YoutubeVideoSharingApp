import { Pagination } from "antd";
import { styled } from "styled-components";
import { breakpoints } from "../../configs/breakpoints";
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 20px;
`;

export const Content = styled.div`
  height: 100%;
  max-width: 918px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

export const ListVideos = styled.div`
  padding-right: 5px;
  flex: 1;
  overflow-y: auto;
`;

export const ItemVideo = styled.div`
  display: flex;
  height: 315px;
  gap: 12px;
  margin-bottom: 15px;
  @media screen and (max-width: ${breakpoints.md}) {
    flex-direction: column;
    height: max-content;
    gap: 6px;
  }
`;

export const Video = styled.iframe`
  width: 560px;
  height: 100%;
  border-radius: 12px;
  flex-shrink: 0;
  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
    height: 180px;
  }
`;

export const InfoVideo = styled.div`
  padding: 10px 0px;
  height: 100%;
  overflow-y: auto;
  @media screen and (max-width: ${breakpoints.md}) {
    height: max-content;
    padding: 0px;
  }
`;

export const TitleVideo = styled.div`
  font-weight: 700;
  font-size: 22px;
  /* color: rgba(50, 71, 92, 0.95); */
`;

export const UserVideo = styled.div`
  color: rgba(50, 71, 92, 0.95);
  margin-top: 5px;
`;

export const DescriptionVideo = styled.div`
  margin-top: 5px;
  color: rgba(50, 71, 92, 0.95);
  font-weight: 600;
  @media screen and (max-width: ${breakpoints.md}) {
    margin-top: 2px;
  }
`;

export const DescriptionTitle = styled.div`
  margin-top: 15px;
  color: rgba(50, 71, 92, 0.95);
  @media screen and (max-width: ${breakpoints.md}) {
    margin-top: 3px;
  }
`;

export const User = styled.span`
  font-weight: 600;
`;

export const PaginationCustom = styled(Pagination)`
  padding: 10px 0px;
`;
