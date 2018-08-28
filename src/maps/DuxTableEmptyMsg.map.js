import { getTableStoreValue } from '../helpers';

export const mapDuxTableEmptyMsgProps = (state, props) => {
    return {
        tableW: getTableStoreValue(state, props.tableProps.name, 'tableW', 0)
    };
};
