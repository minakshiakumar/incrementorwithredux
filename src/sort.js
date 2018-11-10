import React from 'react';
import { connect } from 'react-redux';
import * as listActionCreator from './action/listActionCreator';
import { bindActionCreators } from 'redux';
import List from './list';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as ACTION_TYPE from './action/actionType';

export class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder:1 // 1 -> asc , -1 -> desc
        }
    }
    componentWillMount(){
        // var obj={};
        // this.props.actions.getAllList(obj);
    }
    //For receiving updated store values
    componentWillReceiveProps(nextProps) {
        // var state = this.state;
        // state.list = (nextProps && nextProps.listData) ? nextProps.listData: state.list;
        // this.setState(state);

    }
    changeSortOrder=(e)=>{
     var state = this.state;
     state.sortOrder = (state.sortOrder==1)?-1:1;
     this.setState(state);
     this.props.dispatch({ type: ACTION_TYPE.GET_LIST ,sortOrder:this.state.sortOrder});
     console.log(state,"sort state");
    }

    render() {
        // var list =this.state.list;
        return (
            <div>
                <div className="list-outer">
                    <p className="list-head"> From Label Service and Packing Slip  Company List</p>
                        <div className="col-md-8 sort-palette">
                            <div className="row">
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-10">
                                </div>
                                <div className="col-md-1">
                                    <Router>
                                        <Link to="" onClick={this.changeSortOrder}><img className="sort-down-icon" src={require('./image/sort-icon.PNG')} /></Link>
                                            {   /* <i className="fa fa-sort-alpha-down"></i> */}
                                    </Router>
                                </div>
                            </div>
                        </div>
                   <List sortOrderValue={this.state.sortOrder}/>
                </div>
            </div>

        )
    }
}

// function mapStateToProps(state) {
//     return {
//         listData: state.listReducer.listData
//     };
// }
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(listActionCreator, dispatch) }
  }

export default connect(mapDispatchToProps)(Sort);

// export default Sort;
