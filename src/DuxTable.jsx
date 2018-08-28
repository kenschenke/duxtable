import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableProps, mapDuxTableDispatch } from './maps/DuxTable.map';
import { connect } from 'react-redux';
import { DuxTablePager } from './DuxTablePager';
import { DuxTableSearch } from './DuxTableSearch';
import { DuxTableHeaders } from './DuxTableHeaders';
import { DuxTableBody } from './DuxTableBody';
import { calculateColumnWidths, getElementPosition, getTableRows } from './helpers';

class DuxTableUi extends React.Component {
    constructor(props) {
        super(props);

        this._table = null;  // the <table> element

        this.props.init(props.name, props.sortAscending, props.sortColumn);
    }

    componentDidMount() {
        if (this._table !== null) {
            const pos = getElementPosition(this._table);
            this.props.setStoreData(this.props.name, {
                tableH: this._table.clientHeight,
                tableT: pos.top
            });
        }

        this.updateColumnWidths();

        window.addEventListener('resize', this.updateColumnWidths, false);
    }

    componentDidUpdate() {
        if (this._table !== null && this.props.tableH !== this._table.clientHeight) {
            this.props.setStoreData(this.props.name, {tableH: this._table.clientHeight});
        }
    }

    updateColumnWidths = () => {
        if (this._table === null || this._table.clientWidth === this.props.tableW) {
            return;
        }

        const tableW = this._table.clientWidth;
        this.props.setStoreData(this.props.name, {
            tableW: tableW,
            columnWidths: calculateColumnWidths(this.props.columns, tableW)
        });
    };

    render() {
        const tableRowData = getTableRows(this.props.filter, this.props.currentPage,
            this.props.sortColumnFromStore, this.props.sortAscendingFromStore, this.props);

        return (
            <div>
                <DuxTableSearch tableProps={this.props}/>
                <div ref={t => this._table=t} className="duxtable-table">
                    <DuxTableHeaders tableProps={this.props}/>
                    <DuxTableBody tableRows={tableRowData.rows} tableProps={this.props}/>
                </div>
                <DuxTablePager numAllRows={tableRowData.numAllRows}
                               numFilteredRows={tableRowData.numFilteredRows}
                               totalPages={tableRowData.totalPages}
                               tableProps={this.props}
                />
            </div>
        );
    }
}

DuxTableUi.propTypes = {
    // Provided by component parent
    name: PropTypes.string.isRequired,
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
    striped: PropTypes.bool.isRequired,

    // Provided by Redux map
    currentPage: PropTypes.number.isRequired,
    tableH: PropTypes.number.isRequired,
    tableW: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    sortColumnFromStore: PropTypes.number.isRequired,
    sortAscendingFromStore: PropTypes.bool.isRequired,
    init: PropTypes.func.isRequired,
    setStoreData: PropTypes.func.isRequired,
    selectedRows: PropTypes.array.isRequired
};

DuxTableUi.defaultProps = {
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

export const DuxTable = connect(mapDuxTableProps, mapDuxTableDispatch)(DuxTableUi);
