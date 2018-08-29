import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableGroupHeaderCellProps } from './maps/DuxTableGroupHeaderCell.map';
import { connect } from 'react-redux';

const DuxTableGroupHeaderCellUi = props => {
    let width = 0;
    let i = props.tableProps.groupHeaders[props.groupIndex].startCol;
    let endCol = props.tableProps.columns.length - 1;
    if (props.tableProps.groupHeaders[props.groupIndex].hasOwnProperty('endCol')) {
        endCol = props.tableProps.groupHeaders[props.groupIndex].endCol;
    }
    while (i <= endCol) {
        if (i < props.columnWidths.length)
            width += props.columnWidths[i];
        i++;
    }
    return (
        <div className="duxtable-td duxtable-th duxtable-th-group" style={{width: width}}>
            {props.tableProps.groupHeaders[props.groupIndex].title}
        </div>
    );
};

DuxTableGroupHeaderCellUi.propTypes = {
    // Provided by component parent
    groupIndex: PropTypes.number.isRequired,
    tableProps: PropTypes.object.isRequired,

    // Provided by Redux map
    columnWidths: PropTypes.array.isRequired
};

export const DuxTableGroupHeaderCell = connect(mapDuxTableGroupHeaderCellProps)(DuxTableGroupHeaderCellUi);
