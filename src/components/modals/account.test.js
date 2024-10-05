import renderer from 'react-test-renderer';
import AccountModal from './account';

it('Test the Account Modal', () => {
    const closeModal = () => {}
    const saveModal = () => {}
    const currentAccount = {
        name: 'admin',
        website: 'https://www.google.com/',
        key_contacts: []
    }
    const component = renderer.create(
        <AccountModal closeModal={closeModal} currentAccount={currentAccount} saveModal={saveModal}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})