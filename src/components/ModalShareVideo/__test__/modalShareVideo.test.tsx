import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import ModalShareVideo from "../index";

afterEach(() => {
  cleanup();
});

const mockProps = {
  open: true,
  handleCancel: jest.fn(),
  handleSubmit: jest.fn(),
  loading: false,
  setLoading: jest.fn(),
};

describe("Modal Share Video", () => {
  it("renders the modal share video with elements", () => {
    setUp(mockProps);
    const titleModal = screen.getByText("Share A Youtube Video");
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );
    const titleInput = screen.getByPlaceholderText("Your title");
    const descriptionInput = screen.getByPlaceholderText("Your description");
    const autoFillTitleButton = screen.getByRole("button", {
      name: "Auto Fill Title",
    });
    const buttonShare = screen.getByRole("button", { name: "SHARE" });
    expect(titleModal).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(autoFillTitleButton).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();
  });

  it("shows error url text when click button Share in case empty url, not empty title", async () => {
    setUp(mockProps);
    const titleInput = screen.getByPlaceholderText("Your title");
    const buttonShare = screen.getByRole("button", { name: "SHARE" });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(titleInput, { target: { value: "A song of Son Tung" } });
      fireEvent.click(buttonShare);
    });

    const messageErrorUrl = await screen.findByText("Url is a required field");

    expect(messageErrorUrl).toBeInTheDocument();
  });

  it("shows error url text and error title text when the url and title have an asylum value, it is full of spaces", async () => {
    setUp(mockProps);
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );
    const titleInput = screen.getByPlaceholderText("Your title");
    const buttonShare = screen.getByRole("button", { name: "SHARE" });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(urlInput, { target: { value: "     " } });
      fireEvent.change(titleInput, { target: { value: "     " } });
      fireEvent.click(buttonShare);
    });

    const messageErrorUrl = await screen.findByText("Url is a required field");
    const messageErrorTitle = await screen.findByText(
      "Title is a required field"
    );

    expect(messageErrorUrl).toBeInTheDocument();
    expect(messageErrorTitle).toBeInTheDocument();
  });

  it("shows error title text when click button Share in case empty title, not empty url", async () => {
    setUp(mockProps);
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );
    const buttonShare = screen.getByRole("button", { name: "SHARE" });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(urlInput, {
        target: { value: "https://www.youtube.com/watch?v=j5i7vhAR31k" },
      });
      fireEvent.click(buttonShare);
    });

    const messageErrorTitle = await screen.findByText(
      "Title is a required field"
    );

    expect(messageErrorTitle).toBeInTheDocument();
  });

  it("show error message url is not correct when click button auto fill title with empty url or invalid url", async () => {
    setUp(mockProps);
    const autoFillTitleButton = screen.getByRole("button", {
      name: "Auto Fill Title",
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(autoFillTitleButton);
    });

    const messageError = await screen.findByText(
      "The URL of the video you provided is not correct. Please check again."
    );

    expect(messageError).toBeInTheDocument();
  });

  it("do not close modal share video when click submit with invalid url and valid title", async () => {
    setUp(mockProps);
    const titleInput = screen.getByPlaceholderText("Your title");
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );
    const buttonShare = screen.getByRole("button", { name: "SHARE" });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(urlInput, {
        target: { value: "https://" },
      });
      fireEvent.change(titleInput, {
        target: { value: "A song of Son Tung" },
      });
      fireEvent.click(buttonShare);
    });

    const titleModal = await screen.findByText("Share A Youtube Video");

    expect(titleModal).toBeInTheDocument();
  });

  it("do not show error url text and error title text when press with valid url and valid title", async () => {
    setUp(mockProps);
    const titleInput = screen.getByPlaceholderText("Your title");
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(urlInput, {
        target: { value: "https://www.youtube.com/watch?v=j5i7vhAR31k" },
      });
      fireEvent.change(titleInput, {
        target: { value: "A song of Son Tung" },
      });
    });

    const messageErrorUrl = screen.queryByText("Url is a required field");
    const messageErrorTitle = screen.queryByText("Title is a required field");

    expect(messageErrorUrl).toBeNull();
    expect(messageErrorTitle).toBeNull();
  });
});

const setUp = ({
  open,
  handleCancel,
  handleSubmit,
  loading,
  setLoading,
}: any) => {
  render(
    <ModalShareVideo
      open={open}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      loading={loading}
      setLoading={setLoading}
    />
  );
};
