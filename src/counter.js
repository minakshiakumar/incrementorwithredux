import React from 'react';
import { connect } from 'react-redux';
import * as CONSTANT_VALUES from './constant';
import * as ACTION_TYPE from './action/actionType';

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: CONSTANT_VALUES.MIN_COUNTER_VALUE
    }
    this.increment = this.increment.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  //For receiving updated store values
  componentWillReceiveProps(nextProps) {
    var state = this.state;
    state.count = (nextProps && nextProps.count) ? nextProps.count : state.count;
    this.setState(state);
  }
  // For changing input of counter & validating counter value should not be greater than 100
  onChange(e) {
    var state = this.state;
    if (e.target.value === '' || (CONSTANT_VALUES.COUNTER_REGEX).test(e.target.value)) {
      state.count = (Number(e.target.value) > CONSTANT_VALUES.MAX_COUNTER_VALUE) ? CONSTANT_VALUES.MAX_COUNTER_VALUE : Number(e.target.value);
      this.setState(state);
      this.props.dispatch({ type: ACTION_TYPE.ONCHANGE, counter: state.count });

    }

  }
  // For incrementing counter value by 1
  increment() {
    if (this.state.count < CONSTANT_VALUES.MAX_COUNTER_VALUE) {
      this.props.dispatch({ type: ACTION_TYPE.INCREMENT, counter: this.state.count });
    }
  }
  // For decrementing counter value by 1
  decrement = () => {
    var state = this.state;
    if (this.state.count > CONSTANT_VALUES.MIN_COUNTER_VALUE && this.state.count !== CONSTANT_VALUES.MIN2_COUNTER_VALUE) {
      this.props.dispatch({ type: ACTION_TYPE.DECREMENT, counter: this.state.count });
    }
    else if (this.state.count === CONSTANT_VALUES.MIN2_COUNTER_VALUE) {
      state.count = CONSTANT_VALUES.MIN_COUNTER_VALUE;
      this.setState(state);
      this.props.dispatch({ type: ACTION_TYPE.ONCHANGE, counter: CONSTANT_VALUES.MIN_COUNTER_VALUE });
    }
  }
  render() {
    return (
      <div id="outer-div">
        <h2>Counter</h2>
        <div>
          <button id="decrement" onClick={this.decrement}>-</button>
          <input type="text" id="counter" value={this.state.count} onChange={this.onChange} />
          <button id="increment" onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("map state to", state.counterReducer.count, state);
  return {
    count: state.counterReducer.count
  };
}

export default connect(mapStateToProps)(Counter);