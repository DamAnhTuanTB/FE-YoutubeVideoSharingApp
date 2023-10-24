import { Tooltip } from "antd";
import React from "react";
import IconInfo from "../../assets/images/info.png";
import {
  FormCustom,
  FormItem,
  SpanRequired,
  TitleInput,
} from "../../pages/Login/style";
import { BodyShareVideo } from "../../types";
import {
  ButtonCustom,
  InfoIcon,
  InputItem,
  TextAreaItem,
  Title,
  Wrapper,
} from "./style";

export default function ModalShareVideo({
  open,
  handleCancel,
  handleSubmit,
  loading,
  setLoading,
}: {
  open: boolean;
  handleCancel: () => void;
  handleSubmit: ({ title, url, description }: BodyShareVideo) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = FormCustom.useForm();
  const onFinish = (values: BodyShareVideo) => {
    setLoading(true);
    handleSubmit(values);
  };
  return (
    <Wrapper
      data-testid="modal-share-video"
      onCancel={handleCancel}
      open={open}
      centered
      footer={null}
      width={600}
    >
      <Title>Share A Youtube Video</Title>
      <FormCustom form={form} onFinish={onFinish}>
        <TitleInput>
          <SpanRequired>*</SpanRequired> Url{" "}
          <Tooltip title="URLs with a format similar to the following sample urls will be considered valid: https://www.youtube.com/watch?v=j5i7vhAR31k, https://www.youtube.com/watch?v=j5i7vhAR31k&t=1600s, https://youtu.be/j5i7vhAR31k?si=PV68Kg43BqtcbCQW, https://www.youtube.com/embed/j5i7vhAR31k?si=jKO39_Q-E7">
            <InfoIcon src={IconInfo} alt="" />
          </Tooltip>
        </TitleInput>
        <FormItem
          name="url"
          rules={[
            {
              required: true,
              message: "Url is a required field",
            },
          ]}
        >
          <InputItem placeholder="Example url: https://www.youtube.com/watch?v=j5i7vhAR31k" />
        </FormItem>
        <TitleInput>
          <SpanRequired>*</SpanRequired> Title
        </TitleInput>
        <FormItem
          name="title"
          rules={[
            {
              required: true,
              message: "Title is a required field",
            },
          ]}
        >
          <InputItem placeholder="Your title" maxLength={100} />
        </FormItem>
        <TitleInput>Description</TitleInput>
        <FormItem name="description">
          <TextAreaItem
            placeholder="Your description"
            maxLength={200}
            style={{ height: 120, resize: "none" }}
          />
        </FormItem>
      </FormCustom>
      <ButtonCustom loading={loading} onClick={() => form.submit()}>
        SHARE
      </ButtonCustom>
    </Wrapper>
  );
}
