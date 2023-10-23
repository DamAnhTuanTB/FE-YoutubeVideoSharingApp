import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import ModalShareVideo from "../../components/ModalShareVideo";
import AppContext from "../../contexts";
import { videoService } from "../../services/videoService";
import { DataErrorAxios } from "../../types";
import {
  Content,
  DescriptionTitle,
  DescriptionVideo,
  InfoVideo,
  ItemVideo,
  ListVideos,
  NoDescription,
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
  const [loadingShare, setLoadingShare] = useState(false);

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
    setLoadingShare(false);
  };

  const handleSubmitShare = (body: {
    url: string;
    title: string;
    description?: string;
  }) => {
    const url = body.url;
    videoService
      .getInfoVideo({ url })
      .then((res: AxiosResponse) => {
        const urlEmbed = res?.data?.urlEmbed;
        videoService
          .shareVideo({ ...body, url: urlEmbed })
          .then((res: AxiosResponse) => {
            message.success("Successfully share video");
            getListVideo();
            handleCancelShare();
          });
      })
      .catch((error: AxiosError<DataErrorAxios>) => {
        if (error?.response?.status === 400) {
          message.error(error?.response?.data?.message);
          setLoadingShare(false);
        } else {
          message.error("An error occurred. Please try again later.");
          handleCancelShare();
        }
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
                <DescriptionVideo>
                  {video?.description || (
                    <NoDescription>
                      There is no description for this video
                    </NoDescription>
                  )}
                </DescriptionVideo>
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
          loading={loadingShare}
          setLoading={setLoadingShare}
          open={appContext?.openShare}
          handleCancel={handleCancelShare}
          handleSubmit={handleSubmitShare}
        />
      )}
    </Wrapper>
  );
}
