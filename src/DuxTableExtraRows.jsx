import React from 'react';
import PropTypes from 'prop-types';

export const DuxTableExtraRows = props => {
    if (!props.tableProps.pagination) {
        return null;
    }

    let extra = 1 + ((props.rowsOnPage % 2) ? 0 : 1);
    let rows = [];
    while (props.rowsOnPage + rows.length < props.tableProps.pageSize + (props.hasFooter ? 1 : 0)) {
        const cols = props.colWidths.map((width,index) => {
            return (
                <div key={`extra_${index}`} className="duxtable-td" style={{width: width}}>
                    {String.fromCharCode(0xa0) /* non-break space*/}
                </div>
            );
        });

        let cls = 'duxtable-text-body duxtable-tr';
        if (props.tableProps.striped) {
            cls += (extra % 2) ? ' duxtable-tr-odd' : ' duxtable-tr-even';
        }
        rows.push(<div key={`extra_row_${extra}`} className={cls}>{cols}</div>);
        extra++;
    }

    return rows;
};

DuxTableExtraRows.propTypes = {
    tableProps: PropTypes.object.isRequired,
    colWidths: PropTypes.array.isRequired,
    hasFooter: PropTypes.bool.isRequired,
    rowsOnPage: PropTypes.number.isRequired
};
