import React from 'react';
import PropTypes from 'prop-types';

export const DuxTableFetchingMsg = props => {
    if (!props.fetchingData) {
        return null;
    }

    return (
        <div className={'duxtable-text-body duxtable-tr' + (props.striped ? ' duxtable-tr-even' : '')}>
            <div className="duxtable-td duxtable-text-muted duxtable-text-center"
                 style={{width: props.tableW, fontStyle: 'italic'}}
            >
                {props.fetchingMsg}
            </div>
        </div>
    );
};

DuxTableFetchingMsg.propTypes = {
    fetchingData: PropTypes.bool.isRequired,
    fetchingMsg: PropTypes.string.isRequired,
    striped: PropTypes.bool.isRequired,
    tableW: PropTypes.number.isRequired
};
