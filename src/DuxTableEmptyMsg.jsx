import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableEmptyMsgProps } from './maps/DuxTableEmptyMsg.map';
import { connect } from 'react-redux';

const DuxTableEmptyMsgUi = props => {
    if (!props.tableProps.emptyMsg.length) {
        return null;
    }

    return (
        <div className={'duxtable-text-body duxtable-tr' + (props.tableProps.striped ? ' duxtable-tr-even' : '')}>
            <div className="duxtable-td duxtable-text-muted duxtable-text-center"
                 style={{width: props.tableW, fontStyle: 'italic'}}
            >
                {props.tableProps.emptyMsg}
            </div>
        </div>
    );
};

DuxTableEmptyMsgUi.propTypes = {
    // From component parent
    tableProps: PropTypes.object.isRequired,

    // From Redux map
    tableW: PropTypes.number.isRequired
};

export const DuxTableEmptyMsg = connect(mapDuxTableEmptyMsgProps)(DuxTableEmptyMsgUi);
