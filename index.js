const DuxTable = require('./lib/DuxTable');
const DuxTableReducer = require('./lib/reducer');
const { getSelectedRow, getSelectedRows, getTableStoreValue } = require('./lib/helpers');

module.exports = {
    DuxTable: DuxTable,
    getSelectedRow: getSelectedRow,
    getSelectedRows: getSelectedRows,
    getTableStoreValue: getTableStoreValue,
    DuxTableReducer: DuxTableReducer
};
