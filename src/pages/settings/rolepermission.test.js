import { renderWithProviders } from '../../test/test-utils';
import RolePermission from './rolepermisson';

it('Test the RolePermission Page', () => {
    const { container } = renderWithProviders(<RolePermission/>)
    expect(container.firstChild).toMatchSnapshot();
})
