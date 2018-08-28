import { getTableStoreValue } from '../helpers';
import { setTableStoreValue } from '../actions';

export const mapDuxTablePagerProps = (state, props) => {
    return {
        currentPage: getTableStoreValue(state, props.tableProps.name, 'currentPage', 0)
    };
};

export const mapDuxTablePagerDispatch = dispatch => {
    return {
        setCurrentPage(name, page) {
            dispatch(setTableStoreValue(name, {currentPage: page}));
        }
    };
};
