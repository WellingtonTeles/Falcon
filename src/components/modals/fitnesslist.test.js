import renderer from 'react-test-renderer';
import FitnessCriteriaModal from './fitnesslist';


it('Test the FitnesssCriteriaModal', () => {
    const closeModal = () => {}
    const saveModal = () => {}
    const currentAccount = {
        name: 'admin',
        website: 'https://www.google.com/',
        key_contacts: []
    }
    const component = renderer.create(
        <FitnessCriteriaModal closeModal={closeModal} saveModal={saveModal} currentAccount={currentAccount}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})