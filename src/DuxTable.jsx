import React from 'react';
import PropTypes from 'prop-types';
import { DuxTableEmptyMsg } from './DuxTableEmptyMsg';
import { DuxTableFetchingMsg } from './DuxTableFetchingMsg';
import { DuxTablePagination } from './DuxTablePagination';
import { DuxTableSearch } from './DuxTableSearch';
import { DuxTableRow } from './DuxTableRow';
import { DuxTableExtraRows } from './DuxTableExtraRows';
import { DuxTableHeaderCell } from './DuxTableHeaderCell';
import { getTableRows } from './helpers';

export class DuxTable extends React.Component {
    constructor(props) {
        super(props);

        this._table = null;  // the <table> element

        this.dragCol = -1;  // column currently being resized (0 would be between the first and second columns)
        this.dragX = -1;    // X coordinate of last drag event

        // This is an array of timings in milliseconds of the time it takes between
        // renderings as the user is dragging a column header to resize.  It's used
        // to see if re-rendering the table is taking an unreasonable amount of time.
        this.resizeRenderTimes = [];
        this.lastResizeRenderStart = 0;

        // Unique key
        this.key = 'DuxTable_' + Math.random().toString(36).substr(2, 9);

        this.state = {
            tableW: 0,    // the table width the last time columns were calculated
            widths: [],   // column widths
            currentPage: 1,
            sortAscending: props.sortAscending,  // the property is the default, user can change it
            sortColumn: props.sortColumn,  // the property is the default, user can change it
            filter: '',         // This is the contents of the search <input>
            selectedRows: []    // This is an array of the selected rows
        };
    }

    arrayAvg = array => {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }

