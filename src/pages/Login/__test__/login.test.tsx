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
import { ROUTES } from "../../../routes/routes";
import Login from "../index";

afterEach(() => {
  cleanup();
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockContext = {
  setLogin: jest.fn(),
};

describe("Login Page", () => {
  it("renders the login page with form elements", () => {
    setUp(mockContext);
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const loginButton = screen.getByText("LOGIN");
    const createAccountLink = screen.getByText("Create an account");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(createAccountLink).toBeInTheDocument();
  });

  it("submits the login form in case empty password and not empty email", async () => {
    setUp(mockContext);
    const emailInput = screen.getByPlaceholderText("Your email");

    const loginButton = screen.getByText("LOGIN");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "tuanda@apero.vn" } });
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(mockContext.setLogin).not.toHaveBeenCalled();
    });
  });

  it("submits the login form in case empty email and not empty password", async () => {
    setUp(mockContext);
    const passwordInput = screen.getByPlaceholderText("Your password");
    const loginButton = screen.getByText("LOGIN");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(mockContext.setLogin).not.toHaveBeenCalled();
    });
  });

  it("submits the login form in case empty email and empty password", async () => {
    setUp(mockContext);

    const loginButton = screen.getByText("LOGIN");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(mockContext.setLogin).not.toHaveBeenCalled();
    });

    const messageErrorEmail = await screen.findByText(
      "Email is a required field"
    );

    const messageErrorPassword = await screen.findByText(
      "Password is a required field"
    );
    expect(messageErrorEmail).toBeInTheDocument();
    expect(messageErrorPassword).toBeInTheDocument();
  });

  it("submits the login form in case valid email and valid password", async () => {
    setUp(mockContext);
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const loginButton = screen.getByText("LOGIN");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "client@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "client" } });
      fireEvent.click(loginButton);
    });

    const messageErrorEmail = screen.queryByText("Email is a required field");

    const messageErrorPassword = screen.queryByText(
      "Password is a required field"
    );

    expect(messageErrorEmail).toBeNull();
    expect(messageErrorPassword).toBeNull();

    await waitFor(() => {
      expect(mockContext.setLogin).toHaveBeenCalledWith(true);
    });
  });

  // it("navigate to list shared videos in case success login", async () => {
  //   const appContext = {
  //     setLogin: jest.fn(),
  //   };
  //   setUp(appContext);
  //   const emailInput = screen.getByPlaceholderText("Your email");
  //   const passwordInput = screen.getByPlaceholderText("Your password");
  //   const loginButton = screen.getByText("LOGIN");

  //   // eslint-disable-next-line testing-library/no-unnecessary-act
  //   act(() => {
  //     fireEvent.change(emailInput, { target: { value: "client@gmail.com" } });
  //     fireEvent.change(passwordInput, { target: { value: "client" } });
  //     fireEvent.click(loginButton);
  //   });

  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LIST_SHARED_VIDEOS);
  //   });
  // });

  it("submits the login form in case invalid email or invalid password", async () => {
    setUp(mockContext);

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const loginButton = screen.getByText("LOGIN");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "tuanda@apero.vn" } });
      fireEvent.change(passwordInput, { target: { value: "1234567" } });
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      const messageError = screen.getByText(
        "Email or password is incorrect. Please check again."
      );

      expect(messageError).toBeInTheDocument();
    });
  });

  it("shows error email text when entering invalid email", async () => {
    setUp(mockContext);

    const emailInput = screen.getByPlaceholderText("Your email");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "client" } });
    });

    const messageError = await screen.findByText("Invalid email");

    expect(messageError).toBeInTheDocument();
  });

  it("shows error password text when entering invalid password", async () => {
    setUp(mockContext);

    const passwordInput = screen.getByPlaceholderText("Your password");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(passwordInput, { target: { value: "123" } });
    });

    const messageError = await screen.findByText(
      "Password must be at least 6 characters"
    );

    expect(messageError).toBeInTheDocument();
  });

  it("navigate to register page in case click create an account link", () => {
    setUp(mockContext);
    const createAccountLink = screen.getByText("Create an account");

    fireEvent.click(createAccountLink);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.REGISTER);
  });
});

const setUp = (appContext: any) => {
  render(
    <AppContext.Provider value={appContext}>
      <Router>
        <Login />
      </Router>
    </AppContext.Provider>
  );
};
