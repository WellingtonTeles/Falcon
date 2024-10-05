import { renderWithProviders } from '../test/test-utils';
import Sidebar from './sidebar';

it('Test the Sidbar', () => {
    const { container: cont1 } = renderWithProviders(<Sidebar page={'dashboard'}/>)
    expect(cont1.firstChild).toMatchSnapshot();
    const { container: cont2} = renderWithProviders(<Sidebar page={'accounts'}/>)
    expect(cont2.firstChild).toMatchSnapshot();
    const { container: cont3} = renderWithProviders(<Sidebar page={'settings'}/>)
    expect(cont3.firstChild).toMatchSnapshot();
})
