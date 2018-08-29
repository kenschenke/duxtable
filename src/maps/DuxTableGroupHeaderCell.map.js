import { getTableStoreValue } from '../helpers';

export const mapDuxTableGroupHeaderCellProps = (state, props) => {
    return {
        columnWidths: getTableStoreValue(state, props.tableProps.name, 'columnWidths', [])
    };
};
