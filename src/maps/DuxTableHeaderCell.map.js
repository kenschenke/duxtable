import { getTableStoreValue } from '../helpers';
import { setTableStoreValue } from '../actions';

export const mapDuxTableHeaderCellProps = (state, props) => {
    return {
        columnWidths: getTableStoreValue(state, props.tableProps.name, 'columnWidths', []),
        sortAscending: getTableStoreValue(state, props.tableProps.name, 'sortAscending', true),
        sortColumn: getTableStoreValue(state, props.tableProps.name, 'sortColumn', -1),
        tableH: getTableStoreValue(state, props.tableProps.name, 'tableH', 0),
        tableT: getTableStoreValue(state, props.tableProps.name, 'tableT', 0),
        resizingColumns: getTableStoreValue(state, props.tableProps.name, 'resizingColumns', false)
    };
};

export const mapDuxTableHeaderCellDispatch = dispatch => {
    return {
        setColumnWidths(name, widths) {
            dispatch(setTableStoreValue(name, {columnWidths: widths}));
        },

        setResizingColumns(name, resizing) {
            dispatch(setTableStoreValue(name, {resizingColumns: resizing}));
        },

        setSort(name, sortAscending, sortColumn) {
            dispatch(setTableStoreValue(name, {
                sortAscending: sortAscending,
                sortColumn: sortColumn,
                currentPage: 1
            }));
        }
    };
};
