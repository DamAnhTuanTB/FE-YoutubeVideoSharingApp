import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NotFound from "../index";

afterEach(() => {
  cleanup();
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Not Found Page", () => {
  it("renders the not found page with elements", async () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    const statusElement = screen.getByText("404");
    const titleElement = screen.getByText("404");
    const subtitleElement = screen.getByText(
      "Sorry, the page you visited does not exist."
    );
    const buttonElement = screen.getByText("Back Home");
    expect(statusElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("navigate to previous page when click Back Home button", async () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    const buttonElement = screen.getByText("Back Home");
    fireEvent.click(buttonElement);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
