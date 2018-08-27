import React from 'react';
import PropTypes from 'prop-types';

export const DuxTableFetchingMsg = props => {
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

DuxTableFetchingMsg.propTypes = {
    tableProps: PropTypes.object.isRequired,
    tableW: PropTypes.number.isRequired
};
