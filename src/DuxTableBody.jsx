import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableRow } from './DuxTableRow';
import { DuxTableFetchingMsg } from './DuxTableFetchingMsg';
import { DuxTableEmptyMsg } from './DuxTableEmptyMsg';
import { DuxTableExtraRows } from './DuxTableExtraRows';
import { DuxTableFooter } from './DuxTableFooter';

export const DuxTableBody = props => {
    const rows = props.tableRowData.rows.map((item, rowIndex) => {
        return <DuxTableRow key={`${props.tableProps.name}_row_${rowIndex}`}
                            tableProps={props.tableProps}
                            item={item}
                            rowIndex={rowIndex}
        />;
    });

    // The number of rows in a paginated table.  For fixed-header scrollable tables,
    // this value is ignored.  It is only used by the component to fill out empty rows.
    let numRows = rows.length;

    // If the "fetching" or "empty" message is being shown, that counts as a row
    // for the purposes of filling out empty rows in paginated tables.
    if (props.tableProps.fetchingData) {
        numRows++;
    } else if (!props.tableRowData.rows.length && props.tableProps.emptyMsg.length) {
        numRows++;
    }

    return (
        <div className={'duxtable-tbody' + (props.tableProps.bodyHeight ? ' duxtable-scroll' : '')}
             style={{height: props.tableProps.bodyHeight ? props.tableProps.bodyHeight : 'auto'}}
        >
            <DuxTableFetchingMsg tableProps={props.tableProps}/>
            { !props.tableProps.fetchingData && !props.tableRowData.rows.length &&
            <DuxTableEmptyMsg tableProps={props.tableProps}/>
            }
            {rows}
            <DuxTableExtraRows hasFooter={props.tableRowData.hasFooter} tableProps={props.tableProps} rowsOnPage={numRows}/>
            { props.tableRowData.hasFooter &&
                <DuxTableFooter tableProps={props.tableProps} footers={props.tableRowData.footers}/>
            }
        </div>
    );
};

DuxTableBody.propTypes = {
    tableProps: PropTypes.object.isRequired,
    tableRowData: PropTypes.object.isRequired
};
