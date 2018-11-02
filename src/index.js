
import React from 'react';
import { render } from 'react-dom';
import Counter from './counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';

function reducer(state = [], action) {
  console.log("action value",action);
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: action.counter + 1
      };
    case 'DECREMENT':
      return {
        count: action.counter - 1
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);

render(<App />, document.getElementById('root'));
