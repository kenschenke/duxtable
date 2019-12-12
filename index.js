const DuxTable = require('./lib/DuxTable');
const DuxTableReducer = require('./lib/reducer');
const getSelectedRow = require('./lib/helpers').getSelectedRow;
const getSelectedRows = require('./lib/helpers').getSelectedRows;
const getTableStoreValue = require('./lib/helpers').getTableStoreValue;

module.exports = {
    DuxTable: DuxTable,
    getSelectedRow: getSelectedRow,
    getSelectedRows: getSelectedRows,
    getTableStoreValue: getTableStoreValue,
    DuxTableReducer: DuxTableReducer
};
