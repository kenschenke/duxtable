import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableHeaderCell } from './DuxTableHeaderCell';
import { DuxTableGroupHeaderCell } from './DuxTableGroupHeaderCell';
import { isLastColumn } from './helpers';

export const DuxTableHeaders = props => {
    const headers = props.tableProps.columns.map((col, index) => {
        if (props.tableProps.columnsHidden[index]) {
            return <div key={col.title}></div>;
        }
        return <DuxTableHeaderCell key={col.title}
                                   column={col}
                                   columnIndex={index}
                                   tableProps={props.tableProps}
                                   isLastColumn={isLastColumn(props.tableProps.columns, index)}
        />;
    });
    const groupHeaders = props.tableProps.groupHeaders.map((hdr, index) => {
        return <DuxTableGroupHeaderCell key={hdr.title}
                                        groupIndex={index}
                                        tableProps={props.tableProps}
        />;
    });

    return (
        <div className={'duxtable-thead' + (props.tableProps.bodyHeight > 0 ? ' duxtable-scroll' : '')}>
            { groupHeaders.length > 0 && <div style={{display:'flex'}}>{groupHeaders}</div> }
            <div style={{display:'flex'}}>{headers}</div>
        </div>
    );
};

DuxTableHeaders.propTypes = {
    tableProps: PropTypes.object.isRequired,
};
