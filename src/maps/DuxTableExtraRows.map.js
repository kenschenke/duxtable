import { getTableStoreValue } from '../helpers';

export const mapDuxTableExtraRowsProps = (state, props) => {
    return {
        tableW: getTableStoreValue(state, props.tableProps.name, 'tableW', 0)
    };
};
