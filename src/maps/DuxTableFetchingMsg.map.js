import { getTableStoreValue } from '../helpers';

export const mapDuxTableFetchingMsgProps = (state, props) => {
    return {
        tableW: getTableStoreValue(state, props.tableProps.name, 'tableW', 0)
    };
};
