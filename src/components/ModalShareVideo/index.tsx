import { FormCustom, FormItem, TitleInput } from "../../pages/Login/style";
import { ButtonCustom, InputItem, TextAreaItem, Title, Wrapper } from "./style";

export default function ModalShareVideo({
  open,
  handleCancel,
  handleSubmit,
}: {
  open: boolean;
  handleCancel: any;
  handleSubmit: any;
}) {
  const [form] = FormCustom.useForm();
  const onFinish = (values: {
    title: string;
    url: string;
    description: string;
  }) => {
    handleSubmit(values);
  };
  return (
    <Wrapper
      onCancel={handleCancel}
      open={open}
      centered
      footer={null}
      width={600}
    >
      <Title>Share A Youtube Video</Title>
      <FormCustom form={form} onFinish={onFinish}>
        <TitleInput>Title</TitleInput>
        <FormItem
          name="title"
          rules={[
            {
              required: true,
              message: "Title is a required field",
            },
          ]}
        >
          <InputItem maxLength={100} />
        </FormItem>
        <TitleInput>Url</TitleInput>
        <FormItem
          name="url"
          rules={[
            {
              required: true,
              message: "Url is a required field",
            },
          ]}
        >
          <InputItem />
        </FormItem>
        <TitleInput>Description</TitleInput>
        <FormItem
          name="description"
          rules={[
            {
              required: true,
              message: "Description is a required field",
            },
          ]}
        >
          <TextAreaItem
            maxLength={200}
            style={{ height: 120, resize: "none" }}
          />
        </FormItem>
      </FormCustom>
      <ButtonCustom onClick={() => form.submit()}>SHARE</ButtonCustom>
    </Wrapper>
  );
}
