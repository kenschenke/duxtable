import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableHeaderCell } from './DuxTableHeaderCell';

export const DuxTableHeaders = props => {
    const headers = props.tableProps.columns.map((col, index) => {
        return <DuxTableHeaderCell key={col.title}
                                   column={col}
                                   columnIndex={index}
                                   tableProps={props.tableProps}
                                   isLastColumn={index + 1 === props.tableProps.columns.length}
        />;
    });

    return (
        <div className={'duxtable-thead' + (props.tableProps.bodyHeight > 0 ? ' duxtable-scroll' : '')}>
            <div style={{display:'flex'}}>{headers}</div>
        </div>
    );
};

DuxTableHeaders.propTypes = {
    tableProps: PropTypes.object.isRequired,
};
