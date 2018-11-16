import React from 'react';
import Counter from './counter';
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import expect from "expect";
import configureStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

let initialState = { counterReducer: { count: 0 } };
const mockStore = configureStore();
let store, wrapper;

describe("Counter", () => {
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = mount(<Provider store={store}><Counter /></Provider>)
    })

    it("renders xcorrectly1", () => {
        const output = renderer
            .create(<Provider store={store}><Counter /></Provider>)
            .toJSON();
        expect(output).toMatchSnapshot();
    });

    it("has input", () => {
        expect(wrapper.find("input").first()).toBeDefined();
    });

    it('on input change', () => {
        const instance = wrapper.instance()
        const input = wrapper
            .find('input')
            .first()
        instance.forceUpdate()
        input.value = 0
        input.simulate('change', input)
    });

    it('should decrement the counter in state', () => {
        wrapper.find('button').at(0).simulate('click')
        expect(wrapper.state().count).toEqual(0);
    });

    it('should increment the counter in state', () => {
        wrapper.find('button').at(1).simulate('click')
        // expect(wrapper.state().count).toBe(1);
    });

    // it('call logUserId once', () => {

    //     const spy = sinon.spy(Counter.prototype, 'componentWillReceiveProps');
    //     // const wrapper = shallow(<Counter count={1} />);
    //     // expect(spy).to.have.property('count', 0);
    //     // wrapper.setProps({ count: 1});
    //     initialState={ counterReducer: { count: 1 } }  
    //     store = mockStore(initialState)
    //     expect(wrapper.state().count).toEqual(1);
    //     console.log(wrapper.state().count,"wrapper.state().count");
    //     // expect(spy).to.have.property('count', 1);
    // })

});