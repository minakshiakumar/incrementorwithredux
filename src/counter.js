
import React from 'react';
import { connect } from 'react-redux';
import * as CONSTANT_VALUES from './constant'
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: CONSTANT_VALUES.maxCounterValue
    }
  }
  //For receiving updated store values
  componentWillReceiveProps(nextProps) {
    var state = this.state;
    state.count = (nextProps && nextProps.count) ? nextProps.count : state.count;
    this.setState(state);
  }
  // For changing input of counter & validating counter value should not be greater than 100
  onChange = (e) => {
    var state = this.state;
    if (e.target.value === '' || (CONSTANT_VALUES.counterRegex).test(e.target.value)) 
    {
      // if(){
        
      // }
      state.count = (Number(e.target.value) > CONSTANT_VALUES.maxCounterValue) ? CONSTANT_VALUES.maxCounterValue : Number(e.target.value);
      this.setState(state);
      this.props.dispatch({ type: 'ONCHANGE', counter: Number(e.target.value) });

    }

  }
  // For incrementing counter value by 1
  increment = () => {
    console.log("on increment", this.state.count);
    if (this.state.count < CONSTANT_VALUES.maxCounterValue) {
      this.props.dispatch({ type: 'INCREMENT', counter: this.state.count });
    } else {
      console.log("No action on incrementor");
    }

  }
  // For decrementing counter value by 1
  decrement = () => {
    var state= this.state;
    console.log("on decrement", this.state.count);
    if (this.state.count > CONSTANT_VALUES.minCounterValue && this.state.count !== CONSTANT_VALUES.min2CounterValue) {
      this.props.dispatch({ type: 'DECREMENT', counter: this.state.count });
    }
    else if (this.state.count === CONSTANT_VALUES.min2CounterValue) {
      state.count=CONSTANT_VALUES.minCounterValue;
      this.setState(state);
      this.props.dispatch({ type: 'ONCHANGE', counter: CONSTANT_VALUES.minCounterValue });
      console.log("No action on decrementor");
    } else {
      console.log("No action on decrementor");

    }
  }
  render() {
    return (
      <div id="outer-div">
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <input type="text" id="counter" value={this.state.count} onChange={this.onChange} />
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("map state to", state);
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);