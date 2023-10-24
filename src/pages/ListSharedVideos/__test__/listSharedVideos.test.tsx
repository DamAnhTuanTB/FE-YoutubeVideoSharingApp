import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "../../../contexts";
import ListSharedVideos from "../index";

afterEach(() => {
  cleanup();
});

const mockContext = {
  openShare: false,
  setOpenShare: jest.fn(),
};

describe("List Shared Videos Page", () => {
  it("renders list shared videos page with elements", async () => {
    setUp(mockContext);
    await waitFor(() => {
      const videoItems = screen.getAllByTestId("video-item");
      expect(videoItems.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      const paginationItem = screen.getByTestId("pagination-element");
      expect(paginationItem).not.toBeNull();
    });
  });

  it("show modal share video when click button Share A Video", async () => {
    const appContext = {
      openShare: true,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);
    const modalShareVideo = screen.getByTestId("modal-share-video");
    expect(modalShareVideo).not.toBeNull();
  });

  it("do not show modal share video when do not click button share a video", async () => {
    const appContext = {
      openShare: false,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);

    const modalShareVideo = screen.queryByText("Share A Youtube Video");
    expect(modalShareVideo).toBeNull();
  });

  it("show error text Url is not valid when click button Share in modal share video", async () => {
    const appContext = {
      openShare: true,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );
    const titleInput = screen.getByPlaceholderText("Your title");

    const buttonShare = screen.getByRole("button", { name: "SHARE" });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(urlInput, { target: { value: "https/" } });
      fireEvent.change(titleInput, { target: { value: "A song of Son Tung" } });
      fireEvent.click(buttonShare);
    });

    const errorMessage = await screen.findByText(
      "The URL of the video you provided is not correct. Please check again."
    );

    expect(errorMessage).toBeInTheDocument();
  });

  // it("show success text 'Successfully share video' when click button Share in modal share video", async () => {
  //   const appContext = {
  //     openShare: true,
  //     setOpenShare: jest.fn(),
  //   };
  //   setUp(appContext);
  //   const urlInput = screen.getByPlaceholderText(
  //     "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
  //   );
  //   const titleInput = screen.getByPlaceholderText("Your title");

  //   const buttonShare = screen.getByRole("button", { name: "SHARE" });

  //   // eslint-disable-next-line testing-library/no-unnecessary-act
  //   act(() => {
  //     fireEvent.change(urlInput, {
  //       target: { value: "https://www.youtube.com/watch?v=j5i7vhAR31k" },
  //     });
  //     fireEvent.change(titleInput, { target: { value: "A song of Son Tung" } });
  //     fireEvent.click(buttonShare);
  //   });

  //   await waitFor(() => {
  //     const successMessage = screen.getByText("Successfully share video");

  //     expect(successMessage).toBeInTheDocument();
  //   });
  // });

  // it("set setOpenShare to false when case successfully share a video", async () => {
  //   const appContext = {
  //     openShare: true,
  //     setOpenShare: jest.fn(),
  //   };
  //   setUp(appContext);
  //   const urlInput = screen.getByPlaceholderText(
  //     "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
  //   );
  //   const titleInput = screen.getByPlaceholderText("Your title");

  //   const buttonShare = screen.getByRole("button", { name: "SHARE" });

  //   // eslint-disable-next-line testing-library/no-unnecessary-act
  //   act(() => {
  //     fireEvent.change(urlInput, {
  //       target: { value: "https://www.youtube.com/watch?v=j5i7vhAR31k" },
  //     });
  //     fireEvent.change(titleInput, { target: { value: "A song of Son Tung" } });
  //     fireEvent.click(buttonShare);
  //   });

  //   await waitFor(() => {
  //     expect(appContext.setOpenShare).toBeCalledWith(false);
  //   });
  // });

  it("renders the modal share video with elements when click button share a video", () => {
    const appContext = {
      openShare: true,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);
    const titleModal = screen.getByText("Share A Youtube Video");
    const urlInput = screen.getByPlaceholderText(
      "Example url: https://www.youtube.com/watch?v=j5i7vhAR31k"
    );
    const titleInput = screen.getByPlaceholderText("Your title");
    const descriptionInput = screen.getByPlaceholderText("Your description");
    expect(titleModal).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it("shows error url text when click button Share at modal share video in case empty url, not empty title", async () => {
    const appContext = {
      openShare: true,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);
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

  it("shows error title text when click button Share at modal share a video in case empty title, not empty url", async () => {
    const appContext = {
      openShare: true,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);
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

  it("do not show error url text and error title text when press with valid url and valid title at modal share video", async () => {
    const appContext = {
      openShare: true,
      setOpenShare: jest.fn(),
    };
    setUp(appContext);
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

const setUp = (appContext: any) => {
  render(
    <AppContext.Provider value={appContext}>
      <Router>
        <ListSharedVideos />
      </Router>
    </AppContext.Provider>
  );
};
