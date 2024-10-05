import renderer from "react-test-renderer";
import Header from "./header";

it('renders correctly', () => {
    const subItem = {
        btngroup: [
            "btn1",
            "btn2"
        ],
        title: 'title',
        subTitle: 'sub title',
        prospect_company_name: 'pros_company',
    }
    const onPrevMain = (name) => {}
    const tree = renderer
      .create(<Header title={"title"} subItem={subItem} onPrevMain={onPrevMain} preview={true} tag={""}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});