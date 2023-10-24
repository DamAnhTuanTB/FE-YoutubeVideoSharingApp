import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import Register from "../index";

afterEach(() => {
  cleanup();
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

describe("Register Page", () => {
  it("renders the register page with form elements", () => {
    setUp();

    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    const registerButton = screen.getByText("REGISTER");
    const loginInsteadLink = screen.getByText("Login instead");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(loginInsteadLink).toBeInTheDocument();
  });

  it("submits the register form in case empty email, not empty password, not empty password confirm", async () => {
    setUp();
    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    const registerButton = screen.getByText("REGISTER");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(registerButton);
    });

    const errorMessageEmail = await screen.findByText(
      "Email is a required field"
    );
    const successMessageElement = screen.queryByText(
      "You have successfully registered. Please log in to continue."
    );
    expect(successMessageElement).toBeNull();
    expect(errorMessageEmail).toBeInTheDocument();
  });

  it("submits the register form in case empty password, not empty email, not empty password confirm", async () => {
    setUp();
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    const registerButton = screen.getByText("REGISTER");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "client@gmail.com" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(registerButton);
    });

    const errorMessagePassword = await screen.findByText(
      "Password is a required field"
    );
    const successMessageElement = screen.queryByText(
      "You have successfully registered. Please log in to continue."
    );
    expect(successMessageElement).toBeNull();
    expect(errorMessagePassword).toBeInTheDocument();
  });

  it("submits the register form in case empty confirm password, not empty email, not empty password", async () => {
    setUp();
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const registerButton = screen.getByText("REGISTER");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "client@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.click(registerButton);
    });

    const errorMessagePasswordConfirm = await screen.findByText(
      "Password confirmation is a required field"
    );
    const successMessageElement = screen.queryByText(
      "You have successfully registered. Please log in to continue."
    );
    expect(successMessageElement).toBeNull();

    expect(errorMessagePasswordConfirm).toBeInTheDocument();
  });

  it("submits the register form in case empty email, empty password, empty confirm password", async () => {
    setUp();

    const registerButton = screen.getByText("REGISTER");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.click(registerButton);
    });

    const messageErrorEmail = await screen.findByText(
      "Email is a required field"
    );

    const messageErrorPassword = await screen.findByText(
      "Password is a required field"
    );

    const messageErrorCofirmPassword = await screen.findByText(
      "Password confirmation is a required field"
    );
    expect(messageErrorEmail).toBeInTheDocument();
    expect(messageErrorPassword).toBeInTheDocument();
    expect(messageErrorCofirmPassword).toBeInTheDocument();
  });

  it("submits the login form in case valid email and valid password and valid password confirm", async () => {
    setUp();
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    const registerButton = screen.getByText("REGISTER");

    const randomNumber =
      Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: `client${randomNumber}${randomNumber}@gmail.com` },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(registerButton);
    });

    const messageErrorEmail = screen.queryByText("Email is a required field");

    const messageErrorPassword = screen.queryByText(
      "Password is a required field"
    );

    const messageErrorPasswordConfirm = screen.queryByText(
      "Password confirmation is a required field"
    );

    expect(messageErrorEmail).toBeNull();
    expect(messageErrorPassword).toBeNull();
    expect(messageErrorPasswordConfirm).toBeNull();

    const successMessage = await screen.findByText(
      "You have successfully registered. Please log in to continue."
    );

    expect(successMessage).toBeInTheDocument();
  });

  it("navigate to login page in case success login", async () => {
    setUp();
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    const registerButton = screen.getByText("REGISTER");

    const randomNumber =
      Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: `client${randomNumber}${randomNumber}@gmail.com` },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(registerButton);
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });

  it("shows error email text when entering invalid email", async () => {
    setUp();

    const emailInput = screen.getByPlaceholderText("Your email");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, { target: { value: "client" } });
    });

    const messageError = await screen.findByText("Invalid email");

    expect(messageError).toBeInTheDocument();
  });

  it("shows error password text when entering invalid password", async () => {
    setUp();

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

  it("shows error confirm password not match when entering confirm password different password", async () => {
    setUp();

    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(passwordInput, { target: { value: "123456789" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
    });

    const messageError = await screen.findByText(
      "Password confirmation does not match"
    );

    expect(messageError).toBeInTheDocument();
  });

  it("do not show error confirm password not match when entering confirm password same as password", async () => {
    setUp();

    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(passwordInput, { target: { value: "123456789" } });
      fireEvent.change(passwordConfirmInput, {
        target: { value: "123456789" },
      });
    });

    const messageError = screen.queryByText(
      "Password confirmation does not match"
    );

    expect(messageError).toBeNull();
  });

  it("show error email has been register when submit form with exist account", async () => {
    setUp();
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Your password");
    const passwordConfirmInput = screen.getByPlaceholderText(
      "Your password confirmation"
    );

    const registerButton = screen.getByText("REGISTER");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(emailInput, {
        target: { value: "client@gmail.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123456" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "123456" } });
      fireEvent.click(registerButton);
    });

    const errorMessage = await screen.findByText(
      "Email actually exists. Please check again."
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it("navigate to register page in case click create an account link", () => {
    setUp();
    const loginInsteadLink = screen.getByText("Login instead");
    fireEvent.click(loginInsteadLink);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});

const setUp = () => {
  render(
    <Router>
      <Register />
    </Router>
  );
};
