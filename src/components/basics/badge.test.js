import renderer from 'react-test-renderer';
import Badge from './badge';

it('Test the badges', () => {
    const component = renderer.create(
        <Badge title="test"/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
