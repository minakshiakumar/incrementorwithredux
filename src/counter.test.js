import React from 'react';
import Counter from './counter';
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import expect from "expect";
import configureStore from 'redux-mock-store';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as ACTION_TYPE from './action/actionType';
import Reducer from './reducer/counterReducer'
import * as CONSTANT_VALUES from './constant';

configure({ adapter: new Adapter() });

let initialState = { counterReducer: { count: 9 } };
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
            .create(<Provider store={store}><Counter maxCounterValue={1000} minCounterValue={0} counterRegex={/^[0-9\b]+$/} changeCounterBy={2}/></Provider>)
            .toJSON();
        expect(output).toMatchSnapshot();
    });

    it("has input", () => {
        expect(wrapper.find("input").first()).toBeDefined();
    });

    it('on input change', () => {
        const instance = wrapper.instance();
        const input = wrapper
            .find('input')
            .first()
        instance.forceUpdate();
        input.value = 6;
        input.simulate('change', input);
        expect(
            Reducer([], {
                type: ACTION_TYPE.ONCHANGE, counter: input.value,changeCounterBy:input.value
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
        if (currentCount > CONSTANT_VALUES.MIN_COUNTER_VALUE && currentCount !== CONSTANT_VALUES.MIN2_COUNTER_VALUE) {
            expect(
                Reducer([], {
                    type: ACTION_TYPE.DECREMENT, counter: currentCount,changeCounterBy:2
                })
            ).toEqual(
                {
                    count: currentCount - 2
                }
            )
        } else if (currentCount === 1) {
            expect(
                Reducer([], {
                    type: ACTION_TYPE.ONCHANGE, counter: currentCount - 1,changeCounterBy:2
                })
            ).toEqual(
                {
                    count: currentCount - 2
                }
            )
        } else {
            expect(Reducer([], {})).toEqual([]);
        }
    });

    it('should return the initial state', () => {
        expect(Reducer([], {})).toEqual([]);
    });

    it('should handle ONCHANGE action type', () => {
        let currentCount = store.getState().counterReducer.count;
        let action = {
            type: ACTION_TYPE.ONCHANGE,
            counter: currentCount,
            changeCounterBy:2
        }
        expect(Reducer({}, action)).toEqual({ count: currentCount });
    });

    it('should handle INCREMENT action type', () => {
        let currentCount = store.getState().counterReducer.count;
        let action = {
            type: ACTION_TYPE.INCREMENT,
            counter: currentCount,
            changeCounterBy:2
        }
        expect(Reducer({}, action)).toEqual({ count: currentCount + 2 });
    });

    it('should handle DECREMENT action type', () => {
        let currentCount = store.getState().counterReducer.count;
        let action = {
            type: ACTION_TYPE.DECREMENT,
            counter: currentCount,
            changeCounterBy:2
        }
        expect(Reducer({}, action)).toEqual({ count: currentCount - 2 });
    });
    it('should increment the counter in state', () => {
        let currentCount = store.getState().counterReducer.count;
        wrapper.find('button').at(1).simulate('click')
        if (currentCount < CONSTANT_VALUES.MAX_COUNTER_VALUE) {
            expect(
                Reducer([], {
                    type: ACTION_TYPE.INCREMENT, counter: currentCount,changeCounterBy:2
                })
            ).toEqual(
                {
                    count: currentCount + 2
                }
            )
        } else {
            expect(Reducer([], {})).toEqual([]);
        }
    });

    it('call componentWillRecieveProps once', () => {
        Reducer([], {
            type: ACTION_TYPE.INCREMENT, counter: 8
        })
        expect(Counter.prototype.componentWillReceiveProps).toHaveBeenCalled();
    })

    
});
