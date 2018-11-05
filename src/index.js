
import React from 'react';
import { render } from 'react-dom';
import Counter from './counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import * as CONSTANT_VALUES from './constant'
import './index.css';

//reducer creation 
function reducer(state = [], action) {
  console.log("action value", action);
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: action.counter + 1
      };
    case 'DECREMENT':
      return {
        count: action.counter - 1
      };
    case 'ONCHANGE':
    console.log("on change");
      return {
        count: action.counter
      };
    default:
      return state;
  }
}

//store creation
const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById('root'));
