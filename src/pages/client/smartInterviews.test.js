import { renderWithProviders } from "../test/test-utils";
import SmartInterviews from "./smartInterviews";

it("Test the SmartInterviews Page", () => {
  const { container } = renderWithProviders(<SmartInterviews />);
  expect(container.firstChild).toMatchSnapshot();
});
