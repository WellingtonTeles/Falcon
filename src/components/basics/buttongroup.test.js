import renderer from 'react-test-renderer';
import ButtonGroup from './buttongroup';

it('Test the Button Group', () => {
    const component = renderer.create(
        <ButtonGroup items={{btngroup:['content','test2']}} tag="content"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
