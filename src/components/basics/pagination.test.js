import renderer from 'react-test-renderer';
import Pagination from './pagination';

it('Test the Pagination', () => {
    const component = renderer.create(
        <Pagination/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
