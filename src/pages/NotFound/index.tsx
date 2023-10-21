import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  clickBackTo?: string;
}

export default function NotFound(props: NotFoundProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (!props.clickBackTo) {
      navigate(-1);
    }
    navigate(`${props.clickBackTo}`);
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBack}>
          Back Home
        </Button>
      }
    />
  );
}
