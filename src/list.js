import React from 'react';
import { connect } from 'react-redux';
import * as listActionCreator from './action/listActionCreator';
import { bindActionCreators } from 'redux';

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        }
    }
    componentWillMount(){
        console.log(this.props.sortOrderValue,"sortOrderValue");
        var obj={
            sortOrder:this.props.sortOrderValue
        };
        this.props.actions.getAllList(obj);
    }
    //For receiving updated store values
    componentWillReceiveProps(nextProps) {
        var state = this.state;
        state.list = (nextProps && nextProps.listData) ? nextProps.listData: state.list;
        this.setState(state);

    }

    render() {
        var list =this.state.list;
        return (
            <div>
                    {list.length>0?
                   list.map((item,key) => <div key={key} className="col-md-8 grid-container">
                        <div className="grid-item no-rht-border curve-left-border">
                            <label>
                                <input type="checkbox" name="" value=""/>
                                <i className="checkbox-helper"></i>
                            </label>
                        </div>
                        <div className="grid-item no-rht-border">
                            <p className="para1">{item.type}</p>
                            <p className="para2">{item.desc}</p>
                        </div>
                        <div className="grid-item no-rht-border"> 
                                <p className="label-heading">LABEL NAME</p>
                                <p className="label-para">{item.labelName}</p>
                        </div>  
                        <div className="grid-item no-rht-border">
                            <p className="label-heading">LABEL UID</p>
                            <p className="label-para">{item.labelId}</p>
                        </div>
                        <div className="grid-item curve-right-border">
                                <i className="fa fa-cloud-download fa-color"></i>
                        </div>
                        </div>):''}
                    </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listData: state.listReducer.listData
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(listActionCreator, dispatch) }
  }

export default connect(mapStateToProps,mapDispatchToProps)(List);
