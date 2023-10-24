import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppContext from "../../../contexts";
import { ROUTES } from "../../../routes/routes";
import Header from "../index";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockContext = {
  user: {
    email: "test@example.com",
    id: "123456",
  },
  login: true,
  setUser: jest.fn(),
  setLogin: jest.fn(),
  setOpenShare: jest.fn(),
};

describe("Header Component", () => {
  it("renders the header with the logo", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const logoElement = screen.getByText("Youtube Video Sharing App");
    expect(logoElement).toBeInTheDocument();
  });

  it("displays login and register links when user is not logged in", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const loginLink = screen.getByText("Log In");
    const registerLink = screen.getByText("Register");
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("displays user information and logout link when user is logged in", () => {
    setUp(mockContext);
    const welcomeText = screen.getByText("Welcome");
    const userEmail = screen.getByText(mockContext.user.email);
    const shareLink = screen.getByText("Share A Video");
    const logoutLink = screen.getByText("Log Out");

    expect(welcomeText).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(shareLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  it('log out user when the "Log Out" link is clicked', () => {
    setUp(mockContext);

    const logoutLink = screen.getByText("Log Out");

    fireEvent.click(logoutLink);

    expect(mockContext.setUser).toHaveBeenCalledWith(undefined);
    expect(mockContext.setLogin).toHaveBeenCalledWith(false);
  });

  it('show modal share video when the "Share A Video" button is clicked', () => {
    setUp(mockContext);

    const buttonShare = screen.getByText("Share A Video");

    fireEvent.click(buttonShare);

    expect(mockContext.setOpenShare).toHaveBeenCalledWith(true);
  });

  it('navigate to Login page when the "Log In" button is clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const buttonLogin = screen.getByText("Log In");

    fireEvent.click(buttonLogin);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  it('navigate to Register page when the "Log In" button is clicked', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    const buttonRegister = screen.getByText("Register");

    fireEvent.click(buttonRegister);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.REGISTER);
  });
});

const setUp = (appContext: any) => {
  render(
    <AppContext.Provider value={appContext}>
      <Router>
        <Header />
      </Router>
    </AppContext.Provider>
  );
};
