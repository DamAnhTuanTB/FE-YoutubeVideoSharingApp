import { cleanup, render, screen } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import { eraseCookie } from "../../../utils/cookies";
import AuthLayout from "../index";

afterEach(() => {
  cleanup();
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Auth Layout", () => {
  it("renders the auth layout with elements", () => {
    eraseCookie("token");
    setUp();
    const contentElement = screen.getByTestId("content-auth-layout");
    expect(contentElement).not.toBeNull();
  });
});

const setUp = () => {
  render(
    <Router>
      <AuthLayout />
    </Router>
  );
};
