import React from 'react';
import PropTypes from 'prop-types';
import { colValue } from './helpers';

export const DuxTableCell = props => {
    let value = undefined;
    if (props.isRowSelected && props.selectedRenderCallback) {
        value = props.selectedRenderCallback(props.item, props.columnIndex);
    }
    if (value === undefined) {
        if (props.column.hasOwnProperty('render')) {
            value = props.column.render(props.item);
        } else {
            value = colValue(props.column, props.item);
        }
    }

    let cellClass = 'duxtable-td ';
    if (props.column.hasOwnProperty('align')) {
        switch (props.column.align) {
            case 'right':
                cellClass += 'duxtable-text-right';
                break;

            case 'center':
                cellClass += 'duxtable-text-center';
                break;

            case 'left':
            default:
                cellClass += 'duxtable-text-left';
                break;
        }
    } else {
        cellClass += 'duxtable-text-left';
    }

    const columnWidth = props.columnWidth !== undefined ? props.columnWidth : 0;
    return <div className={cellClass} style={{width: columnWidth}}>{value}</div>;
};

DuxTableCell.propTypes = {
    column: PropTypes.object.isRequired,
    columnIndex: PropTypes.number.isRequired,
    columnWidth: PropTypes.number,
    isRowSelected: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    selectedRenderCallback: PropTypes.func
};
