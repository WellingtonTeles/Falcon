import { renderWithProviders } from '../../test/test-utils';
import Users from './users';

it('Test the User Page', () => {
    const updateTag = () => {}
    const { container } = renderWithProviders(<Users updateTag={updateTag}/>)
    expect(container.firstChild).toMatchSnapshot();
})
