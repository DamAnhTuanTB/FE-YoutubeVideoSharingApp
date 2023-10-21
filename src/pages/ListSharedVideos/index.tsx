import { message } from "antd";
import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import ModalShareVideo from "../../components/ModalShareVideo";
import AppContext from "../../contexts";
import { videoService } from "../../services/videoService";
import {
  Content,
  DescriptionTitle,
  DescriptionVideo,
  InfoVideo,
  ItemVideo,
  ListVideos,
  PaginationCustom,
  TitleVideo,
  User,
  UserVideo,
  Video,
  Wrapper,
} from "./style";

export default function ListSharedVideos() {
  const appContext = useContext(AppContext);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);

  const getListVideo = () => {
    videoService.getListVideo({ page }).then((res: AxiosResponse) => {
      setTotal(res.data.total);
      setVideos(res.data?.data);
    });
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleCancelShare = () => {
    appContext?.setOpenShare(false);
  };

  const handleSubmitShare = (body: any) => {
    videoService.shareVideo(body).then((res: AxiosResponse) => {
      message.success("Successfully share video");
      getListVideo();
      handleCancelShare();
    });
  };

  useEffect(() => {
    getListVideo();
  }, [page]);

  return (
    <Wrapper>
      <Content>
        <ListVideos>
          {videos?.map((video: any) => (
            <ItemVideo key={video?.id}>
              <Video
                src={video?.url}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <InfoVideo>
                <TitleVideo>{video?.title}</TitleVideo>
                <UserVideo>
                  Shared by: <User>{video?.email}</User>
                </UserVideo>
                <DescriptionTitle>Description:</DescriptionTitle>
                <DescriptionVideo>{video?.description}</DescriptionVideo>
              </InfoVideo>
            </ItemVideo>
          ))}
        </ListVideos>
        {total > 0 && (
          <PaginationCustom
            onChange={handleChangePage}
            pageSize={10}
            total={total}
            current={page}
          />
        )}
      </Content>
      {appContext?.openShare && (
        <ModalShareVideo
          open={appContext?.openShare}
          handleCancel={handleCancelShare}
          handleSubmit={handleSubmitShare}
        />
      )}
    </Wrapper>
  );
}
