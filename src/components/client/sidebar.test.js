import { renderWithProviders } from '../../test/test-utils';
import Sidebar from "./sidebar";

it('renders correctly', () => {
    const { container } = renderWithProviders(<Sidebar/>)
    expect(container.firstChild).toMatchSnapshot();
});