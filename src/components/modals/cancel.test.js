import renderer from 'react-test-renderer';
import CancelModal from './cancel';

it('Test the Cancel Modal', () => {
    const closeModal = () => {}
    const saveModal = () => {}
    const component = renderer.create(
        <CancelModal closeModal={closeModal} saveModal={saveModal} title={"title"} description={"description"} name={"name"}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})