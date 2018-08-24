import React from 'react';
import PropTypes from 'prop-types';

export const DuxTableEmptyMsg = props => {
    if (!props.show || !props.emptyMsg.length) {
        return null;
    }

    return (
        <div className={'duxtable-text-body duxtable-tr' + (props.striped ? ' duxtable-tr-even' : '')}>
            <div className="duxtable-td duxtable-text-muted duxtable-text-center"
                 style={{width: props.tableW, fontStyle: 'italic'}}
            >
                {props.emptyMsg}
            </div>
        </div>
    );
};

DuxTableEmptyMsg.propTypes = {
    emptyMsg: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    striped: PropTypes.bool.isRequired,
    tableW: PropTypes.number.isRequired
};
