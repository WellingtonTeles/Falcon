import { renderWithProviders } from '../../test/test-utils';
import ForgotPassword from './forgot-password';

it('Test the ForgotPassword', () => {
    const { container } = renderWithProviders(<ForgotPassword/>)
    expect(container.firstChild).toMatchSnapshot();
})