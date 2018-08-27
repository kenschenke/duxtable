import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableHeaderCell } from './DuxTableHeaderCell';

export const DuxTableHeaders = props => {
    const headers = props.tableProps.columns.map((col, index) => {
        return <DuxTableHeaderCell key={col.title}
                                   column={col}
                                   columnIndex={index}
                                   columnWidths={props.columnWidths}
                                   isLastColumn={index + 1 === props.tableProps.columns.length}
                                   sortAscending={props.sortAscending}
                                   sortColumn={props.sortColumn}
                                   resizeColumns={props.columnsResized}
                                   sortChanged={props.sortChanged}
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
    columnsResized: PropTypes.func.isRequired,
    columnWidths: PropTypes.array.isRequired,
    sortAscending: PropTypes.bool.isRequired,
    sortChanged: PropTypes.func.isRequired,
    sortColumn: PropTypes.number.isRequired
};
