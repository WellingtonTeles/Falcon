import renderer from 'react-test-renderer';
import Button from './button';

it('Test the buttons', () => {
    const component = renderer.create(
        <Button title="test-btn" onClickBtn={()=> {}}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
