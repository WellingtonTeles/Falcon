import { renderWithProviders } from '../../test/test-utils';
import EditUser from './editUser';

it('Test the EditUser Page', () => {
    const updatedFunc = () => {}
    const propUser={
        id: "1000",
        name: "Robbie",
        email: "rob@g.com"
    }
    const companyList = [
        {
            name: 'A'
        }
    ]
    const { container } = renderWithProviders(<EditUser propUser={propUser} updatedFunc companyList={companyList}/>)
    expect(container.firstChild).toMatchSnapshot();
})
