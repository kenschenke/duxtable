import React from 'react';
import PropTypes from 'prop-types';

export const DuxTableEmptyMsg = props => {
    if (!props.show || !props.tableProps.emptyMsg.length) {
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

DuxTableEmptyMsg.propTypes = {
    tableProps: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    tableW: PropTypes.number.isRequired
};
