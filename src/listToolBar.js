import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as listActionCreator from './action/listActionCreator';
import { bindActionCreators } from 'redux';
import List from './list';
import * as ACTION_TYPE from './action/actionType';
import _ from 'underscore';

export class ListToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder: 1,// 1 -> asc , -1 -> desc
            isChecked: false
        }
    }
    //For receiving updated store values
    componentWillReceiveProps(nextProps) {
        console.log("SSSSSSSSSssss", nextProps);
        var state = this.state;
        state.isChecked = (nextProps && nextProps.listToolCheckValue) ? nextProps.listToolCheckValue : state.isChecked;
        this.setState(state);
    }
    onChange = (e) => {
        this.setState({
            isChecked: !this.state.isChecked
        });
        let obj = { type: ACTION_TYPE.LIST_TOOL_CHECK_STATUS, listToolCheckStatus: this.state.isChecked };
        this.props.actions.changeListToolCheckStatus(obj);
    }
    onChangeOfIndividualCheckValue(key, e) {
        var state = this.state;
        state.rowCheckFlag[key] = !state.rowCheckFlag[key];
        this.setState(state);
        if (_.contains(state.rowCheckFlag, false)) {
            let obj = { type: ACTION_TYPE.LIST_TOOL_CHECK_STATUS, listToolCheckStatus: false };
            this.props.actions.changeListToolCheckStatus(obj);
        } else {
            let obj = { type: ACTION_TYPE.LIST_TOOL_CHECK_STATUS, listToolCheckStatus: true };
            this.props.actions.changeListToolCheckStatus(obj);

        }
    }
    changeSortOrder = (e) => {
        e.preventDefault();
        var state = this.state;
        state.sortOrder = (state.sortOrder === 1) ? -1 : 1;
        this.setState(state);
        var obj = {
            sortOrder: this.state.sortOrder,
            listToolCheckStatus: this.state.isChecked
        };
        this.props.actions.getAllList(obj);
    }
    render() {
        return (
            <div>
                <div className="col-md-8 sort">
                    <div className="row">
                        <div className="col-md-1">
                            <span>
                                <label>
                                    <input type="checkbox" name="listCheckbox" checked={!this.state.isChecked} onChange={this.onChange} />
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
                <List isCheckAll={this.state.isChecked} changeRowCheckValue={this.onChangeOfIndividualCheckValue} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        listToolCheckValue: state.listReducer.listToolCheckStatus
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(listActionCreator, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListToolBar);
