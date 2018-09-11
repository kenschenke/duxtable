export const calculateColumnWidths = (columns, tableW) => {
    let widths = [];
    while (widths.length < columns.length) {
        widths.push(0);
    }
    let i, remainingCols = 0, remainingWidth = tableW;
    // Set the width for columns with a specified width
    for (i = 0; i < columns.length; i++) {
        if (columns[i].hasOwnProperty('width')) {
            widths[i] = columns[i].width;
            remainingWidth -= columns[i].width;
        } else {
            remainingCols++;
        }
    }
    // For columns without a specified width, divide up the remaining space evenly
    if (remainingCols) {
        for (i = 0; i < columns.length; i++) {
            if (!widths[i]) {
                widths[i] = remainingWidth / remainingCols;
            }
        }
    }

    return widths;
};

export const colValue = (col, item) => {
    let value = '';
    if (typeof col.field === 'string') {
        value = item[col.field];
        if (typeof value === 'string') {
            value = value.trim();
        }
    } else if (typeof col.field === 'function') {
        value = col.field(item);
    }

    return value;
};

export const formatNumber = (value, precision=2, commas=true) => {
    let valueNum = toNumber(value, precision);
    valueNum /= Math.pow(10, precision);

    const x = valueNum.toString().split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    if (x2.length === 0 && precision > 0) {
        x2 = '.';
    }
    if (x2.length) {
        while (x2.length-1 < precision) {
            x2 += '0';
        }
    }
    if (commas) {
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1'+','+'$2');
        }
    }

    return x1 + x2;
};

/**
 * Gets the offset position of the element.
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
const getElementOffset = elem => {
    if (elem === null || elem === undefined) {
        return {top: 0, left: 0};
    }

    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left - win.pageXOffset
    };
};

/**
 * Gets the relative position of the element.
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
export const getElementPosition = elem => {
    const elemOffset = getElementOffset(elem);
    const parentOffset = getElementOffset(elem.offsetParent);

    return {
        top: elemOffset.top,
        left: elemOffset.left
    };
};

export const getTableRows = (filter, currentPage, sortColumn, sortAscending, props) => {
    const begin = props.pagination ? (currentPage - 1) * props.pageSize : 0;
    const end = props.pagination ? begin + props.pageSize : props.data.length;
    const searchStr = filter.trim().toUpperCase();
    let filtered = [];
    if (props.fetchingData) {
        // do nothing
    }
    else if (searchStr.length === 0 && props.filterCallback === undefined) {
        filtered = [...props.data];
    } else {
        filtered = props.data.filter(item => {
            if (props.filterCallback !== undefined) {
                return props.filterCallback(searchStr, item);
            }
            for (let i = 0; i < props.columns.length; i++) {
                const value = colValue(props.columns[i], item);
                if (typeof value === 'string' && value.toUpperCase().indexOf(searchStr) !== -1) {
                    return true;
                }
            }
            return false;
        });
    }
    const totalPages = props.pagination ? Math.ceil(filtered.length / props.pageSize) : 1;
    if (sortColumn !== -1) {
        if (props.columns[sortColumn].sortCallback !== undefined) {
            filtered.sort((a,b) => props.columns[sortColumn].sortCallback(a,b,sortAscending));
        } else {
            filtered.sort((a,b) => {
                let valueA = colValue(props.columns[sortColumn], a);
                if (typeof valueA === 'string') {
                    valueA = valueA.toUpperCase();
                }
                let valueB = colValue(props.columns[sortColumn], b);
                if (typeof valueB === 'string') {
                    valueB = valueB.toUpperCase();
                }
                if (valueA < valueB) {
                    return sortAscending ? -1 : 1;
                } else if (valueA > valueB) {
                    return sortAscending ? 1 : -1;
                } else {
                    return 0;
                }
            });
        }
    }

    // Footer row
    let hasFooter = false;
    let footers = [];
    if (!props.fetchingData) {
        for (let col = 0; col < props.columns.length; col++) {
            let content = undefined;
            if (props.columns[col].hasOwnProperty('footer')) {
                if (typeof props.columns[col].footer === 'function') {
                    content = props.columns[col].footer(filtered);
                } else {
                    content = props.columns[col].footer;
                }
            }

            if (content !== undefined) {
                hasFooter = true;
            } else {
                content = '';
            }
            if (typeof content === 'string' && !content.length) {
                content = String.fromCharCode(0xa0);  // non-breaking space
            }
            footers.push(content);
        }
    }

    return {
        rows: filtered.slice(begin, end),  // rows to be displayed in the table (current page only if paginated)
        totalPages: totalPages,
        numAllRows: props.data.length,     // total rows in unfiltered data set
        numFilteredRows: filtered.length,  // total rows in filtered data set
        filteredRows: filtered,            // rows in filtered data set (including those not visible due to pagination)
        footers: footers,
        hasFooter: hasFooter
    };
};

export const getSelectedRow = (state, table) => {
    const rows = getTableStoreValue(state, table, 'selectedRows', []);
    return rows.length === 1 ? rows[0] : undefined;
};

export const getSelectedRows = (state, table) => {
    return getTableStoreValue(state, table, 'selectedRows', []);
};

export const getTableStoreValue = (state, table, property, defaultValue) => {
    if (!state.duxtable.hasOwnProperty(table) ||
        !state.duxtable[table].hasOwnProperty(property)) {
        return defaultValue;
    }

    return state.duxtable[table][property];
};

export const isInsideRect = (x, y, left, top, width, height) => {
    return (x >= left && y >= top && x <= left+width && y <= top+height);
};

const toNumber = (value, precision) => {
    if (typeof value === 'string') {
        value = value.replace(/[,$]/g, '');
    }
    let num = parseFloat(value);
    if (isNaN(num)) {
        return 0;
    }
    num *= Math.pow(10, precision);
    num += 0.5001;
    return Math.floor(num);
};
