import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableExtraRowsProps } from './maps/DuxTableExtraRows.map';
import { connect } from 'react-redux';

const DuxTableExtraRowsUi = props => {
    if (!props.tableProps.pagination) {
        return null;
    }

    let extra = 1 + ((props.rowsOnPage % 2) ? 0 : 1);
    let rows = [];
    while (props.rowsOnPage + rows.length < props.tableProps.pageSize) {
        let cls = 'duxtable-text-body duxtable-tr';
        if (props.tableProps.striped) {
            cls += (extra % 2) ? ' duxtable-tr-odd' : ' duxtable-tr-even';
        }
        rows.push(
            <div key={`extra_row_${extra}`} className={cls}>
                <div className="duxtable-td" style={{width: props.tableW}}>
                    {String.fromCharCode(0xa0) /* non-break space*/}
                </div>
            </div>
        );
        extra++;
    }

    return rows;
};

DuxTableExtraRowsUi.propTypes = {
    // From component parent
    tableProps: PropTypes.object.isRequired,
    hasFooter: PropTypes.bool.isRequired,
    rowsOnPage: PropTypes.number.isRequired,

    // From Redux map
    tableW: PropTypes.number.isRequired
};

export const DuxTableExtraRows = connect(mapDuxTableExtraRowsProps)(DuxTableExtraRowsUi);
