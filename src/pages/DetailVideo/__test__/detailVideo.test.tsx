import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailVideo from "..";
import AppContext from "../../../contexts";

afterEach(() => {
  cleanup();
});

describe("Detail Video Page", () => {
  it("renders the detail video page with elements when login", async () => {
    const mockContext = {
      login: true,
    };
    setUp(mockContext);

    const urlVideo = screen.getByTestId("detail-url-video");
    const titleVideo = screen.getByTestId("detail-title-video");
    const emailVideo = screen.getByTestId("detail-email-video");
    const descriptionVideo = screen.getByTestId("detail-description-video");
    const textareaItem = screen.getByPlaceholderText("Your comment");
    const buttonComment = screen.getByRole("button", { name: "Comment" });
    expect(urlVideo).toBeInTheDocument();
    expect(titleVideo).toBeInTheDocument();
    expect(emailVideo).toBeInTheDocument();
    expect(descriptionVideo).toBeInTheDocument();
    expect(textareaItem).toBeInTheDocument();
    expect(buttonComment).toBeInTheDocument();
  });

  it("renders the detail video page with elements when not login", async () => {
    const mockContext = {
      login: false,
    };
    setUp(mockContext);

    const urlVideo = screen.getByTestId("detail-url-video");
    const titleVideo = screen.getByTestId("detail-title-video");
    const emailVideo = screen.getByTestId("detail-email-video");
    const descriptionVideo = screen.getByTestId("detail-description-video");
    const textareaItem = screen.queryByPlaceholderText("Your comment");
    const buttonComment = screen.queryByRole("button", { name: "Comment" });
    expect(urlVideo).toBeInTheDocument();
    expect(titleVideo).toBeInTheDocument();
    expect(emailVideo).toBeInTheDocument();
    expect(descriptionVideo).toBeInTheDocument();
    expect(textareaItem).not.toBeInTheDocument();
    expect(buttonComment).not.toBeInTheDocument();
  });

  it("show message successfully comment video when successfully comment video", async () => {
    const mockContext = {
      login: true,
    };
    setUp(mockContext);
    const textareaItem = screen.getByPlaceholderText("Your comment");
    const buttonComment = screen.getByRole("button", { name: "Comment" });

    expect(buttonComment).toHaveAttribute("disabled");

    fireEvent.change(textareaItem, { target: { value: "Very good" } });
    fireEvent.click(buttonComment);

    expect(buttonComment).toHaveClass("ant-btn-loading");
    expect(buttonComment).not.toHaveAttribute("disabled");

    await waitFor(() => {
      expect(buttonComment).not.toHaveAttribute("disabled");
    });

    await waitFor(() => {
      expect(buttonComment).not.toHaveClass("ant-btn-loading");
    });

    const successMessage = await screen.findByText(
      "Successfully comment video"
    );
    expect(successMessage).toBeInTheDocument();
  });
});

const setUp = (appContext: any) => {
  render(
    <AppContext.Provider value={appContext}>
      <MemoryRouter initialEntries={["/detail/65391babb890afdd38462a1e"]}>
        <Routes>
          <Route path="/detail/:id" element={<DetailVideo />} />
        </Routes>
      </MemoryRouter>
    </AppContext.Provider>
  );
};
