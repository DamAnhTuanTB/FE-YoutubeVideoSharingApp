import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalShareVideo from "../../components/ModalShareVideo";
import AppContext from "../../contexts";
import { videoService } from "../../services/videoService";
import { BodyShareVideo, VideoItem } from "../../types";
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

  const navigate = useNavigate();

  const getListVideo = () => {
    videoService.getListVideo({ page }).then((data) => {
      setTotal(data.total);
      setVideos(data?.data);
    });
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleCancelShare = () => {
    appContext?.setOpenShare(false);
    setLoadingShare(false);
  };

  const handleSubmitShare = (body: BodyShareVideo) => {
    const url = body.url.trim();
    videoService
      .getInfoVideo({ url })
      .then((data) => {
        const urlEmbed = data?.urlEmbed;
        videoService
          .shareVideo({
            title: body.title.trim(),
            description: body.description?.trim(),
            url: urlEmbed,
          })
          .then(() => {
            message.success("Successfully share video");
            getListVideo();
            handleCancelShare();
          });
      })
      .catch((error) => {
        if (error?.status === 400) {
          message.error(
            "The URL of the video you provided is not correct. Please check again."
          );
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
          {videos?.map((video: VideoItem) => (
            <ItemVideo key={video?.id} data-testid="video-item">
              <Video
                src={video?.url}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <InfoVideo>
                <TitleVideo onClick={() => navigate(`/detail/${video?.id}`)}>
                  {video?.title}
                </TitleVideo>
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
            data-testid="pagination-element"
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
