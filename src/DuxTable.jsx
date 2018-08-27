import React from 'react';
import PropTypes from 'prop-types';
import { DuxTablePager } from './DuxTablePager';
import { DuxTableSearch } from './DuxTableSearch';
import { DuxTableHeaders } from './DuxTableHeaders';
import { DuxTableBody } from './DuxTableBody';
import { calculateColumnWidths, getTableRows } from './helpers';

export class DuxTable extends React.Component {
    constructor(props) {
        super(props);

        this._table = null;  // the <table> element

        // Unique key
        this.key = 'DuxTable_' + Math.random().toString(36).substr(2, 9);

        this.state = {
            tableW: 0,    // the table width the last time columns were calculated
            widths: [],   // column widths
            currentPage: 1,
            sortAscending: props.sortAscending,  // the property is the default, user can change it
            sortColumn: props.sortColumn,  // the property is the default, user can change it
            filter: ''         // This is the contents of the search <input>
        };
    }

    componentDidMount() {
        this.updateColumnWidths();

        window.addEventListener('resize', this.updateColumnWidths, false);
    }

    sortChanged = (sortAscending, sortColumn) => {
        this.setState({
            sortColumn: sortColumn,
            sortAscending: sortAscending,
            currentPage: 1
        });
    };

    updateColumnWidths = () => {
        if (this._table === null || this._table.clientWidth === this.state.tableW) {
            return;
        }

        const tableW = this._table.clientWidth;
        this.setState({
            tableW: tableW,
            widths: calculateColumnWidths(this.props.columns, tableW)
        });
    };

    render() {
        const tableRowData = getTableRows(this.state.filter, this.state.currentPage,
            this.state.sortColumn, this.state.sortAscending, this.props);

        return (
            <div>
                <DuxTableSearch tableProps={this.props} searchChanged={filter => this.setState({filter: filter})}/>
                <div ref={t => this._table=t} className="duxtable-table">
                    <DuxTableHeaders tableProps={this.props}
                                     columnsResized={widths => this.setState({widths: widths})}
                                     columnWidths={this.state.widths}
                                     sortAscending={this.state.sortAscending}
                                     sortColumn={this.state.sortColumn}
                                     sortChanged={this.sortChanged}
                    />
                    <DuxTableBody columnWidths={this.state.widths}
                                  tableKey={this.key}
                                  tableRows={tableRowData.rows}
                                  tableProps={this.props}
                                  tableW={this.state.tableW}
                    />
                </div>
                <DuxTablePager currentPage={this.state.currentPage}
                               currentPageChanged={page => this.setState({currentPage:page})}
                               numAllRows={tableRowData.numAllRows}
                               numFilteredRows={tableRowData.numFilteredRows}
                               totalPages={tableRowData.totalPages}
                               tableProps={this.props}
                />
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
