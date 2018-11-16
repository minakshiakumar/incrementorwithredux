import React from 'react';
import { connect } from 'react-redux';
import * as listActionCreator from './action/listActionCreator';
import { bindActionCreators } from 'redux';
import List from './list';
import { BrowserRouter as Router, Link } from "react-router-dom";
import * as ACTION_TYPE from './action/actionType';
import MetaTags from 'react-meta-tags';

export class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder: 1 // 1 -> asc , -1 -> desc
        }
    }
    componentWillMount() {
    }
    //For receiving updated store values
    componentWillReceiveProps(nextProps) {
    }
    changeSortOrder = (e) => {
        var state = this.state;
        state.sortOrder = (state.sortOrder === 1) ? -1 : 1;
        this.setState(state);
        this.props.dispatch({ type: ACTION_TYPE.GET_LIST, sortOrder: this.state.sortOrder });
    }

    render() {
        return (
            <div>
                <MetaTags>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </MetaTags>
                <div className="list-outer">
                    <p className="list-head"> Label Service and Packing Slip  Company List</p>
                    <div className="col-md-8 sort">
                        <div className="row">
                            <div className="col-md-1">
                                <span>
                                    <label>
                                        <input type="checkbox" name="" value="" />
                                        <i className="checkbox-helper2"></i>
                                    </label>
                                </span>
                            </div>
                            <div className="col-md-10">
                            </div>
                            <div className="col-md-1">
                                <Router>
                                    <Link to="" onClick={this.changeSortOrder}>
                                        {this.state.sortOrder === 1 ? <img alt="sort icon" className="sort-down-icon" src={require('./image/sort-icon.PNG')} /> : <img alt="sort icon" className="sort-up-icon" src={require('./image/sort-up-icon.PNG')} />}
                                    </Link>
                                </Router>
                            </div>
                        </div>
                    </div>
                    <List sortOrderValue={this.state.sortOrder} />
                </div>
            </div>

        )
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(listActionCreator, dispatch) }
}

export default connect(mapDispatchToProps)(Sort);
