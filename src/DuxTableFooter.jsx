import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTableStoreValue } from './helpers';

const mapProps = (state, props) => {
    return {
        columnWidths: getTableStoreValue(state, props.tableProps.name, 'columnWidths', [])
    };
};

const DuxTableFooterUi = props => {
    const cells = props.footers.map((footer,index) => {
        let cellClass = 'duxtable-td duxtable-footer-td ';
        if (props.tableProps.columns[index].hasOwnProperty('align')) {
            switch(props.tableProps.columns[index].align) {
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

        const columnWidth = props.columnWidths[index] !== undefined ? props.columnWidths[index] : 0;
        return <div key={`${footer}_${index}`} className={cellClass} style={{width: columnWidth}}>{footer}</div>;
    });

    let rowClass = 'duxtable-tr duxtable-footer-tr';
    if (props.tableProps.striped) {
        rowClass += props.tableProps.pageSize % 2 === 0 ? ' duxtable-tr-even' : ' duxtable-tr-odd';
    }

    return <div className={rowClass}>{cells}</div>;
};

DuxTableFooterUi.propTypes = {
    tableProps: PropTypes.object.isRequired,
    footers: PropTypes.array.isRequired,
    columnWidths: PropTypes.array.isRequired
};

export const DuxTableFooter = connect(mapProps)(DuxTableFooterUi);
