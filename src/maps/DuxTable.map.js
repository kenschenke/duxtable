import C from '../constants';
import { getTableStoreValue } from '../helpers';

export const mapDuxTableProps = (state, props) => {
    return {
        currentPage: getTableStoreValue(state, props.name, 'currentPage', 0),
        tableW: getTableStoreValue(state, props.name, 'tableW', 0),
        filter: getTableStoreValue(state, props.name, 'filter', ''),
        sortColumnFromStore: getTableStoreValue(state, props.name, 'sortColumn', -1),
        sortAscendingFromStore: getTableStoreValue(state, props.name, 'sortAscending', true)
    };
};

export const mapDuxTableDispatch = dispatch => {
    return {
        init(name, sortAscending, sortColumn) {
            dispatch({
                type: C.DUXTABLE_SET_DATA,
                table: name,
                data: {
                    tableW: 0,    // the table width the last time columns were calculated
                    widths: [],   // column widths
                    currentPage: 1,
                    sortAscending: sortAscending,  // the property is the default, user can change it
                    sortColumn: sortColumn,  // the property is the default, user can change it
                    filter: '',         // This is the contents of the search <input>
                    selectedRows: []    // Array of key values of the selected items
                }
            });
        },

        setStoreData(name, data) {
            dispatch({
                type: C.DUXTABLE_SET_DATA,
                table: name,
                data: data
            });
        }
    };
};
