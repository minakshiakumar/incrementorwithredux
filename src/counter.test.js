import React from "react";
import {Counter} from './counter';
import renderer from "react-test-renderer";
import { mount } from "enzyme";
// import { configure,mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';

// configure({ adapter: new Adapter() });;


describe("Counter", () => {
    it("renders xcorrectly", () => {
        const output = renderer
      .create(<div id="outer-div">
      <h2>Counter</h2>
      <div>
        <button >-</button>
        <input type="text"  />
        <button >+</button>
      </div>
    </div>)
      .toJSON();
    expect(output).toMatchSnapshot();
    });

  //   it("calls on change on click", () => {
  //     const onChangeSpy = jest.fn();
      
  //     const wrapper = mount(<Counter/>);
  //   wrapper.find("input").first().simulate("change");
  //   expect(onChangeSpy).toHaveBeenCalled();
  // });



  

});