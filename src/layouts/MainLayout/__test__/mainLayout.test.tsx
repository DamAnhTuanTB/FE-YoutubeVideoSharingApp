import { cleanup, render, screen } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "../../../contexts";
import MainLayout from "../index";

afterEach(() => {
  cleanup();
});

const mockContext = {
  setUser: jest.fn(),
};

describe("Main Layout", () => {
  it("renders the main layout with elements", () => {
    setUp(mockContext);
    const headerElement = screen.getByTestId("header-element");
    const contentElement = screen.getByTestId("content-element");
    expect(headerElement).not.toBeNull();
    expect(contentElement).not.toBeNull();
  });
});

const setUp = (appContext: any) => {
  render(
    <AppContext.Provider value={appContext}>
      <Router>
        <MainLayout />
      </Router>
    </AppContext.Provider>
  );
};
