import renderer from 'react-test-renderer';
import SignoutModal from './signout';


it('Test the UploadModal', () => {
    const closeModal = () => {}
    const saveModal = () => {}
    const currentUpload = {
        name: 'admin',
        website: 'https://www.google.com/',
        key_contacts: [
            'a@b.com',
            'c@g.com'
        ]
    }
    const component = renderer.create(
        <SignoutModal closeModal={closeModal} saveModal={saveModal} currentUpload={currentUpload}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})