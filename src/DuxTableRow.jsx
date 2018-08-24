import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableCell } from './DuxTableCell';

export const DuxTableRow = props => {
    const cells = props.columns.map((col,colIndex) => {
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
        rowClass += props.striped && props.rowIndex % 2 ? 'duxtable-tr-odd' : 'duxtable-tr-even';
    }
    if (props.selectionMode !== 'none') {
        rowClass += ' duxtable-tr-selectable';
    }

    if (props.isRowSelected && props.selectedRenderCallback) {
        const render = props.selectedRenderCallback(props.item, -1);
        return (
            <div onMouseEnter={() => props.mouseEnterRow(props.item)}
                 onMouseLeave={() => props.mouseLeaveRow(props.item)}
                 onClick={() => props.rowClicked(props.item[props.rowKey])}
            >
                <div className={rowClass}>{cells}</div>
                <div className="duxtable-tr duxtable-tr-selectable duxtable-tr-selected">
                    <div className="duxtable-td" style={{width: props.tableW}}>{render}</div>
                </div>
            </div>
        );
    }

    return (
        <div onMouseEnter={() => props.mouseEnterRow(props.item)}
             onMouseLeave={() => props.mouseLeaveRow(props.item)}
             className={rowClass}
             onClick={() => props.rowClicked(props.item[props.rowKey])}
        >
            {cells}
        </div>
    );
};

DuxTableRow.propTypes = {
    columnWidths: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    isRowSelected: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    mouseEnterRow: PropTypes.func.isRequired,
    mouseLeaveRow: PropTypes.func.isRequired,
    rowClicked: PropTypes.func.isRequired,
    rowIndex: PropTypes.number.isRequired,
    rowKey: PropTypes.string.isRequired,
    selectedRenderCallback: PropTypes.func,
    selectionMode: PropTypes.string.isRequired,
    striped: PropTypes.bool.isRequired,
    tableW: PropTypes.number.isRequired
};
