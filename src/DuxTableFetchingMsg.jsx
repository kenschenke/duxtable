import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableFetchingMsgProps } from './maps/DuxTableFetchingMsg.map';
import { connect } from 'react-redux';

const DuxTableFetchingMsgUi = props => {
    if (!props.tableProps.fetchingData) {
        return null;
    }

    return (
        <div className={'duxtable-text-body duxtable-tr' + (props.tableProps.striped ? ' duxtable-tr-even' : '')}>
            <div className="duxtable-td duxtable-text-muted duxtable-text-center"
                 style={{width: props.tableW, fontStyle: 'italic'}}
            >
                {props.tableProps.fetchingMsg}
            </div>
        </div>
    );
};

DuxTableFetchingMsgUi.propTypes = {
    // From component parent
    tableProps: PropTypes.object.isRequired,

    // From Redux map
    tableW: PropTypes.number.isRequired
};

export const DuxTableFetchingMsg = connect(mapDuxTableFetchingMsgProps)(DuxTableFetchingMsgUi);
