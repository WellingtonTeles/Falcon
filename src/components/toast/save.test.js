import renderer from 'react-test-renderer';
import SaveToast from './save';


it('Test the SaveToast', () => {
    const closeToast = () => {}
    const toast = 1
    const error = "error"
    const component = renderer.create(
        <SaveToast closeToast toast error/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})