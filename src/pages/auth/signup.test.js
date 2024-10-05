import { renderWithProviders } from "../../test/test-utils";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Signup from "./signup";

it("Test the Signup", async () => {
  const { container, getByPlaceholderText, getByText } = renderWithProviders(
    <Login />
  );
  // expect(container.firstChild).toMatchSnapshot();

  const emailInput = getByPlaceholderText("Enter email");
  const passwordInput = getByPlaceholderText("Enter password");
  fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "validpassword" } });

  fireEvent.click(getByText("Signup"));
  // await waitFor(() => expect(getByText('Loading...')).toBeInTheDocument());
  expect(container.firstChild).toMatchSnapshot();
});
