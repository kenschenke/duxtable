import { getTableStoreValue } from '../helpers';
import { rowClicked } from '../actions';

export const mapDuxTableRowProps = (state, props) => {
    const selectedRows = getTableStoreValue(state, props.tableProps.name, 'selectedRows', []);

    return {
        columnWidths: getTableStoreValue(state, props.tableProps.name, 'columnWidths', []),
        isRowSelected: selectedRows.indexOf(props.item[props.tableProps.rowKey]) !== -1,
        tableW: getTableStoreValue(state, props.tableProps.name, 'tableW', 0)
    };
};

export const mapDuxTableRowDispatch = dispatch => {
    return {
        rowClicked(key, tableProps) {
            dispatch(rowClicked(key, tableProps));
        }
    }
};
