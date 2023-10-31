import { message } from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextAreaItem } from "../../components/ModalShareVideo/style";
import AppContext from "../../contexts";
import { videoService } from "../../services/videoService";
import { VideoDetail } from "../../types";
import {
  DescriptionTitle,
  DescriptionVideo,
  NoDescription,
  TitleVideo,
  User,
  UserVideo,
} from "../ListSharedVideos/style";
import {
  ButtonComment,
  CommentItem,
  Content,
  ContentComment,
  DateComment,
  HeaderComment,
  ListComment,
  NumberComment,
  Video,
  Wrapper,
} from "./style";

export default function DetailVideo() {
  const appContext = useContext(AppContext);
  const [video, setVideo] = useState<VideoDetail>();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const getDetailVideo = () => {
    if (params?.id) {
      videoService.getDetailVideo(params?.id).then((data) => {
        setVideo(data);
      });
    }
  };
  useEffect(() => {
    getDetailVideo();
  }, []);

  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (params?.id) {
      setLoading(true);
      videoService
        .commentVideo({
          videoId: params?.id,
          comment: comment.trim(),
        })
        .then(() => {
          message.success("Successfully comment video");
          setComment("");
          getDetailVideo();
          setLoading(false);
        });
    }
  };

  return (
    <Wrapper>
      <Content>
        <Video
          data-testid="detail-url-video"
          src={video?.url}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <TitleVideo data-testid="detail-title-video">{video?.title}</TitleVideo>
        <UserVideo data-testid="detail-email-video">
          Shared by: <User>{video?.email}</User>
        </UserVideo>
        <DescriptionTitle>Description:</DescriptionTitle>
        <DescriptionVideo data-testid="detail-description-video">
          {video?.description || (
            <NoDescription>
              There is no description for this video
            </NoDescription>
          )}
        </DescriptionVideo>
        <ListComment>
          <NumberComment>
            {video?.listComment?.length || 0}{" "}
            {video?.listComment?.length ? "comments" : "comment"}
          </NumberComment>
          {appContext?.login && (
            <>
              <TextAreaItem
                value={comment}
                onChange={handleChangeComment}
                placeholder="Your comment"
                maxLength={200}
                style={{ height: 100, resize: "none" }}
              />
              <ButtonComment
                loading={loading}
                onClick={handleSubmitComment}
                disabled={!comment.trim()}
              >
                Comment
              </ButtonComment>
            </>
          )}
          {video?.listComment?.map((item) => (
            <CommentItem key={item?.id}>
              <HeaderComment>
                {item?.email}{" "}
                <DateComment>{moment(item?.createdAt).fromNow()}</DateComment>
              </HeaderComment>
              <ContentComment>{item?.comment}</ContentComment>
            </CommentItem>
          ))}
        </ListComment>
      </Content>
    </Wrapper>
  );
}
