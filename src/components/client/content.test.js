import renderer from 'react-test-renderer';
import Content from './content';

it('renders correctly', () => {
    const tree = renderer
      .create(<Content></Content>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});