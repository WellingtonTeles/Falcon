import { renderWithProviders } from '../../test/test-utils';
import UserModal from './user';

it('Test the UserModal', () => {
    const closeModal = () => {}
    const saveModal = () => {}
    const companyList = [
        {
            name: 'company A'
        },
        {
            name: 'company B'
        }
    ]
    const component = renderWithProviders(
        <UserModal closeModal={closeModal} companyList={companyList} saveModal={saveModal}/>
    );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    expect(component).toMatchSnapshot();
})