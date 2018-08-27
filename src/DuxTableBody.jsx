import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableRow } from './DuxTableRow';
import { DuxTableFetchingMsg } from './DuxTableFetchingMsg';
import { DuxTableEmptyMsg } from './DuxTableEmptyMsg';
import { DuxTableExtraRows } from './DuxTableExtraRows';

export class DuxTableBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRows: []
        }
    }

    rowClicked = key => {
        let toBe = [];

        switch (this.props.tableProps.selectionMode) {
            case 'single':
                toBe = [key];
                if (this.props.tableProps.rowSelectionChanged) {
                    this.props.tableProps.rowSelectionChanged(key);
                }
                break;

            case 'multi':
                if (this.state.selectedRows.indexOf(key) === -1) {
                    // The key isn't in the array.  Add it.
                    toBe = [...this.state.selectedRows, key];
                } else {
                    // The key is already in the array.  Remove it.
                    toBe = this.state.selectedRows.filter(k => k !== key);
                }
                if (this.props.tableProps.rowSelectionChanged) {
                    this.props.tableProps.rowSelectionChanged(toBe);
                }
                break;
        }

        this.setState({selectedRows: toBe});
    };

    render() {
        const rows = this.props.tableRows.map((item, rowIndex) => {
            return <DuxTableRow key={`${this.props.tableKey}_row_${rowIndex}`}
                                columnWidths={this.props.columnWidths}
                                tableProps={this.props.tableProps}
                                isRowSelected={this.state.selectedRows.indexOf(item[this.props.tableProps.rowKey]) !== -1}
                                item={item}
                                rowClicked={this.rowClicked}
                                rowIndex={rowIndex}
                                tableW={this.props.tableW}
            />;
        });

        return (
            <div className={'duxtable-tbody' + (this.props.tableProps.bodyHeight ? ' duxtable-scroll' : '')} style={{height:this.props.tableProps.bodyHeight?this.props.tableProps.bodyHeight:'auto'}}>
                <DuxTableFetchingMsg tableProps={this.props.tableProps} tableW={this.props.tableW}/>
                <DuxTableEmptyMsg tableProps={this.props.tableProps}
                                  show={!this.props.tableProps.fetchingData && !this.props.tableRows.length}
                                  tableW={this.props.tableW}
                />
                {rows}
                <DuxTableExtraRows colWidths={this.props.columnWidths}
                                   hasFooter={false}
                                   tableProps={this.props.tableProps}
                                   rowsOnPage={rows.length}
                />
            </div>
        );
    }
}

DuxTableBody.propTypes = {
    tableProps: PropTypes.object.isRequired,
    columnWidths: PropTypes.array.isRequired,
    tableKey: PropTypes.string.isRequired,
    tableRows: PropTypes.array.isRequired,
    tableW: PropTypes.number.isRequired
};
