import renderer from 'react-test-renderer';
import SignoutModal from './signout';


it('Test the SignoutModal', () => {
    const closeModal = () => {}
    const approveModal = () => {}
    const component = renderer.create(
        <SignoutModal closeModal={closeModal} approveModal={approveModal} title={"title"} description={"description"} visible/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})