        return array.length > 0 ? total / array.length : 0;
    };

    colClicked = (event, index) => {
        event.preventDefault();
        if (!this.props.columns[index].hasOwnProperty('sortable') || this.props.columns[index].sortable) {
            let sortAscending = this.state.sortAscending;
            if (index === this.state.sortColumn) {
                sortAscending = !sortAscending;
            } else {
                sortAscending = true;
            }

            this.setState({
                sortColumn: index,
                sortAscending: sortAscending,
                currentPage: 1,
                rowData: []
            });
        }
    };

    componentDidMount() {
        this.updateColumnWidths();
    }

    componentDidUpdate() {
    }

    mouseEnterRow = item => {
        if (this.props.mouseEnterRow) {
            this.props.mouseEnterRow(item);
        }
    };

    mouseLeaveRow = item => {
        if (this.props.mouseLeaveRow) {
            this.props.mouseLeaveRow(item);
        }
    };

    nextClicked = () => {
        this.setState({
            currentPage: this.state.currentPage + 1,
            rowData: []
        });
    };

    prevClicked = () => {
        this.setState({
            currentPage: this.state.currentPage - 1,
            rowData: []
        });
    };

    resizeColumns = (x, col) => {
        const widths = [...this.state.widths];

        const xDelta = x - this.dragX;
        widths[col] += xDelta;
        widths[col+1] -= xDelta;
        this.dragX = x;
        this.setState({widths: widths});
    };

    resizeMouseDown = (event, col) => {
        this.dragCol = col;
        this.dragX = event.screenX;
        this.resizeRenderTimes = [];  // clear the array
        this.lastResizeRenderStart = 0;
    };

    resizeMouseMove = (event, col) => {
        if (this.dragCol === -1) {
            return;
        }

        // Don't bother to resize if the browser is taking too long to re-render the new column sizes.
        if (this.arrayAvg(this.resizeRenderTimes) < 150) {
            this.resizeColumns(event.screenX, col);
        }

        const now = Date.now();
        if (this.lastResizeRenderStart) {
            this.resizeRenderTimes.push(now - this.lastResizeRenderStart);
        }
        this.lastResizeRenderStart = now;
    };

    resizeMouseUp = (event, col) => {
        this.resizeColumns(event.screenX, col);
        this.dragCol = -1;
        this.dragX = -1;
    };

    rowClicked = key => {
        let toBe = [];

        switch (this.props.selectionMode) {
            case 'single':
                toBe = [key];
                if (this.props.rowSelectionChanged) {
                    this.props.rowSelectionChanged(key);
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
                if (this.props.rowSelectionChanged) {
                    this.props.rowSelectionChanged(toBe);
                }
                break;
        }

        this.setState({selectedRows: toBe});
    };

    searchChanged = filter => {
        this.setState({filter: filter});
    };

    updateColumnWidths = () => {
        if (this._table === null || this._table.clientWidth === this.state.tableW) {
            return;
        }

        const tableW = this._table.clientWidth;
        let widths = [];
        while (widths.length < this.props.columns.length) {
            widths.push(0);
        }
        let i, remainingCols = 0, remainingWidth = tableW;
        // Set the width for columns with a specified width
        for (i = 0; i < this.props.columns.length; i++) {
            if (this.props.columns[i].hasOwnProperty('width')) {
                widths[i] = this.props.columns[i].width;
                remainingWidth -= this.props.columns[i].width;
            } else {
                remainingCols++;
            }
        }
        // For columns without a specified width, divide up the remaining space evenly
        if (remainingCols) {
            for (i = 0; i < this.props.columns.length; i++) {
                if (!widths[i]) {
                    widths[i] = remainingWidth / remainingCols;
                }
            }
        }

        this.setState({
            tableW: tableW,
            widths: widths
        });
    };

    render() {
        const headers = this.props.columns.map((col, index) => {
            return <DuxTableHeaderCell column={col}
                                       columnClicked={this.colClicked}
                                       columnIndex={index}
                                       columnWidths={this.state.widths}
                                       isLastColumn={index + 1 === this.props.columns.length}
                                       mouseDown={this.resizeMouseDown}
                                       mouseMove={this.resizeMouseMove}
                                       mouseUp={this.resizeMouseUp}
                                       sortAscending={this.state.sortAscending}
                                       sortColumn={this.state.sortColumn}
            />;
        });

        const tableRowData = getTableRows(this.props, this.state.filter, this.state.currentPage,
            this.state.sortColumn, this.state.sortAscending);

        const rows = tableRowData.rows.map((item,rowIndex) => {
            return <DuxTableRow key={`${this.key}_row_${rowIndex}`}
                                columnWidths={this.state.widths}
                                columns={this.props.columns}
                                isRowSelected={this.state.selectedRows.indexOf(item[this.props.rowKey]) !== -1}
                                item={item}
                                mouseEnterRow={this.mouseEnterRow}
                                mouseLeaveRow={this.mouseLeaveRow}
                                rowClicked={this.rowClicked}
                                rowIndex={rowIndex}
                                rowKey={this.props.rowKey}
                                selectionMode={this.props.selectionMode}
                                selectedRenderCallback={this.props.selectedRenderCallback}
                                striped={this.props.striped}
                                tableW={this.state.tableW}
            />;
        });

        return (
            <div>
                <DuxTableSearch searchFocus={this.props.searchFocus}
                                searchChanged={this.searchChanged}
                                showSearch={this.props.showSearch}
                />
                <div ref={t => this._table=t} className="duxtable-table">
                    <div className={'duxtable-thead' + (this.props.bodyHeight ? ' duxtable-scroll' : '')}>
                        <div style={{display:'flex'}}>{headers}</div>
                    </div>
                    <div className={'duxtable-tbody' + (this.props.bodyHeight ? ' duxtable-scroll' : '')} style={{height:this.props.bodyHeight?this.props.bodyHeight:'auto'}}>
                        <DuxTableFetchingMsg fetchingData={this.props.fetchingData}
                                             fetchingMsg={this.props.fetchingMsg}
                                             striped={this.props.striped}
                                             tableW={this.state.tableW}
                        />
                        <DuxTableEmptyMsg emptyMsg={this.props.emptyMsg}
                                          show={!this.props.fetchingData && !tableRowData.rows.length}
                                          striped={this.props.striped}
                                          tableW={this.state.tableW}
                        />
                        {rows}
                        <DuxTableExtraRows colWidths={this.state.widths}
                                           hasFooter={false}
                                           pageSize={this.props.pageSize}
                                           rowsOnPage={rows.length}
                                           show={this.props.pagination}
                                           striped={this.props.striped}
                        />
                    </div>
                </div>
                <DuxTablePagination currentPage={this.state.currentPage}
                                    hidden={this.props.fetchingData}
                                    nextClicked={this.nextClicked}
                                    numAllRows={tableRowData.numAllRows}
                                    numFilteredRows={tableRowData.numFilteredRows}
                                    prevClicked={this.prevClicked}
                                    show={this.props.pagination}
                                    totalPages={tableRowData.totalPages}
                />

                <div className="mt-3">
                    <p>Average resize render times: {this.arrayAvg(this.resizeRenderTimes)}</p>
                </div>
            </div>
        );
    }
}

DuxTable.propTypes = {
    bodyHeight: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    emptyMsg: PropTypes.string.isRequired,
    fetchingData: PropTypes.bool.isRequired,
    fetchingMsg: PropTypes.string.isRequired,
    filterCallback: PropTypes.func,
    mouseEnterRow: PropTypes.func,
    mouseLeaveRow: PropTypes.func,
    pageSize: PropTypes.number.isRequired,
    pagination: PropTypes.bool.isRequired,
    rowKey: PropTypes.string.isRequired,
    rowSelectionChanged: PropTypes.func,
    searchFocus: PropTypes.bool.isRequired,
    selectedRenderCallback: PropTypes.func,
    selectionMode: PropTypes.string.isRequired,
    showSearch: PropTypes.bool.isRequired,
    sortAscending: PropTypes.bool.isRequired,
    sortCallback: PropTypes.func,
    sortColumn: PropTypes.number.isRequired,
    striped: PropTypes.bool.isRequired
};

DuxTable.defaultProps = {
    bodyHeight: 0,
    emptyMsg: '',
    fetchingData: false,
    fetchingMsg: 'Fetching Data',
    pageSize: 10,
    pagination: true,
    searchFocus: false,
    selectionMode: 'none',
    showSearch: true,
    sortAscending: true,
    sortColumn: -1,
    striped: false
};
