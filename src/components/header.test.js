import renderer from 'react-test-renderer';
import Header from './header';


it('Test the Header', () => {
    const onPrevMain = () => {}
    const title="title", subItem={
        title: 'title',
        subTitle: 'subTitle',
        btngroup: []
    }
    const component = renderer.create(
        <Header title={title} subItem={subItem} preview={true} tag={true}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})