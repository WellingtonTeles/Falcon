import renderer from 'react-test-renderer';
import coffee from './../../assets/images/coffee.png';
import IncentiveCard from './incentive';
import { renderWithProviders } from '../../test/test-utils';

it('Test the Cards', () => {
    const { container, store } = renderWithProviders(<IncentiveCard title="test-card" img={coffee}/>)
    expect(container.firstChild).toMatchSnapshot();

    // const component = renderer.create(
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
})
