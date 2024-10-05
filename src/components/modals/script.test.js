import renderer from 'react-test-renderer';
import InterviewScriptModal from './script';


it('Test the InterviewScriptModal', () => {
    const closeModal = () => {}
    const saveModal = () => {}
    const currentAccount = {
        name: 'admin',
        website: 'https://www.google.com/',
        key_contacts: []
    }
    const component = renderer.create(
        <InterviewScriptModal closeModal={closeModal} saveModal={saveModal} currentAccount={currentAccount}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})