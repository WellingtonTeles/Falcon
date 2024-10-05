import { renderWithProviders } from '../../test/test-utils';
import GlobalSettings from './globalsettings';

it('Test the GlobalSettings Page', () => {
    const { container } = renderWithProviders(<GlobalSettings/>)
    expect(container.firstChild).toMatchSnapshot();
})
