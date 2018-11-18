import React from 'react';
import Counter from './counter';
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import expect from "expect";
import configureStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ACTION_TYPE from './action/actionType';
import reducer from './reducer/counterReducer'
import * as CONSTANT_VALUES from './constant';

configure({ adapter: new Adapter() });

let initialState = { counterReducer: { count: 0 } };
const mockStore = configureStore();
let store, wrapper, componentWillReceivePropsSpy;

describe("Counter", () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><Counter /></Provider>);
        componentWillReceivePropsSpy = jest.spyOn(Counter.prototype, 'componentWillReceiveProps');
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
        input.value = 2
        input.simulate('change', input);
        expect(
            reducer([], {
                type: ACTION_TYPE.ONCHANGE, counter: input.value
            })
        ).toEqual(
            {
                count: input.value
            }
        )

    });

    it('should decrement the counter in state', () => {
        let currentCount = store.getState().counterReducer.count;
        wrapper.find('button').at(0).simulate('click');
        if (currentCount > CONSTANT_VALUES.Min_COUNTER_VALUE && currentCount !== CONSTANT_VALUES.Min2_COUNTER_VALUE) {
            expect(
                reducer([], {
                    type: ACTION_TYPE.DECREMENT, counter: currentCount
                })
            ).toEqual(
                {
                    count: currentCount - 1
                }
            )
        } else if (currentCount === 1) {

            expect(
                reducer([], {
                    type: ACTION_TYPE.ONCHANGE, counter: currentCount
                })
            ).toEqual(
                {
                    count: currentCount - 1
                }
            )
        } else {
            expect(reducer([], {})).toEqual([]);
        }
    });

    it('should increment the counter in state', () => {
        let currentCount = store.getState().counterReducer.count;
        wrapper.find('button').at(1).simulate('click')
        if (currentCount < CONSTANT_VALUES.MAX_COUNTER_VALUE) {
            expect(
                reducer([], {
                    type: ACTION_TYPE.INCREMENT, counter: currentCount
                })
            ).toEqual(
                {
                    count: currentCount + 1
                }
            )
        } else {
            expect(reducer([], {})).toEqual([]);
        }
    });

});