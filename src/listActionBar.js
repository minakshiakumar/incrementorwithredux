import React from 'react';
import { connect } from 'react-redux';
import * as listActionCreator from './action/listActionCreator';
import { bindActionCreators } from 'redux';

export class ListActionBar extends React.Component {
    constructor(props) {
        super(props);
        
    }
    //For receiving updated store values
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }
    render() {
        return (<div className="col-md-8 sort">
            <div className="row">
                <div className="" style={{backgroundColor:"red"}}>
                    
                </div>
            </div>
        </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(listActionCreator, dispatch) }
}
export default connect(mapDispatchToProps)(ListActionBar);
