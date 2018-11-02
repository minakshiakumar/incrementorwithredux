
import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state={
      count:0
    }
  }

  componentWillReceiveProps(nextProps) {
    var state=this.state;
    state.count =(nextProps && nextProps.count)?nextProps.count:state.count;
    this.setState(state);
  }
    onChange = (e) =>{
      var state=this.state;
      state.count = Number(e.target.value);
      this.setState(state);
      
  }                               
  increment = () => {
    console.log("on increment",this.state.count);
    this.props.dispatch({ type: 'INCREMENT',counter :this.state.count});
  }

  decrement = () => {
    console.log("on decrement",this.state.count);
    this.props.dispatch({ type: 'DECREMENT',counter:this.state.count  });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <input type="number" id="counter" min="-9999" value={this.state.count} onChange={this.onChange} />
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log("map state to",state);
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);