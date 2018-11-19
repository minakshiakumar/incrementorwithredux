//reducer creation 
import * as ACTION_TYPE from '../action/actionType'

export default function counterReducer(state = [], action) {
  console.log("action value", action);
  switch (action.type) {
    case ACTION_TYPE.INCREMENT:
      return {
        count: action.counter + action.changeCounterBy
      };
    case ACTION_TYPE.DECREMENT:
      return {
        count: action.counter - action.changeCounterBy
      };
    case ACTION_TYPE.ONCHANGE:
      return {
        count: action.counter
      };
    default:
      return state;
  }
}