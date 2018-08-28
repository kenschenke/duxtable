import C from './constants';
import { getTableStoreValue } from './helpers';

export const setTableStoreValue = (name, data) => ({
    type: C.DUXTABLE_SET_DATA,
    table: name,
    data: data
});

export const rowClicked = (key, tableProps) => (dispatch, getState) => {
    const state = getState();
    const selectedRows = getTableStoreValue(state, tableProps.name, 'selectedRows', []);
    let toBe = [];

    switch (tableProps.selectionMode) {
        case 'single':
            toBe = [key];
            if (tableProps.rowSelectionChanged) {
                tableProps.rowSelectionChanged(key);
            }
            break;

        case 'multi':
            if (selectedRows.indexOf(key) === -1) {
                // The key isn't in the array.  Add it.
                toBe = [...selectedRows, key];
            } else {
                // The key is already in the array.  Remove it.
                toBe = selectedRows.filter(k => k !== key);
            }
            if (tableProps.rowSelectionChanged) {
                tableProps.rowSelectionChanged(toBe);
            }
            break;
    }

    dispatch(setTableStoreValue(tableProps.name, {selectedRows: toBe}));
};
