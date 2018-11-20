
import React from 'react';
import { render } from 'react-dom';
import Counter from './counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import * as root from './reducer/combineReducer'
import Sort from './sort';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

//store creation
const store = createStore(root.rootReducer);
const App = () => (
  <Provider store={store}>
    <div>
      <Counter maxCounterValue={1000} minCounterValue={0} counterRegex={/^[0-9\b]+$/} changeCounterBy={2} />
      <Sort />
    </div>
  </Provider>
);

render(<App />, document.getElementById('root'));
