import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableCell } from './DuxTableCell';

export const DuxTableRow = props => {
    const cells = props.tableProps.columns.map((col,colIndex) => {
        return <DuxTableCell key={`${col.field}`}
                             column={col}
                             columnIndex={colIndex}
                             columnWidth={props.columnWidths[colIndex]}
                             isRowSelected={props.isRowSelected}
                             item={props.item}
        />;
    });

    let rowClass = 'duxtable-tr ';
    if (props.isRowSelected) {
        rowClass += 'duxtable-tr-selected';
    } else {
        rowClass += props.tableProps.striped && props.rowIndex % 2 ? 'duxtable-tr-odd' : 'duxtable-tr-even';
    }
    if (props.tableProps.selectionMode !== 'none') {
        rowClass += ' duxtable-tr-selectable';
    }

    if (props.isRowSelected && props.tableProps.selectedRenderCallback) {
        const render = props.tableProps.selectedRenderCallback(props.item, -1);
        return (
            <div onMouseEnter={() => {if (props.tableProps.mouseEnterRow) props.tableProps.mouseEnterRow(props.item)}}
                 onMouseLeave={() => {if (props.tableProps.mouseLeaveRow) props.tableProps.mouseLeaveRow(props.item)}}
                 onClick={() => props.rowClicked(props.item[props.tableProps.rowKey])}
            >
                <div className={rowClass}>{cells}</div>
                <div className="duxtable-tr duxtable-tr-selectable duxtable-tr-selected">
                    <div className="duxtable-td" style={{width: props.tableW}}>{render}</div>
                </div>
            </div>
        );
    }

    return (
        <div onMouseEnter={() => {if (props.tableProps.mouseEnterRow) props.tableProps.mouseEnterRow(props.item)}}
             onMouseLeave={() => {if (props.tableProps.mouseLeaveRow) props.tableProps.mouseLeaveRow(props.item)}}
             className={rowClass}
             onClick={() => props.rowClicked(props.item[props.tableProps.rowKey])}
        >
            {cells}
        </div>
    );
};

DuxTableRow.propTypes = {
    tableProps: PropTypes.object.isRequired,
    columnWidths: PropTypes.array.isRequired,
    isRowSelected: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    rowClicked: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
    tableW: PropTypes.number.isRequired
};
