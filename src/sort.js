import React from 'react';
import { connect } from 'react-redux';
import * as listActionCreator from './action/listActionCreator';
import { bindActionCreators } from 'redux';
import ListToolBar from './listToolBar';
import MetaTags from 'react-meta-tags';

export class Sort extends React.Component {
    //For receiving updated store values
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (
            <div>
                <MetaTags>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </MetaTags>
                <div className="list-outer">
                    <p className="list-head"> Label Service and Packing Slip  Company List</p>
                    <ListToolBar />
                </div>
            </div>

        )
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(listActionCreator, dispatch) }
}

export default connect(mapDispatchToProps)(Sort);
