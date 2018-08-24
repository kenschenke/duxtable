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

export const getRenderData = (tableData, props, tableW, widths, key, selectedRows) => {
    let rows = [];

    if (props.fetchingData) {
        rows.push({
            Key: `${key}_fetching`,
            Cls: 'duxtable-text-body duxtable-tr' + (props.striped ? ' duxtable-tr-even' : ''),
            Item: {},
            Interactive: false,
            Cols: [
                {
                    Key: `${key}_fetching_row`,
                    Cls: 'duxtable-td duxtable-text-muted duxtable-text-center',
                    Value: props.fetchingMsg,
                    Style: { width: tableW, fontStyle: 'italic' }
                }
            ]
        });
    } else {
        rows = tableData.map((item,rowIndex) => {
            const selected = selectedRows.indexOf(item[props.rowKey]) !== -1;
            const cols = props.columns.map((col,colIndex) => {
                let value = undefined;
                if (selected && props.selectedRenderCallback !== undefined) {
                    value = props.selectedRenderCallback(item, colIndex);
                }
                if (value === undefined) {
                    if (col.hasOwnProperty('render')) {
                        value = col.render(item);
                    } else {
                        value = colValue(col, item);
                    }
                }
                let colCls = 'duxtable-td ';
                if (col.hasOwnProperty('align')) {
                    switch (col.align) {
                        case 'right':
                            colCls += 'duxtable-text-right';
                            break;

                        case 'center':
                            colCls += 'duxtable-text-center';
                            break;

                        case 'left':
                        default:
                            colCls += 'duxtable-text-left';
                            break;
                    }
                } else {
                    colCls += 'duxtable-text-left';
                }
                return {
                    Key: `${rowIndex}_${col.field}`,
                    Cls: colCls,
                    Value: value,
                    Style: {width: widths[colIndex]}
                };
            });

            let selectedRowLevelRender = undefined;
            if (selected && props.selectedRenderCallback !== undefined) {
                selectedRowLevelRender = props.selectedRenderCallback(item, -1);
            }

            let cls = 'duxtable-tr ';
            if (selected) {
                cls += 'duxtable-tr-selected';
            } else {
                cls += props.striped && rowIndex % 2 ? 'duxtable-tr-odd' : 'duxtable-tr-even';
            }
            if (props.selectionMode !== 'none') {
                cls += ' duxtable-tr-selectable';
            }

            return {
                Key: item[props.rowKey],
                Item: item,
                Cls: cls,
                Interactive: true,
                SelectedRowLevelRender: selectedRowLevelRender,
                Cols: cols
            };
        });
    }

    if (!rows.length && props.emptyMsg.length) {
        rows.push({
            Key: `${key}_empty`,
            Cls: 'duxtable-text-body duxtable-tr' + (props.striped ? ' duxtable-tr-even' : ''),
            Item: {},
            Interactive: false,
            Cols: [
                {
                    Key: `${key}_empty_row`,
                    Cls: 'duxtable-td duxtable-text-muted duxtable-text-center',
                    Value: props.emptyMsg,
                    Style: { width: tableW, fontStyle: 'italic' }
                }
            ]
        });
    }

    let anyFooter = false;
    if (!props.fetchingData) {
        let footers = [];
        for (let col = 0; col < props.columns.length; col++) {
            let content = undefined;
            if (props.columns[col].hasOwnProperty('footer')) {
                if (typeof props.columns[col].footer === 'function') {
                    content = props.columns[col].footer(props.filteredRows);
                } else {
                    content = props.columns[col].footer;
                }
            }

            let colCls = 'duxtable-td ';
            if (props.columns[col].hasOwnProperty('align')) {
                switch (props.columns[col].align) {
                    case 'right':
                        colCls += 'duxtable-text-right';
                        break;

                    case 'center':
                        colCls += 'duxtable-text-center';
                        break;

                    case 'left':
                    default:
                        colCls += 'duxtable-text-left';
                        break;
                }
            } else {
                colCls += 'duxtable-text-left';
            }

            footers.push({
                Key: `footer_${props.columns[col].field}`,
                Cls: colCls,
                Value: content !== undefined ? content : '',
                Style: {width: widths[col]}
            });
            if (content !== undefined) {
                anyFooter = true;
            }
        }
        if (anyFooter) {
            let footerCls = 'duxtable-text-body duxtable-tr';
            if (props.striped) {
                footerCls += (rows.length % 2) ? ' duxtable-tr-odd' : ' duxtable-tr-even';
            }
            rows.push({
                Key: `${key}_footer_row`,
                Item: {},
                Cls: footerCls,
                Interactive: false,
                SelectedRowLevelRender: undefined,
                Cols: footers
            });
        }
    }

    let extra = 1 + ((rows.length % 2) ? 0 : 1);
    while (props.pagination && rows.length < props.pageSize + (anyFooter ? 1 : 0)) {
        const cols = props.columns.map((col,index) => {
            return {
                Key: `${key}_extra_${index}`,
                Cls: 'duxtable-td',
                Value: String.fromCharCode(0xa0),  // non-break space
                Style: {width: widths[index]}
            }
        });
        let cls = 'duxtable-text-body duxtable-tr';
        if (props.striped) {
            cls += (extra % 2) ? ' duxtable-tr-odd' : ' duxtable-tr-even';
        }
        rows.push({
            Key: `${key}_extra_row_${extra}`,
            Item: {},
            Cls: cls,
            Interactive: false,
            SelectedRowLevelRender: undefined,
            Cols: cols
        });
        extra++;
    }

    return rows;
};

export const getTableRows = (props, filter, currentPage, sortColumn, sortAscending) => {
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
    if (props.sortCallback !== undefined) {
        filtered.sort((a,b) => props.sortCallback(a,b,sortAscending));
    }
    else if (sortColumn !== -1) {
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

    return {
        rows: filtered.slice(begin, end),  // rows to be displayed in the table (current page only if paginated)
        totalPages: totalPages,
        numAllRows: props.data.length,     // total rows in unfiltered data set
        numFilteredRows: filtered.length,  // total rows in filtered data set
        filteredRows: filtered             // rows in filtered data set (including those not visible due to pagination)
    };
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
